using System.ComponentModel.DataAnnotations;

namespace Api.Dtos.Portfolio
{
    public class AddportfolioDto
    {
        [Required]
        public string Symbol { get; set; } = null!;
    }
}