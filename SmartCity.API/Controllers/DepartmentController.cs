using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCity.Domain.Entities;
using SmartCity.Infrastructure.Persistence;
using SmartCity.Application.DTOs.Department;

namespace SmartCity.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly SmartCityDbContext _db;
        public DepartmentController( SmartCityDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> Get()
        {
            var departments = await _db.Departments.ToListAsync();
            return Ok(departments);
        }
        [HttpPost]
        public async Task<ActionResult<Department>> Post(CreateDepartmentDto dto)
        {
            var dep = new Department
            {
                Name = dto.Name
            };
            _db.Departments.Add(dep);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = dep.Id }, dep);
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, UpdateDepartmentDto dto)
        {
            var department = await _db.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            if(dto.Name != null)
            {
                department.Name = dto.Name;
            }
            await _db.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var department = await _db.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            _db.Departments.Remove(department);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
