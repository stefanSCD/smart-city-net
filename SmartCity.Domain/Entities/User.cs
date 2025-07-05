using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SmartCity.Domain.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public required string Email { get; set;}
        [Required]
        [MaxLength(50)]
        public required string Password { get; set; }
        [Required]
        [MaxLength(50)]
        public required string First_Name { get; set; }
        [MaxLength(50)]
        public required string Middle_Name { get;set; }
        [Required]
        [MaxLength(50)]
        public required string Last_Name { get; set; }
        [Required]
        [MaxLength(50)]
        public required string User_Type { get; set; }
        public int? Department_Id { get; set; }
        [ForeignKey("Department_Id")]
        [JsonIgnore]
        public Department? Department { get; set; }
        [Required]
        [MaxLength(15)]
        public required string Phone { get; set; }
    }
}
