using VBTasks.Domain.Entities;
using VBTasks.Domain.Interfaces;
using VBTasks.Infrastructure.Services;

namespace VBTasks.Infrastructure.Repositories;

public class GroupRepository : JsonRepository<Group>, IGroupRepository
{
    public GroupRepository(JsonFileService jsonService) : base(jsonService, "groups.json")
    {
    }

    public async Task<IEnumerable<Group>> GetGroupsByUserAsync(string userId)
    {
        var groups = await GetAllAsync();
        return groups.Where(g => g.Members.Contains(userId));
    }
}