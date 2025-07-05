using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.ProblemAssignment
{
    public class CreateProblemAssignmentDto
    {
        [Required]
        public int ProblemId { get; set; }

        [Required]
        public int ReportedByUserId { get; set; }

        [Required]
        public int AssignedToUserId { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Pending";
    }
}
