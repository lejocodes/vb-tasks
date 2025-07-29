using VBTasks.Business.DTOs;
using VBTasks.Business.Entities;

namespace VBTasks.Business.Interfaces;

public interface ITaskService
{
    Task<PagedResultDto<TaskItem>> GetTasksAsync(TaskFilterDto filter);
    Task<TaskItem?> GetTaskByIdAsync(string id);
    Task<TaskItem> CreateTaskAsync(CreateTaskDto dto);
    Task<TaskItem?> UpdateTaskAsync(string id, UpdateTaskDto dto);
    Task<bool> DeleteTaskAsync(string id);
    Task<bool> AssignTaskAsync(string taskId, AssignmentDto assignment);
    Task<IEnumerable<TaskItem>> GetAllTasksAsync();
    Task<TaskStatisticsDto> GetTaskStatisticsAsync();
}