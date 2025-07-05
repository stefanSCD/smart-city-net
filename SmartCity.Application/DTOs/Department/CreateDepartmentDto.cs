using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.Department
{
    public class CreateDepartmentDto
    {
        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }
    }
}
