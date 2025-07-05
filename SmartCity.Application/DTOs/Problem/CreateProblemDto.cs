using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.Problem
{
    public class CreateProblemDto
    {
        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }

        [Required]
        [MaxLength(1000)]
        public required string Description { get; set; }

        [Range(-90, 90)]
        public float Latitude { get; set; }

        [Range(-180, 180)]
        public float Longitude { get; set; }

        [Required]
        public int ReporterId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Pending";
    }
}
