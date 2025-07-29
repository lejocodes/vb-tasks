using System.ComponentModel.DataAnnotations;
using VBTasks.Domain.Entities;

namespace VBTasks.Application.DTOs;

public class TaskDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public DateTime? DueDate { get; set; }
    public UserSummaryDto CreatedBy { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<AssignmentDto> Assignments { get; set; } = new();
    public List<string> Tags { get; set; } = new();
}

public class CreateTaskDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 200 characters")]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(2000, ErrorMessage = "Description cannot exceed 2000 characters")]
    public string Description { get; set; } = string.Empty;
    
    public string Priority { get; set; } = "Medium";
    public DateTime? DueDate { get; set; }
    public List<string> Tags { get; set; } = new();
    public List<AssignmentDto> Assignments { get; set; } = new();
}

public class UpdateTaskDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 200 characters")]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(2000, ErrorMessage = "Description cannot exceed 2000 characters")]
    public string Description { get; set; } = string.Empty;
    
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public DateTime? DueDate { get; set; }
    public List<string> Tags { get; set; } = new();
}

public class AssignmentDto
{
    public string AssigneeType { get; set; } = "User";
    public string AssigneeId { get; set; } = string.Empty;
}

public class TaskFilterDto
{
    public string? SearchTerm { get; set; }
    public string? Status { get; set; }
    public string? Priority { get; set; }
    public string? AssigneeId { get; set; }
    public DateTime? DueDateFrom { get; set; }
    public DateTime? DueDateTo { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}

public class TaskStatisticsDto
{
    public int TotalTasks { get; set; }
    public Dictionary<string, int> TasksByStatus { get; set; } = new();
    public Dictionary<string, int> TasksByPriority { get; set; } = new();
    public int OverdueTasks { get; set; }
}