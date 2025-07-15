using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.Problem
{
    public class CreateProblemDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int ReporterId { get; set; }
        public string Status { get; set; } = "Pending";
        public IFormFile ImageFile { get; set; } = null!;
    }
}
