using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;
using VBTasks.Infrastructure.Services;

namespace VBTasks.Infrastructure.Repositories;

public class TaskRepository : JsonRepository<TaskItem>, ITaskRepository
{
    public TaskRepository(JsonFileService jsonService) : base(jsonService, "tasks.json")
    {
    }


    public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(string status)
    {
        var tasks = await GetAllAsync();
        return tasks.Where(t => t.Status == status);
    }
}