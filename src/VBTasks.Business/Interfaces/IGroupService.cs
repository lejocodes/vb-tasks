using VBTasks.Business.Entities;

namespace VBTasks.Business.Interfaces;

public interface IGroupService
{
    Task<IEnumerable<Group>> GetGroupsAsync();
    Task<Group?> GetGroupByIdAsync(string id);
}