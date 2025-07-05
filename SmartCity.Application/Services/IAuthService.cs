using SmartCity.Application.DTOs.User;

namespace SmartCity.Application.Services
{
    public interface IAuthService
    {
        // method to register an account
        Task RegisterAsync(CreateUserDto dto);
        // method for login
        Task<string?> LoginAsync(string email, string password);
    }
}
