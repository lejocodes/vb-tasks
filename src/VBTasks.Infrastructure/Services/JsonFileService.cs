using System.Text.Json;

namespace VBTasks.Infrastructure.Services;

public class JsonFileService
{
    private readonly JsonSerializerOptions _options;
    private readonly Dictionary<string, SemaphoreSlim> _fileLocks = new();
    private readonly object _lockDictLock = new();

    public JsonFileService()
    {
        _options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true
        };
    }

    public async Task<T?> ReadAsync<T>(string filePath)
    {
        if (!File.Exists(filePath))
            return default;

        var fileLock = GetOrCreateFileLock(filePath);
        await fileLock.WaitAsync();
        try
        {
            using var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            return await JsonSerializer.DeserializeAsync<T>(fileStream, _options);
        }
        finally
        {
            fileLock.Release();
        }
    }

    public async Task WriteAsync<T>(string filePath, T data)
    {
        var directory = Path.GetDirectoryName(filePath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            Directory.CreateDirectory(directory);

        var fileLock = GetOrCreateFileLock(filePath);
        await fileLock.WaitAsync();
        try
        {
            // Write to a temporary file first to ensure atomicity
            var tempFilePath = $"{filePath}.tmp";
            using (var fileStream = new FileStream(tempFilePath, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                await JsonSerializer.SerializeAsync(fileStream, data, _options);
                await fileStream.FlushAsync();
            }

            // Atomically replace the original file
            File.Move(tempFilePath, filePath, true);
        }
        finally
        {
            fileLock.Release();
        }
    }

    private SemaphoreSlim GetOrCreateFileLock(string filePath)
    {
        lock (_lockDictLock)
        {
            if (!_fileLocks.TryGetValue(filePath, out var fileLock))
            {
                fileLock = new SemaphoreSlim(1, 1);
                _fileLocks[filePath] = fileLock;
            }
            return fileLock;
        }
    }
}