using System.ComponentModel.DataAnnotations;
using VBTasks.Domain.Constants;

namespace VBTasks.Business.DTOs;

public class CreateTaskDto
{
    [Required(ErrorMessage = TaskConstants.ErrorMessages.TitleRequired)]
    [StringLength(TaskConstants.Defaults.MaxTitleLength, MinimumLength = 1, ErrorMessage = TaskConstants.ErrorMessages.TitleTooLong)]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(TaskConstants.Defaults.MaxDescriptionLength, ErrorMessage = TaskConstants.ErrorMessages.DescriptionTooLong)]
    public string Description { get; set; } = string.Empty;
    
    public string Priority { get; set; } = TaskConstants.Defaults.DefaultPriority;
    public DateTime? DueDate { get; set; }
    public List<string> Tags { get; set; } = new();
    public List<AssignmentDto> Assignments { get; set; } = new();
}

public class UpdateTaskDto : CreateTaskDto
{
    public string Status { get; set; } = TaskConstants.Defaults.DefaultStatus;
}

public class AssignmentDto
{
    public string AssigneeType { get; set; } = TaskConstants.AssigneeType.User;
    public string AssigneeId { get; set; } = string.Empty;
}

public class TaskFilterDto
{
    public string? SearchTerm { get; set; }
    public string? Status { get; set; }
    public string? Priority { get; set; }
    public string? Assignee { get; set; }
    public DateTime? DueDateFrom { get; set; }
    public DateTime? DueDateTo { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = TaskConstants.Defaults.DefaultPageSize;
}

public class TaskStatisticsDto
{
    public int TotalTasks { get; set; }
    public Dictionary<string, int> TasksByStatus { get; set; } = new();
    public Dictionary<string, int> TasksByPriority { get; set; } = new();
    public int OverdueTasks { get; set; }
}