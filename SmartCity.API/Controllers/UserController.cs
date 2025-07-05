using Microsoft.AspNetCore.Mvc;
using SmartCity.Domain.Entities;
using SmartCity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using SmartCity.Application.DTOs.User;

namespace SmartCity.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly SmartCityDbContext _db;

    public UserController(SmartCityDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> Get()
    {
        var users = await _db.Users.ToListAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<ActionResult<User>> Post(CreateUserDto dto)
    {
        var user = new User
        {
            Email = dto.Email,
            Password = dto.Password,
            First_Name = dto.First_Name,
            Middle_Name = dto.Middle_Name ?? string.Empty,
            Last_Name = dto.Last_Name,
            User_Type = dto.User_Type,
            Department_Id = dto.Department_Id,
            Phone = dto.Phone
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
    }
    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, UpdateUserDto dto)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null)
            return NotFound();
        if (dto.Password != null)
            user.Password = dto.Password;

        if (dto.First_Name != null)
            user.First_Name = dto.First_Name;

        if (dto.Middle_Name != null)
            user.Middle_Name = dto.Middle_Name;

        if (dto.Last_Name != null)
            user.Last_Name = dto.Last_Name;

        if (dto.User_Type != null)
            user.User_Type = dto.User_Type;

        if (dto.Department_Id.HasValue)
            user.Department_Id = dto.Department_Id;

        if (dto.Phone != null)
            user.Phone = dto.Phone;

        await _db.SaveChangesAsync();
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null)
            return NotFound();
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}