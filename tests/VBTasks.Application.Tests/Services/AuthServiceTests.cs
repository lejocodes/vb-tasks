using Microsoft.Extensions.Configuration;
using Moq;
using VBTasks.Application.DTOs;
using VBTasks.Application.Services;
using VBTasks.Domain.Entities;
using VBTasks.Domain.Interfaces;
using Xunit;

using System.Security.Cryptography;
using System.Text;

namespace VBTasks.Application.Tests.Services;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _configurationMock = new Mock<IConfiguration>();
        
        // Setup configuration mock
        _configurationMock.Setup(x => x["Jwt:Secret"])
            .Returns("TestSecretKeyForJWTAuthenticationMustBeAtLeast256Bits!");
        _configurationMock.Setup(x => x["Jwt:Issuer"])
            .Returns("VBTasks");
        _configurationMock.Setup(x => x["Jwt:Audience"])
            .Returns("VBTasks");
        
        _authService = new AuthService(_userRepositoryMock.Object, _configurationMock.Object);
    }

    [Fact]
    public async Task LoginAsync_ValidCredentials_ReturnsAuthResponse()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "password123"
        };
        var hashedPassword = HashPassword(loginDto.Password);
        var user = new User
        {
            Id = "user1",
            Email = loginDto.Email,
            Name = "Test User",
            PasswordHash = hashedPassword,
            Role = "User",
            IsActive = true
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(loginDto.Email))
            .ReturnsAsync(user);

        // Act
        var result = await _authService.LoginAsync(loginDto);

        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result!.Token);
        Assert.Equal(user.Id, result.User.Id);
        Assert.Equal(user.Email, result.User.Email);
        _userRepositoryMock.Verify(x => x.GetByEmailAsync(loginDto.Email), Times.Once);
    }

    [Fact]
    public async Task LoginAsync_InvalidPassword_ReturnsNull()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "wrongpassword"
        };
        var hashedPassword = HashPassword("correctpassword");
        var user = new User
        {
            Id = "user1",
            Email = loginDto.Email,
            PasswordHash = hashedPassword,
            IsActive = true
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(loginDto.Email))
            .ReturnsAsync(user);

        // Act
        var result = await _authService.LoginAsync(loginDto);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task LoginAsync_UserNotFound_ReturnsNull()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "nonexistent@example.com",
            Password = "password123"
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(loginDto.Email))
            .ReturnsAsync((User)null);

        // Act
        var result = await _authService.LoginAsync(loginDto);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task LoginAsync_InactiveUser_ReturnsNull()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "password123"
        };
        var hashedPassword = HashPassword(loginDto.Password);
        var user = new User
        {
            Id = "user1",
            Email = loginDto.Email,
            PasswordHash = hashedPassword,
            IsActive = false // Inactive user
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(loginDto.Email))
            .ReturnsAsync(user);

        // Act
        var result = await _authService.LoginAsync(loginDto);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task RegisterAsync_NewUser_ReturnsAuthResponse()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = "newuser@example.com",
            Name = "New User",
            Password = "password123"
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(registerDto.Email))
            .ReturnsAsync((User?)null); // User doesn't exist
        _userRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<User>()))
            .ReturnsAsync((User user) => user);

        // Act
        var result = await _authService.RegisterAsync(registerDto);

        // Assert
        Assert.NotNull(result);
        Assert.NotEmpty(result.Token);
        Assert.Equal(registerDto.Email, result.User.Email);
        Assert.Equal(registerDto.Name, result.User.Name);
        _userRepositoryMock.Verify(x => x.CreateAsync(It.IsAny<User>()), Times.Once);
    }

    [Fact]
    public async Task RegisterAsync_ExistingUser_ReturnsNull()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = "existing@example.com",
            Name = "Existing User",
            Password = "password123"
        };
        var existingUser = new User
        {
            Id = "user1",
            Email = registerDto.Email
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(registerDto.Email))
            .ReturnsAsync(existingUser);

        // Act
        var result = await _authService.RegisterAsync(registerDto);

        // Assert
        Assert.Null(result);
        _userRepositoryMock.Verify(x => x.CreateAsync(It.IsAny<User>()), Times.Never);
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }
}