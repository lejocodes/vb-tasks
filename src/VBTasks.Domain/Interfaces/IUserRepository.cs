using VBTasks.Domain.Entities;

namespace VBTasks.Domain.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
}