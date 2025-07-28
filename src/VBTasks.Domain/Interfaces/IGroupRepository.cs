using VBTasks.Domain.Entities;

namespace VBTasks.Domain.Interfaces;

public interface IGroupRepository : IRepository<Group>
{
    Task<IEnumerable<Group>> GetGroupsByUserAsync(string userId);
}