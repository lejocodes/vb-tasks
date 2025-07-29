using Microsoft.AspNetCore.Mvc;
using VBTasks.Business.Interfaces;

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
        var groups = await _groupService.GetGroupsAsync();
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
        // Simplified - return all groups for now
        var groups = await _groupService.GetGroupsAsync();
        return Ok(groups);
    }

    [HttpGet("{id}/tasks")]
    public async Task<IActionResult> GetGroupTasks(string id)
    {
        var group = await _groupService.GetGroupByIdAsync(id);
        if (group == null)
            return NotFound();

        // Simplified - get all tasks and filter by group members
        var tasks = await _taskService.GetAllTasksAsync();
        var groupTasks = tasks.Where(t => t.Assignments.Any(a => a.AssigneeType == "Group" && a.AssigneeId == id));
        return Ok(tasks);
    }
}