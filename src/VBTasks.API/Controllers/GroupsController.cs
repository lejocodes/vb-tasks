using Microsoft.AspNetCore.Mvc;
using VBTasks.Application.Interfaces;

namespace VBTasks.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupsController : ControllerBase
{
    private readonly IGroupService _groupService;
    private readonly ITaskService _taskService;

    public GroupsController(IGroupService groupService, ITaskService taskService)
    {
        _groupService = groupService;
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGroups()
    {
        var groups = await _groupService.GetAllGroupsAsync();
        return Ok(groups);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGroup(string id)
    {
        var group = await _groupService.GetGroupByIdAsync(id);
        if (group == null)
            return NotFound();

        return Ok(group);
    }

    [HttpGet("my-groups")]
    public async Task<IActionResult> GetMyGroups()
    {
        var userId = "default-user";
        var groups = await _groupService.GetUserGroupsAsync(userId);
        return Ok(groups);
    }

    [HttpGet("{id}/tasks")]
    public async Task<IActionResult> GetGroupTasks(string id)
    {
        var group = await _groupService.GetGroupByIdAsync(id);
        if (group == null)
            return NotFound();

        var tasks = await _taskService.GetGroupTasksAsync(id);
        return Ok(tasks);
    }
}