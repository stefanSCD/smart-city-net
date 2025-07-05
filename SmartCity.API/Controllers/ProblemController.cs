using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCity.Domain.Entities;
using SmartCity.Infrastructure.Persistence;
using SmartCity.Application.DTOs.Problem;

namespace SmartCity.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProblemController : ControllerBase
    {
        private readonly SmartCityDbContext _db;
        public ProblemController(SmartCityDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Problem>>> Get()
        {
            var problems = await _db.Problems.ToListAsync();
            return Ok(problems);
        }
        [HttpPost]
        public async Task<ActionResult<Problem>> Post(CreateProblemDto dto)
        {
            var problem = new Problem
            {
                Name = dto.Name,
                Description = dto.Description,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                ReporterId = dto.ReporterId,
                Status = dto.Status
            };

            _db.Problems.Add(problem);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = problem.Id }, problem);
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(int id, UpdateProblemDto dto)
        {
            var problem = await _db.Problems.FindAsync(id);

            if (problem == null)
                return NotFound();

            if (dto.Name != null)
                problem.Name = dto.Name;

            if (dto.Description != null)
                problem.Description = dto.Description;

            if (dto.Latitude.HasValue)
                problem.Latitude = (float)dto.Latitude;

            if (dto.Longitude != null)
                problem.Longitude = (float)dto.Longitude;

            if (dto.Status != null)
                problem.Status = dto.Status;

            await _db.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var problem = await _db.Problems.FindAsync(id);
            if (problem == null)
                return NotFound();

            _db.Problems.Remove(problem);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
