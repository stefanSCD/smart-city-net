using System.ComponentModel.DataAnnotations;

namespace SmartCity.Application.DTOs.User
{
    public class UpdateUserDto
    {
        [MaxLength(50)]
        public string? Password { get; set; }

        [MaxLength(50)]
        public string? First_Name { get; set; }

        [MaxLength(50)]
        public string? Middle_Name { get; set; }

        [MaxLength(50)]
        public string? Last_Name { get; set; }

        [MaxLength(50)]
        public string? User_Type { get; set; }

        public int? Department_Id { get; set; }

        [MaxLength(15)]
        public string? Phone { get; set; }
    }
}
