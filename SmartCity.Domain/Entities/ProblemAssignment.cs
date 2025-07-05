using SmartCity.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class ProblemAssignment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ProblemId { get; set; }

    [JsonIgnore]
    public Problem? Problem { get; set; }

    [Required]
    public int ReportedByUserId { get; set; }

    [JsonIgnore]
    public User? ReportedBy { get; set; }

    [Required]
    public int AssignedToUserId { get; set; }

    [JsonIgnore]
    public User? AssignedTo { get; set; }

    [Required]
    public int DepartmentId { get; set; }

    [JsonIgnore]
    public Department? Department { get; set; }

    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = "Pending";
}