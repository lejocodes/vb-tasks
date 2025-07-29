using VBTasks.Application.DTOs;
using VBTasks.Application.Interfaces;
using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;

namespace VBTasks.Application.Services;

public class TaskService : Application.Interfaces.ITaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<PagedResultDto<TaskDto>> GetTasksAsync(TaskFilterDto filter)
    {
        var tasks = await _taskRepository.GetAllAsync();
        
        if (!string.IsNullOrEmpty(filter.SearchTerm))
        {
            tasks = tasks.Where(t => 
                t.Title.Contains(filter.SearchTerm, StringComparison.OrdinalIgnoreCase) ||
                t.Description.Contains(filter.SearchTerm, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrEmpty(filter.Status))
            tasks = tasks.Where(t => t.Status == filter.Status);

        if (!string.IsNullOrEmpty(filter.Priority))
            tasks = tasks.Where(t => t.Priority == filter.Priority);

        if (!string.IsNullOrEmpty(filter.Assignee))
            tasks = tasks.Where(t => t.Assignments.Any(a => a.AssigneeId == filter.Assignee));

        if (filter.DueDateFrom.HasValue)
            tasks = tasks.Where(t => t.DueDate >= filter.DueDateFrom.Value);

        if (filter.DueDateTo.HasValue)
            tasks = tasks.Where(t => t.DueDate <= filter.DueDateTo.Value);

        var totalCount = tasks.Count();
        var pagedTasks = tasks
            .OrderByDescending(t => t.UpdatedAt)
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize);

        var taskDtos = new List<TaskDto>();
        foreach (var task in pagedTasks)
        {
            taskDtos.Add(MapToTaskDto(task));
        }

        return new PagedResultDto<TaskDto>
        {
            Items = taskDtos,
            TotalCount = totalCount,
            PageNumber = filter.PageNumber,
            PageSize = filter.PageSize
        };
    }

    public async Task<TaskDto?> GetTaskByIdAsync(string id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        return task != null ? MapToTaskDto(task) : null;
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority,
            DueDate = dto.DueDate,
            Tags = dto.Tags,
            Assignments = dto.Assignments.Select(a => new Assignment
            {
                AssigneeType = a.AssigneeType,
                AssigneeId = a.AssigneeId,
                AssignedAt = DateTime.UtcNow
            }).ToList()
        };

        await _taskRepository.CreateAsync(task);
        return MapToTaskDto(task);
    }

    public async Task<TaskDto?> UpdateTaskAsync(string id, UpdateTaskDto dto)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return null;

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.Priority = dto.Priority;
        task.DueDate = dto.DueDate;
        task.Tags = dto.Tags;
        task.UpdatedAt = DateTime.UtcNow;

        await _taskRepository.UpdateAsync(task);
        return MapToTaskDto(task);
    }

    public async Task<bool> DeleteTaskAsync(string id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return false;

        await _taskRepository.DeleteAsync(id);
        return true;
    }

    public async Task<bool> AssignTaskAsync(string taskId, AssignmentDto assignment)
    {
        var task = await _taskRepository.GetByIdAsync(taskId);
        if (task == null) return false;

        task.Assignments.Add(new Assignment
        {
            AssigneeType = assignment.AssigneeType,
            AssigneeId = assignment.AssigneeId,
            AssignedAt = DateTime.UtcNow
        });
        task.UpdatedAt = DateTime.UtcNow;

        await _taskRepository.UpdateAsync(task);
        return true;
    }

    public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
    {
        var tasks = await _taskRepository.GetAllAsync();
        return tasks.Select(MapToTaskDto).ToList();
    }

    public async Task<TaskStatisticsDto> GetTaskStatisticsAsync()
    {
        var tasks = await _taskRepository.GetAllAsync();
        var tasksList = tasks.ToList();

        var statistics = new TaskStatisticsDto
        {
            TotalTasks = tasksList.Count,
            TasksByStatus = tasksList
                .GroupBy(t => t.Status)
                .ToDictionary(g => g.Key, g => g.Count()),
            TasksByPriority = tasksList
                .GroupBy(t => t.Priority)
                .ToDictionary(g => g.Key, g => g.Count()),
            OverdueTasks = tasksList
                .Count(t => t.DueDate.HasValue && t.DueDate.Value < DateTime.UtcNow && t.Status != "Completed")
        };

        return statistics;
    }

    private TaskDto MapToTaskDto(TaskItem task)
    {
        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            Priority = task.Priority,
            DueDate = task.DueDate,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt,
            Assignments = task.Assignments.Select(a => new AssignmentDto
            {
                AssigneeType = a.AssigneeType,
                AssigneeId = a.AssigneeId
            }).ToList(),
            Tags = task.Tags
        };
    }
}