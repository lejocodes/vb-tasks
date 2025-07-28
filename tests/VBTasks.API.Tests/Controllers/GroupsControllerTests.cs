using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using VBTasks.Application.DTOs;
using Xunit;

namespace VBTasks.API.Tests.Controllers;

public class GroupsControllerTests : IntegrationTestBase
{
    public GroupsControllerTests(WebApplicationFactory<Program> factory) : base(factory)
    {
    }

    [Fact]
    public async Task GetGroupTasks_WithoutAuth_ReturnsUnauthorized()
    {
        // Act
        var response = await Client.GetAsync("/api/groups/group1/tasks");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetGroupTasks_ExistingGroup_ReturnsTasks()
    {
        // Arrange
        await AuthenticateAsync();
        var groupId = "development"; // Assuming this group exists in sample data

        // Act
        var response = await Client.GetAsync($"/api/groups/{groupId}/tasks");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var tasks = JsonSerializer.Deserialize<List<TaskDto>>(content, JsonOptions);
        
        Assert.NotNull(tasks);
    }

    [Fact]
    public async Task GetGroupTasks_NonExistingGroup_ReturnsNotFound()
    {
        // Arrange
        await AuthenticateAsync();
        var nonExistingGroupId = "non-existing-group-999";

        // Act
        var response = await Client.GetAsync($"/api/groups/{nonExistingGroupId}/tasks");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetGroups_ReturnsAllGroups()
    {
        // Arrange
        await AuthenticateAsync();

        // Act
        var response = await Client.GetAsync("/api/groups");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var groups = JsonSerializer.Deserialize<List<GroupDto>>(content, JsonOptions);
        
        Assert.NotNull(groups);
        Assert.True(groups.Count > 0);
    }

    [Fact]
    public async Task GetMyGroups_ReturnsUserGroups()
    {
        // Arrange
        await AuthenticateAsync();

        // Act
        var response = await Client.GetAsync("/api/groups/my-groups");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var groups = JsonSerializer.Deserialize<List<GroupDto>>(content, JsonOptions);
        
        Assert.NotNull(groups);
    }

}