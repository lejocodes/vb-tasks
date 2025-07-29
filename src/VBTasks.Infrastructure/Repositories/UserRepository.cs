using VBTasks.Business.Entities;
using VBTasks.Business.Interfaces;
using VBTasks.Infrastructure.Services;

namespace VBTasks.Infrastructure.Repositories;

public class UserRepository : JsonRepository<User>, IUserRepository
{
    public UserRepository(JsonFileService jsonService) : base(jsonService, "users.json")
    {
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var users = await GetAllAsync();
        return users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
    }
}