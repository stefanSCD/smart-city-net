using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCity.Domain.Entities;
using SmartCity.Infrastructure.Persistence;
using SmartCity.Application.DTOs.ProblemAssignment;
using System.Xml;
using System.Diagnostics.Contracts;


namespace SmartCity.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProblemAssignmentController : ControllerBase
    {
        private readonly SmartCityDbContext _db;
        public ProblemAssignmentController(SmartCityDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProblemAssignment>>> Get()
        {
            var problemsAsigned = await _db.AssignedProblems.ToListAsync();
            return Ok(problemsAsigned);
        }
        [HttpPost]
        public async Task<ActionResult<ProblemAssignment>> Post(CreateProblemAssignmentDto dto)
        {
            var problemAsigned = new ProblemAssignment
            {
                ProblemId = dto.ProblemId,
                AssignedToUserId = dto.AssignedToUserId,
                ReportedByUserId = dto.ReportedByUserId,
                DepartmentId = dto.DepartmentId,
                Status = dto.Status
            };

            _db.AssignedProblems.Add(problemAsigned);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = problemAsigned.Id }, problemAsigned);
        }
        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch (int id, UpdateProblemAssignmentDto dto)
        {
            var problemAssigned = await _db.AssignedProblems.FindAsync(id);
            if (problemAssigned == null)
                return NotFound();

            if (dto.Status != null)
                problemAssigned.Status = dto.Status;

            if (dto.AssignedToUserId.HasValue)
                problemAssigned.AssignedToUserId = (int)dto.AssignedToUserId;

            if (dto.ReportedByUserId.HasValue)
                problemAssigned.ReportedByUserId = (int)dto.ReportedByUserId;

            if (dto.DepartmentId.HasValue)
                problemAssigned.DepartmentId = (int)dto.DepartmentId;

            if (dto.ProblemId.HasValue)
                problemAssigned.ProblemId = (int)dto.ProblemId;

            await _db.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var problemAssigned = await _db.AssignedProblems.FindAsync(id);
            if (problemAssigned == null)
                return NotFound();
            _db.AssignedProblems.Remove(problemAssigned);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        [HttpPatch("{id}/resolve")]
        public async Task<IActionResult> ResolveProblemAssignment(int id)
        {
            var problemAssigned = await _db.AssignedProblems.FindAsync(id);
            if (problemAssigned == null)
                return NotFound();
            if (problemAssigned.Status == "Resolved")
                return BadRequest("Problem assignment is already resolved.");
            var problem = await _db.Problems.FindAsync(problemAssigned.ProblemId);
            if (problem == null)
                return NotFound();
            problemAssigned.Status = "Resolved";
            problem.Status = "Resolved";
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
