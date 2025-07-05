using Microsoft.EntityFrameworkCore;
using SmartCity.Application.DTOs.User;
using SmartCity.Application.Services;
using SmartCity.Domain.Entities;
using SmartCity.Infrastructure.Persistence;

namespace SmartCity.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly SmartCityDbContext _db;

        public AuthService(SmartCityDbContext db)
        {
            _db = db;
        }
        public async Task<string?> LoginAsync(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return null;

            if (user.Password != password)
                return null;

            return "dummy-token-for-" + user.Email;
        }

        public async Task RegisterAsync(CreateUserDto dto)
        {
            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existingUser != null)
                throw new Exception("Email already registered.");
            var user = new User
            {
                Email = dto.Email,
                Password = dto.Password,
                First_Name = dto.First_Name,
                Middle_Name = dto.Middle_Name ?? "",
                Last_Name = dto.Last_Name,
                User_Type = dto.User_Type,
                Department_Id = dto.Department_Id ?? null,
                Phone = dto.Phone
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }

    }
}
