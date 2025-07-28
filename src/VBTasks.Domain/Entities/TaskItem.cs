namespace VBTasks.Domain.Entities;

public class TaskItem : IEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskStatus Status { get; set; } = TaskStatus.New;
    public Priority Priority { get; set; } = Priority.Medium;
    public DateTime? DueDate { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<Assignment> Assignments { get; set; } = new();
    public List<string> Tags { get; set; } = new();
}

public class Assignment
{
    public AssigneeType AssigneeType { get; set; }
    public string AssigneeId { get; set; } = string.Empty;
    public string AssignedBy { get; set; } = string.Empty;
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
}