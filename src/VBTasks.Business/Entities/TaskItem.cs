namespace VBTasks.Business.Entities;

public class TaskItem : IEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "New";
    public string Priority { get; set; } = "Medium";
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<Assignment> Assignments { get; set; } = new();
    public List<string> Tags { get; set; } = new();
}

public class Assignment
{
    public string AssigneeType { get; set; } = "User";
    public string AssigneeId { get; set; } = string.Empty;
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
}