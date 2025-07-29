using Microsoft.AspNetCore.Mvc;
using VBTasks.Business.DTOs;
using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;
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
    [SwaggerResponse(200, "Success", typeof(PagedResultDto<TaskItem>))]
    public async Task<IActionResult> GetTasks([FromQuery] TaskFilterDto filter)
    {
        var tasks = await _taskService.GetTasksAsync(filter);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get task by ID", Description = "Retrieves a specific task by its ID")]
    [SwaggerResponse(200, "Success", typeof(TaskItem))]
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
    [SwaggerResponse(201, "Task created", typeof(TaskItem))]
    [SwaggerResponse(400, "Invalid request")]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
    {
        var task = await _taskService.CreateTaskAsync(dto);
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update task", Description = "Updates an existing task")]
    [SwaggerResponse(200, "Task updated", typeof(TaskItem))]
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
    [SwaggerOperation(Summary = "Assign task", Description = "Add an assignee to a task")]
    [SwaggerResponse(200, "Task assigned")]
    [SwaggerResponse(404, "Task not found")]
    public async Task<IActionResult> AssignTask(string id, [FromBody] AssignmentDto assignment)
    {
        var result = await _taskService.AssignTaskAsync(id, assignment);
        if (!result)
            return NotFound();

        return Ok(new { message = "Task assigned successfully" });
    }

    [HttpGet("all")]
    [SwaggerOperation(Summary = "Get all tasks", Description = "Retrieves all tasks without pagination")]
    [SwaggerResponse(200, "Success", typeof(IEnumerable<TaskItem>))]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _taskService.GetAllTasksAsync();
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