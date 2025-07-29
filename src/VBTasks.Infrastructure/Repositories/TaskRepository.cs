using VBTasks.Domain.Entities;
using VBTasks.Domain.Interfaces;
using VBTasks.Infrastructure.Services;

namespace VBTasks.Infrastructure.Repositories;

public class TaskRepository : JsonRepository<TaskItem>, ITaskRepository
{
    public TaskRepository(JsonFileService jsonService) : base(jsonService, "tasks.json")
    {
    }

    public async Task<IEnumerable<TaskItem>> GetTasksByUserAsync(string userId)
    {
        var tasks = await GetAllAsync();
        return tasks.Where(t => 
            t.CreatedBy == userId || 
            t.Assignments.Any(a => a.AssigneeType == "User" && a.AssigneeId == userId));
    }

    public async Task<IEnumerable<TaskItem>> GetTasksByGroupAsync(string groupId)
    {
        var tasks = await GetAllAsync();
        return tasks.Where(t => 
            t.Assignments.Any(a => a.AssigneeType == "Group" && a.AssigneeId == groupId));
    }

    public async Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(string status)
    {
        var tasks = await GetAllAsync();
        return tasks.Where(t => t.Status == status);
    }
}