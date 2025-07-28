using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Text.Json;
using VBTasks.Domain.Entities;
using VBTasks.Infrastructure.Services;

namespace VBTasks.API.Tests;

public class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override IHost CreateHost(IHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Ensure test data directory exists
            var testDataPath = Path.Combine(Directory.GetCurrentDirectory(), "Data");
            Directory.CreateDirectory(testDataPath);

            // Create test data files
            CreateTestDataFiles(testDataPath);

            // Override JsonFileService to use test data path
            services.AddSingleton<JsonFileService>(provider => new JsonFileService(testDataPath));
        });

        return base.CreateHost(builder);
    }

    private void CreateTestDataFiles(string dataPath)
    {
        // Create test users with SHA256 hashed passwords
        var users = new List<User>
        {
            new User
            {
                Id = "test-user-1",
                Email = "john.doe@example.com",
                Name = "John Doe",
                PasswordHash = HashPassword("password123"), // SHA256 hash
                Role = "Developer",
                IsActive = true
            }
        };

        // Create test groups
        var groups = new List<Group>
        {
            new Group
            {
                Id = "development",
                Name = "Development Team",
                Description = "Development team members",
                Members = new List<string> { "test-user-1" }
            }
        };

        // Create test tasks
        var tasks = new List<TaskItem>
        {
            new TaskItem
            {
                Id = "test-task-1",
                Title = "Test Task",
                Description = "Test task description",
                Status = Domain.Entities.TaskStatus.New,
                Priority = Priority.Medium,
                CreatedBy = "test-user-1",
                Assignments = new List<Assignment>
                {
                    new Assignment
                    {
                        AssigneeType = AssigneeType.Group,
                        AssigneeId = "development",
                        AssignedBy = "test-user-1",
                        AssignedAt = DateTime.UtcNow
                    }
                }
            }
        };

        // Write test data files
        var options = new JsonSerializerOptions { WriteIndented = true };
        File.WriteAllText(Path.Combine(dataPath, "users.json"), JsonSerializer.Serialize(users, options));
        File.WriteAllText(Path.Combine(dataPath, "groups.json"), JsonSerializer.Serialize(groups, options));
        File.WriteAllText(Path.Combine(dataPath, "tasks.json"), JsonSerializer.Serialize(tasks, options));
    }

    private static string HashPassword(string password)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            // Clean up test data
            var testDataPath = Path.Combine(Directory.GetCurrentDirectory(), "Data");
            if (Directory.Exists(testDataPath))
            {
                Directory.Delete(testDataPath, true);
            }
        }
        base.Dispose(disposing);
    }
}