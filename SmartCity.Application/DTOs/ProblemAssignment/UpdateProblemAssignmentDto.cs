using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.ProblemAssignment
{
    public class UpdateProblemAssignmentDto
    {
        public int? ProblemId { get; set; }

        public int? ReportedByUserId { get; set; }

        public int? AssignedToUserId { get; set; }

        public int? DepartmentId { get; set; }

        [MaxLength(50)]
        public string ?Status { get; set; } = "Pending";
    }
}
