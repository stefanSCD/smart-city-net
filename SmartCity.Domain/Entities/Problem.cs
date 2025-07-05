using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SmartCity.Domain.Entities
{
    public class Problem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

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

        [ForeignKey("ReporterId")]
        [JsonIgnore]
        public User? Reporter { get; set; }
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Pending";
    }
}