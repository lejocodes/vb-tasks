using VBTasks.Application.DTOs;

namespace VBTasks.Application.Interfaces;

public interface ITaskService
{
    Task<PagedResultDto<TaskDto>> GetTasksAsync(TaskFilterDto filter);
    Task<TaskDto?> GetTaskByIdAsync(string id);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto dto, string userId);
    Task<TaskDto?> UpdateTaskAsync(string id, UpdateTaskDto dto);
    Task<bool> DeleteTaskAsync(string id);
    Task<bool> AssignTaskAsync(string taskId, AssignmentDto assignment, string userId);
    Task<IEnumerable<TaskDto>> GetMyTasksAsync(string userId);
    Task<IEnumerable<TaskDto>> GetGroupTasksAsync(string groupId);
    Task<TaskStatisticsDto> GetTaskStatisticsAsync();
}