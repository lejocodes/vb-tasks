using Microsoft.AspNetCore.Mvc;
using VBTasks.Application.DTOs;
using VBTasks.Application.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace VBTasks.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    [SwaggerOperation(Summary = "Get all tasks", Description = "Retrieves a paginated list of tasks with optional filtering")]
    [SwaggerResponse(200, "Success", typeof(PagedResultDto<TaskDto>))]
    public async Task<IActionResult> GetTasks([FromQuery] TaskFilterDto filter)
    {
        var tasks = await _taskService.GetTasksAsync(filter);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get task by ID", Description = "Retrieves a specific task by its ID")]
    [SwaggerResponse(200, "Success", typeof(TaskDto))]
    [SwaggerResponse(404, "Task not found")]
    public async Task<IActionResult> GetTask(string id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
            return NotFound();

        return Ok(task);
    }

    [HttpPost]
    [SwaggerOperation(Summary = "Create a new task", Description = "Creates a new task in the system")]
    [SwaggerResponse(201, "Task created", typeof(TaskDto))]
    [SwaggerResponse(400, "Invalid request")]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
    {
        var userId = "default-user";
        var task = await _taskService.CreateTaskAsync(dto, userId);
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update task", Description = "Updates an existing task")]
    [SwaggerResponse(200, "Task updated", typeof(TaskDto))]
    [SwaggerResponse(404, "Task not found")]
    public async Task<IActionResult> UpdateTask(string id, [FromBody] UpdateTaskDto dto)
    {
        var task = await _taskService.UpdateTaskAsync(id, dto);
        if (task == null)
            return NotFound();

        return Ok(task);
    }

    [HttpDelete("{id}")]
    [SwaggerOperation(Summary = "Delete task", Description = "Deletes a task from the system")]
    [SwaggerResponse(204, "Task deleted")]
    [SwaggerResponse(404, "Task not found")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        var result = await _taskService.DeleteTaskAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }

    [HttpPost("{id}/assign")]
    public async Task<IActionResult> AssignTask(string id, [FromBody] AssignmentDto dto)
    {
        var userId = "default-user";
        var result = await _taskService.AssignTaskAsync(id, dto, userId);
        if (!result)
            return NotFound();

        return Ok(new { message = "Task assigned successfully" });
    }

    [HttpGet("my-tasks")]
    [SwaggerOperation(Summary = "Get current user's tasks", Description = "Retrieves all tasks assigned to the current user")]
    [SwaggerResponse(200, "Success", typeof(IEnumerable<TaskDto>))]
    public async Task<IActionResult> GetMyTasks()
    {
        var userId = "default-user";
        var tasks = await _taskService.GetMyTasksAsync(userId);
        return Ok(tasks);
    }

    [HttpGet("statistics")]
    [SwaggerOperation(Summary = "Get task statistics", Description = "Retrieves statistical information about tasks")]
    [SwaggerResponse(200, "Success", typeof(TaskStatisticsDto))]
    public async Task<IActionResult> GetStatistics()
    {
        var statistics = await _taskService.GetTaskStatisticsAsync();
        return Ok(statistics);
    }
}