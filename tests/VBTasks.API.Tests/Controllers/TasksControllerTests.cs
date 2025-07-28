using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using VBTasks.Application.DTOs;
using Xunit;

namespace VBTasks.API.Tests.Controllers;

public class TasksControllerTests : IntegrationTestBase
{
    public TasksControllerTests(WebApplicationFactory<Program> factory) : base(factory)
    {
    }

    [Fact]
    public async Task GetStatistics_WithoutAuth_ReturnsUnauthorized()
    {
        // Act
        var response = await Client.GetAsync("/api/tasks/statistics");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetStatistics_WithAuth_ReturnsStatistics()
    {
        // Arrange
        await AuthenticateAsync();

        // Act
        var response = await Client.GetAsync("/api/tasks/statistics");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var statistics = JsonSerializer.Deserialize<TaskStatisticsDto>(content, JsonOptions);
        
        Assert.NotNull(statistics);
        Assert.True(statistics.TotalTasks >= 0);
        Assert.NotNull(statistics.TasksByStatus);
        Assert.NotNull(statistics.TasksByPriority);
    }

    [Fact]
    public async Task CreateTask_ValidData_ReturnsCreated()
    {
        // Arrange
        await AuthenticateAsync();
        var newTask = new CreateTaskDto
        {
            Title = "Integration Test Task",
            Description = "Created by integration test",
            Priority = Domain.Entities.Priority.High
        };

        // Act
        var response = await Client.PostAsJsonAsync("/api/tasks", newTask);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var createdTask = JsonSerializer.Deserialize<TaskDto>(content, JsonOptions);
        
        Assert.NotNull(createdTask);
        Assert.Equal(newTask.Title, createdTask.Title);
        Assert.Equal(newTask.Description, createdTask.Description);
    }

    [Fact]
    public async Task CreateTask_InvalidData_ReturnsBadRequest()
    {
        // Arrange
        await AuthenticateAsync();
        var invalidTask = new CreateTaskDto
        {
            Title = "", // Empty title should fail validation
            Description = "Test"
        };

        // Act
        var response = await Client.PostAsJsonAsync("/api/tasks", invalidTask);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetMyTasks_ReturnsUserTasks()
    {
        // Arrange
        await AuthenticateAsync();

        // Act
        var response = await Client.GetAsync("/api/tasks/my-tasks");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var tasks = JsonSerializer.Deserialize<List<TaskDto>>(content, JsonOptions);
        
        Assert.NotNull(tasks);
    }

}