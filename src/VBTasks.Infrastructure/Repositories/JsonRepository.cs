using VBTasks.Domain.Entities;
using VBTasks.Domain.Interfaces;
using VBTasks.Infrastructure.Services;

namespace VBTasks.Infrastructure.Repositories;

public abstract class JsonRepository<T> : IRepository<T> where T : IEntity
{
    protected readonly JsonFileService _jsonService;
    protected readonly string _filePath;

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

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        var wrapper = await _jsonService.ReadAsync<DataWrapper<T>>(_filePath);
        return wrapper?.Items ?? new List<T>();
    }

    public async Task<T?> GetByIdAsync(string id)
    {
        var items = await GetAllAsync();
        return items.FirstOrDefault(x => x.Id == id);
    }

    public async Task<T> CreateAsync(T entity)
    {
        var items = (await GetAllAsync()).ToList();
        items.Add(entity);
        await SaveAsync(items);
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        var items = (await GetAllAsync()).ToList();
        var index = items.FindIndex(x => x.Id == entity.Id);
        if (index >= 0)
        {
            items[index] = entity;
            await SaveAsync(items);
        }
    }

    public async Task DeleteAsync(string id)
    {
        var items = (await GetAllAsync()).ToList();
        items.RemoveAll(x => x.Id == id);
        await SaveAsync(items);
    }

    protected async Task SaveAsync(List<T> items)
    {
        var wrapper = new DataWrapper<T> { Items = items };
        await _jsonService.WriteAsync(_filePath, wrapper);
    }

    protected class DataWrapper<TItem>
    {
        public List<TItem> Items { get; set; } = new();
    }
}