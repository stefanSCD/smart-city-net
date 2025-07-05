using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.User
{
    public class LoginUserDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public required string email { get; set; }
        [Required]
        [MaxLength(50)]
        public required string password { get; set; }
    }
}
