using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;

namespace VBTasks.Business.Services;

public class GroupService : IGroupService
{
    private readonly IGroupRepository _groupRepository;

    public GroupService(IGroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
    }

    public async Task<IEnumerable<Group>> GetGroupsAsync()
    {
        return await _groupRepository.GetAllAsync();
    }

    public async Task<Group?> GetGroupByIdAsync(string id)
    {
        return await _groupRepository.GetByIdAsync(id);
    }
}