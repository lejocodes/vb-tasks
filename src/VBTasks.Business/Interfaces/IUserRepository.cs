using VBTasks.Business.Entities;

namespace VBTasks.Business.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
}