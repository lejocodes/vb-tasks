using VBTasks.Application.DTOs;

namespace VBTasks.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);
    string GenerateJwtToken(UserDto user);
}