using System.Collections.Concurrent;
using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;
using VBTasks.Infrastructure.Services;

namespace VBTasks.Infrastructure.Repositories;

public abstract class JsonRepository<T> : IRepository<T> where T : IEntity
{
    protected readonly JsonFileService _jsonService;
    protected readonly string _filePath;
    
    // In-memory cache
    private readonly ConcurrentDictionary<string, CacheEntry<T>> _cache = new();
    private DateTime _lastCacheRefresh = DateTime.MinValue;
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(5);
    private readonly SemaphoreSlim _cacheLock = new(1, 1);

    protected JsonRepository(JsonFileService jsonService, string fileName)
    {
        _jsonService = jsonService;
        
        // Get the base directory of the application
        var baseDirectory = AppContext.BaseDirectory;
        _filePath = Path.Combine(baseDirectory, "Data", fileName);
        
        // Ensure the Data directory exists
        var dataDirectory = Path.GetDirectoryName(_filePath);
        if (!string.IsNullOrEmpty(dataDirectory) && !Directory.Exists(dataDirectory))
        {
            Directory.CreateDirectory(dataDirectory);
        }
    }

    private class CacheEntry<TItem>
    {
        public TItem Item { get; set; } = default!;
        public DateTime LastUpdated { get; set; }
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        // Check if cache needs refresh
        if (IsCacheExpired())
        {
            await RefreshCacheAsync();
        }

        return _cache.Values.Select(entry => entry.Item).ToList();
    }

    public async Task<T?> GetByIdAsync(string id)
    {
        // Check if cache needs refresh
        if (IsCacheExpired())
        {
            await RefreshCacheAsync();
        }

        return _cache.TryGetValue(id, out var entry) ? entry.Item : default;
    }

    public async Task<T> CreateAsync(T entity)
    {
        await _cacheLock.WaitAsync();
        try
        {
            // Ensure cache is fresh
            if (IsCacheExpired())
            {
                await RefreshCacheAsync();
            }

            // Add to cache
            _cache[entity.Id] = new CacheEntry<T> { Item = entity, LastUpdated = DateTime.UtcNow };

            // Save to file
            await SaveAsync();
            
            return entity;
        }
        finally
        {
            _cacheLock.Release();
        }
    }

    public async Task UpdateAsync(T entity)
    {
        await _cacheLock.WaitAsync();
        try
        {
            // Ensure cache is fresh
            if (IsCacheExpired())
            {
                await RefreshCacheAsync();
            }

            // Update in cache
            if (_cache.ContainsKey(entity.Id))
            {
                _cache[entity.Id] = new CacheEntry<T> { Item = entity, LastUpdated = DateTime.UtcNow };
                
                // Save to file
                await SaveAsync();
            }
        }
        finally
        {
            _cacheLock.Release();
        }
    }

    public async Task DeleteAsync(string id)
    {
        await _cacheLock.WaitAsync();
        try
        {
            // Ensure cache is fresh
            if (IsCacheExpired())
            {
                await RefreshCacheAsync();
            }

            // Remove from cache
            _cache.TryRemove(id, out _);

            // Save to file
            await SaveAsync();
        }
        finally
        {
            _cacheLock.Release();
        }
    }

    protected async Task SaveAsync()
    {
        var items = _cache.Values.Select(entry => entry.Item).ToList();
        var wrapper = new DataWrapper<T> { Items = items };
        await _jsonService.WriteAsync(_filePath, wrapper);
    }

    private bool IsCacheExpired()
    {
        return DateTime.UtcNow - _lastCacheRefresh > _cacheExpiration || _cache.IsEmpty;
    }

    private async Task RefreshCacheAsync()
    {
        await _cacheLock.WaitAsync();
        try
        {
            // Double-check after acquiring lock
            if (!IsCacheExpired())
            {
                return;
            }

            var wrapper = await _jsonService.ReadAsync<DataWrapper<T>>(_filePath);
            var items = wrapper?.Items ?? new List<T>();

            _cache.Clear();
            foreach (var item in items)
            {
                _cache[item.Id] = new CacheEntry<T> { Item = item, LastUpdated = DateTime.UtcNow };
            }

            _lastCacheRefresh = DateTime.UtcNow;
        }
        finally
        {
            _cacheLock.Release();
        }
    }

    protected class DataWrapper<TItem>
    {
        public List<TItem> Items { get; set; } = new();
    }
}