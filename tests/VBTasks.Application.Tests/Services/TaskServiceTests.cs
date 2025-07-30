using Moq;
using VBTasks.Application.DTOs;
using VBTasks.Application.Services;
using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;
using Xunit;

namespace VBTasks.Application.Tests.Services;

public class TaskServiceTests
{
    private readonly Mock<ITaskRepository> _taskRepositoryMock;
    private readonly TaskService _taskService;

    public TaskServiceTests()
    {
        _taskRepositoryMock = new Mock<ITaskRepository>();
        _taskService = new TaskService(_taskRepositoryMock.Object);
    }

    [Fact]
    public async Task GetTasksAsync_WithNoFilter_ReturnsAllTasks()
    {
        // Arrange
        var tasks = new List<TaskItem>
        {
            new TaskItem { Id = "1", Title = "Task 1", Status = "New", Priority = "High" },
            new TaskItem { Id = "2", Title = "Task 2", Status = "InProgress", Priority = "Medium" }
        };
        _taskRepositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(tasks);

        var filter = new TaskFilterDto { PageNumber = 1, PageSize = 10 };

        // Act
        var result = await _taskService.GetTasksAsync(filter);

        // Assert
        Assert.Equal(2, result.TotalCount);
        Assert.Equal(2, result.Items.Count());
        _taskRepositoryMock.Verify(x => x.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task GetTasksAsync_WithStatusFilter_ReturnsFilteredTasks()
    {
        // Arrange
        var tasks = new List<TaskItem>
        {
            new TaskItem { Id = "1", Title = "Task 1", Status = "New" },
            new TaskItem { Id = "2", Title = "Task 2", Status = "InProgress" },
            new TaskItem { Id = "3", Title = "Task 3", Status = "New" }
        };
        _taskRepositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(tasks);

        var filter = new TaskFilterDto 
        { 
            Status = "New",
            PageNumber = 1, 
            PageSize = 10 
        };

        // Act
        var result = await _taskService.GetTasksAsync(filter);

        // Assert
        Assert.Equal(2, result.TotalCount);
        Assert.All(result.Items, item => Assert.Equal("New", item.Status));
    }

    [Fact]
    public async Task CreateTaskAsync_ValidInput_CreatesTask()
    {
        // Arrange
        var createDto = new CreateTaskDto
        {
            Title = "New Task",
            Description = "Task Description",
            Priority = "High",
            Tags = new List<string> { "tag1", "tag2" },
            Assignments = new List<AssignmentDto>()
        };
        _taskRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<TaskItem>()))
            .ReturnsAsync((TaskItem task) => task);

        // Act
        var result = await _taskService.CreateTaskAsync(createDto);

        // Assert
        Assert.Equal(createDto.Title, result.Title);
        Assert.Equal(createDto.Description, result.Description);
        Assert.Equal(createDto.Priority, result.Priority);
        Assert.Equal(createDto.Tags.Count, result.Tags.Count);
        _taskRepositoryMock.Verify(x => x.CreateAsync(It.IsAny<TaskItem>()), Times.Once);
    }

    [Fact]
    public async Task UpdateTaskAsync_ExistingTask_UpdatesTask()
    {
        // Arrange
        var taskId = "1";
        var existingTask = new TaskItem
        {
            Id = taskId,
            Title = "Old Title",
            Status = "New"
        };
        var updateDto = new UpdateTaskDto
        {
            Title = "Updated Title",
            Description = "Updated Description",
            Status = "InProgress",
            Priority = "High"
        };
        _taskRepositoryMock.Setup(x => x.GetByIdAsync(taskId)).ReturnsAsync(existingTask);
        _taskRepositoryMock.Setup(x => x.UpdateAsync(It.IsAny<TaskItem>())).Returns(Task.CompletedTask);

        // Act
        var result = await _taskService.UpdateTaskAsync(taskId, updateDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(updateDto.Title, result.Title);
        Assert.Equal(updateDto.Status, result.Status);
        _taskRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<TaskItem>()), Times.Once);
    }

    [Fact]
    public async Task DeleteTaskAsync_ExistingTask_ReturnsTrue()
    {
        // Arrange
        var taskId = "1";
        var existingTask = new TaskItem { Id = taskId };

        _taskRepositoryMock.Setup(x => x.GetByIdAsync(taskId)).ReturnsAsync(existingTask);
        _taskRepositoryMock.Setup(x => x.DeleteAsync(taskId)).Returns(Task.CompletedTask);

        // Act
        var result = await _taskService.DeleteTaskAsync(taskId);

        // Assert
        Assert.True(result);
        _taskRepositoryMock.Verify(x => x.DeleteAsync(taskId), Times.Once);
    }

    [Fact]
    public async Task DeleteTaskAsync_NonExistingTask_ReturnsFalse()
    {
        // Arrange
        var taskId = "999";
        _taskRepositoryMock.Setup(x => x.GetByIdAsync(taskId)).ReturnsAsync((TaskItem?)null);

        // Act
        var result = await _taskService.DeleteTaskAsync(taskId);

        // Assert
        Assert.False(result);
        _taskRepositoryMock.Verify(x => x.DeleteAsync(It.IsAny<string>()), Times.Never);
    }

    [Fact]
    public async Task GetAllTasksAsync_ReturnsAllTasks()
    {
        // Arrange
        var tasks = new List<TaskItem>
        {
            new TaskItem { Id = "1", Title = "Group Task 1" },
            new TaskItem { Id = "2", Title = "Group Task 2" }
        };
        var user = new User { Id = "user1", Name = "Test User", Email = "test@example.com" };

        _taskRepositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(tasks);

        // Act
        var result = await _taskService.GetAllTasksAsync();

        // Assert
        Assert.Equal(2, result.Count());
        _taskRepositoryMock.Verify(x => x.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task GetTaskStatisticsAsync_ReturnsCorrectStatistics()
    {
        // Arrange
        var tasks = new List<TaskItem>
        {
            new TaskItem { Status = "New", Priority = "High" },
            new TaskItem { Status = "New", Priority = "Medium" },
            new TaskItem { Status = "InProgress", Priority = "High" },
            new TaskItem { Status = "Completed", Priority = "Low" },
            new TaskItem { 
                Status = "InProgress", 
                Priority = "Critical",
                DueDate = DateTime.UtcNow.AddDays(-1) // Overdue
            }
        };

        _taskRepositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(tasks);

        // Act
        var result = await _taskService.GetTaskStatisticsAsync();

        // Assert
        Assert.Equal(5, result.TotalTasks);
        Assert.Equal(2, result.TasksByStatus["New"]);
        Assert.Equal(2, result.TasksByStatus["InProgress"]);
        Assert.Equal(1, result.TasksByStatus["Completed"]);
        Assert.Equal(2, result.TasksByPriority["High"]);
        Assert.Equal(1, result.TasksByPriority["Critical"]);
        Assert.Equal(1, result.OverdueTasks);
    }

    [Fact]
    public async Task AssignTaskAsync_ValidAssignment_ReturnsTrue()
    {
        // Arrange
        var taskId = "1";
        var existingTask = new TaskItem 
        { 
            Id = taskId,
            Assignments = new List<Assignment>()
        };
        var assignmentDto = new AssignmentDto
        {
            AssigneeType = "User",
            AssigneeId = "assignee1"
        };

        _taskRepositoryMock.Setup(x => x.GetByIdAsync(taskId)).ReturnsAsync(existingTask);
        _taskRepositoryMock.Setup(x => x.UpdateAsync(It.IsAny<TaskItem>())).Returns(Task.CompletedTask);

        // Act
        var result = await _taskService.AssignTaskAsync(taskId, assignmentDto);

        // Assert
        Assert.True(result);
        Assert.Single(existingTask.Assignments);
        Assert.Equal(assignmentDto.AssigneeId, existingTask.Assignments.First().AssigneeId);
        _taskRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<TaskItem>()), Times.Once);
    }
}