namespace VBTasks.Domain.Entities;

public class User : IEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Developer";
    public bool IsActive { get; set; } = true;
}