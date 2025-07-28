using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using VBTasks.Application.DTOs;

namespace VBTasks.API.Tests;

public abstract class IntegrationTestBase : IClassFixture<WebApplicationFactory<Program>>
{
    protected readonly WebApplicationFactory<Program> Factory;
    protected readonly HttpClient Client;
    protected readonly JsonSerializerOptions JsonOptions;

    protected IntegrationTestBase(WebApplicationFactory<Program> factory)
    {
        Factory = factory;
        Client = factory.CreateClient();
        JsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    }

    protected async Task<string?> GetAuthTokenAsync()
    {
        // First try to login with existing user
        var loginDto = new LoginDto
        {
            Email = "john.doe@example.com",
            Password = "password123"
        };

        var loginResponse = await Client.PostAsJsonAsync("/api/auth/login", loginDto);
        
        if (!loginResponse.IsSuccessStatusCode)
        {
            // If login fails, try to register a new user
            var registerDto = new RegisterDto
            {
                Email = "test@example.com",
                Name = "Test User",
                Password = "password123"
            };

            var registerResponse = await Client.PostAsJsonAsync("/api/auth/register", registerDto);
            if (!registerResponse.IsSuccessStatusCode)
                return null;

            var registerContent = await registerResponse.Content.ReadAsStringAsync();
            var registerResult = JsonSerializer.Deserialize<AuthResponseDto>(registerContent, JsonOptions);
            return registerResult?.Token;
        }

        var loginContent = await loginResponse.Content.ReadAsStringAsync();
        var authResponse = JsonSerializer.Deserialize<AuthResponseDto>(loginContent, JsonOptions);
        return authResponse?.Token;
    }

    protected async Task AuthenticateAsync()
    {
        // Clear any existing auth headers
        Client.DefaultRequestHeaders.Authorization = null;
        
        var token = await GetAuthTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }
        else
        {
            throw new InvalidOperationException("Failed to authenticate for tests");
        }
    }
}