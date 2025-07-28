using VBTasks.Application.DTOs;
using VBTasks.Application.Interfaces;
using VBTasks.Domain.Interfaces;

namespace VBTasks.Application.Services;

public class GroupService : IGroupService
{
    private readonly IGroupRepository _groupRepository;
    private readonly IUserRepository _userRepository;

    public GroupService(IGroupRepository groupRepository, IUserRepository userRepository)
    {
        _groupRepository = groupRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<GroupDto>> GetAllGroupsAsync()
    {
        var groups = await _groupRepository.GetAllAsync();
        var groupDtos = new List<GroupDto>();
        
        foreach (var group in groups)
        {
            groupDtos.Add(await MapToGroupDtoAsync(group));
        }
        
        return groupDtos;
    }

    public async Task<GroupDto?> GetGroupByIdAsync(string id)
    {
        var group = await _groupRepository.GetByIdAsync(id);
        return group != null ? await MapToGroupDtoAsync(group) : null;
    }

    public async Task<IEnumerable<GroupDto>> GetUserGroupsAsync(string userId)
    {
        var groups = await _groupRepository.GetGroupsByUserAsync(userId);
        var groupDtos = new List<GroupDto>();
        
        foreach (var group in groups)
        {
            groupDtos.Add(await MapToGroupDtoAsync(group));
        }
        
        return groupDtos;
    }

    private async Task<GroupDto> MapToGroupDtoAsync(Domain.Entities.Group group)
    {
        var members = new List<UserSummaryDto>();
        
        foreach (var memberId in group.Members)
        {
            var user = await _userRepository.GetByIdAsync(memberId);
            if (user != null)
            {
                members.Add(new UserSummaryDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email
                });
            }
        }

        return new GroupDto
        {
            Id = group.Id,
            Name = group.Name,
            Description = group.Description,
            Members = members
        };
    }
}