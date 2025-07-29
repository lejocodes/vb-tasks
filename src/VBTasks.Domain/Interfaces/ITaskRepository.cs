using VBTasks.Domain.Entities;

namespace VBTasks.Domain.Interfaces;

public interface ITaskRepository : IRepository<TaskItem>
{
    Task<IEnumerable<TaskItem>> GetTasksByUserAsync(string userId);
    Task<IEnumerable<TaskItem>> GetTasksByGroupAsync(string groupId);
    Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(string status);
}