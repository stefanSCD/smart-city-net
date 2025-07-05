using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.Department
{
    public class UpdateDepartmentDto
    {
        [MaxLength(100)]
        public required string Name { get; set; }
    }
}
