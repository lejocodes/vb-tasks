using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using VBTasks.Application.DTOs;
using Xunit;

namespace VBTasks.API.Tests.Controllers;

public class TasksControllerTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;
    private readonly HttpClient _client;
    private readonly JsonSerializerOptions _jsonOptions;

    public TasksControllerTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
        _jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    }

    [Fact]
    public async Task GetStatistics_WithoutAuth_ReturnsUnauthorized()
    {
        // Act
        var response = await _client.GetAsync("/api/tasks/statistics");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetStatistics_WithAuth_ReturnsStatistics()
    {
        // Arrange
        await AuthenticateAsync();

        // Act
        var response = await _client.GetAsync("/api/tasks/statistics");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var statistics = JsonSerializer.Deserialize<TaskStatisticsDto>(content, _jsonOptions);
        
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
        var response = await _client.PostAsJsonAsync("/api/tasks", newTask);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        var createdTask = JsonSerializer.Deserialize<TaskDto>(content, _jsonOptions);
        
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
        var response = await _client.PostAsJsonAsync("/api/tasks", invalidTask);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetMyTasks_ReturnsUserTasks()
    {
        // Arrange
        await AuthenticateAsync();

        // Act
        var response = await _client.GetAsync("/api/tasks/my-tasks");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var tasks = JsonSerializer.Deserialize<List<TaskDto>>(content, _jsonOptions);
        
        Assert.NotNull(tasks);
    }

    private async Task AuthenticateAsync()
    {
        var loginDto = new LoginDto
        {
            Email = "john.doe@example.com",
            Password = "password123"
        };

        var response = await _client.PostAsJsonAsync("/api/auth/login", loginDto);
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var authResponse = JsonSerializer.Deserialize<AuthResponseDto>(content, _jsonOptions);
            _client.DefaultRequestHeaders.Authorization = 
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", authResponse?.Token);
        }
    }
}