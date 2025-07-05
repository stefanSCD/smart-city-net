using Microsoft.EntityFrameworkCore;
using SmartCity.Domain.Entities;


namespace SmartCity.Infrastructure.Persistence
{
    public class SmartCityDbContext : DbContext
    {
        public SmartCityDbContext(DbContextOptions<SmartCityDbContext> options) : base(options) { }
        public DbSet<User> Users => Set<User>();
        public DbSet<Department> Departments => Set<Department>();
        public DbSet<Problem> Problems => Set<Problem>();
        public DbSet<ProblemAssignment> AssignedProblems => Set<ProblemAssignment>();

    }
}
