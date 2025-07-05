using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.Problem
{
    public class UpdateProblemDto
    {
        [MaxLength(100)]
        public string? Name { get; set; }
        [MaxLength(1000)]
        public string? Description { get; set; }
        [Range(-90, 90)]
        public float? Latitude { get; set; }

        [Range(-180, 180)]
        public float? Longitude { get; set; }
        [MaxLength(50)]
        public string Status { get; set; } = "Pending";

    }
}
