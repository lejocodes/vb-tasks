using VBTasks.Domain.Entities;

namespace VBTasks.Domain.Interfaces;

public interface ITaskRepository : IRepository<TaskItem>
{
    Task<IEnumerable<TaskItem>> GetTasksByStatusAsync(string status);
}