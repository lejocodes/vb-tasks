using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http.Json;
using VBTasks.Application.DTOs;
using Xunit;

namespace VBTasks.API.Tests.Controllers;

/// <summary>
/// Basic tests to verify authentication and API functionality
/// </summary>
public class BasicAuthTests : IntegrationTestBase
{
    public BasicAuthTests(WebApplicationFactory<Program> factory) : base(factory)
    {
    }

    [Fact]
    public async Task RegisterAndLogin_ShouldWork()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = $"test_{Guid.NewGuid()}@example.com",
            Name = "Test User",
            Password = "password123"
        };

        // Act - Register
        var registerResponse = await Client.PostAsJsonAsync("/api/auth/register", registerDto);
        
        // Assert - Register
        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);
        var registerContent = await registerResponse.Content.ReadAsStringAsync();
        Assert.Contains("token", registerContent.ToLower());

        // Act - Login
        var loginDto = new LoginDto
        {
            Email = registerDto.Email,
            Password = registerDto.Password
        };
        var loginResponse = await Client.PostAsJsonAsync("/api/auth/login", loginDto);
        
        // Assert - Login
        Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);
    }

    [Fact]
    public async Task GetStatistics_WithValidAuth_ShouldWork()
    {
        // Arrange - Register and authenticate
        await AuthenticateAsync();

        // Act
        var response = await Client.GetAsync("/api/tasks/statistics");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}