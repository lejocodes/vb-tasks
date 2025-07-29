using System.Text.Json;
using System.Text.Json.Serialization;

namespace VBTasks.Infrastructure.Services;

public class JsonFileService
{
    private readonly JsonSerializerOptions _options;

    public JsonFileService()
    {
        _options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            WriteIndented = true,
            Converters = { new JsonStringEnumConverter() }
        };
    }

    public async Task<T?> ReadAsync<T>(string filePath)
    {
        if (!File.Exists(filePath))
            return default;

        var json = await File.ReadAllTextAsync(filePath);
        return JsonSerializer.Deserialize<T>(json, _options);
    }

    public async Task WriteAsync<T>(string filePath, T data)
    {
        var directory = Path.GetDirectoryName(filePath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
            Directory.CreateDirectory(directory);

        var json = JsonSerializer.Serialize(data, _options);
        await File.WriteAllTextAsync(filePath, json);
    }
}