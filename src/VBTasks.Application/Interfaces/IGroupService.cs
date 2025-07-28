using VBTasks.Application.DTOs;

namespace VBTasks.Application.Interfaces;

public interface IGroupService
{
    Task<IEnumerable<GroupDto>> GetAllGroupsAsync();
    Task<GroupDto?> GetGroupByIdAsync(string id);
    Task<IEnumerable<GroupDto>> GetUserGroupsAsync(string userId);
}