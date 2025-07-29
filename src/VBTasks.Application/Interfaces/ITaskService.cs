using VBTasks.Application.DTOs;

namespace VBTasks.Application.Interfaces;

public interface ITaskService
{
    Task<PagedResultDto<TaskDto>> GetTasksAsync(TaskFilterDto filter);
    Task<TaskDto?> GetTaskByIdAsync(string id);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto dto);
    Task<TaskDto?> UpdateTaskAsync(string id, UpdateTaskDto dto);
    Task<bool> DeleteTaskAsync(string id);
    Task<bool> AssignTaskAsync(string taskId, AssignmentDto assignment);
    Task<IEnumerable<TaskDto>> GetAllTasksAsync();
    Task<TaskStatisticsDto> GetTaskStatisticsAsync();
}