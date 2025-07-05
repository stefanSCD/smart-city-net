using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.User
{
    public class CreateUserDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public required string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Password { get; set; }

        [Required]
        [MaxLength(50)]
        public required string First_Name { get; set; }

        [MaxLength(50)]
        public string? Middle_Name { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Last_Name { get; set; }

        [Required]
        [MaxLength(50)]
        public required string User_Type { get; set; }

        public int? Department_Id { get; set; }

        [Required]
        [MaxLength(15)]
        public required string Phone { get; set; }
    }

}
