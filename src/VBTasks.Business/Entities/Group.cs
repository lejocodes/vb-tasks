namespace VBTasks.Business.Entities;

public class Group : IEntity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Members { get; set; } = new();
}