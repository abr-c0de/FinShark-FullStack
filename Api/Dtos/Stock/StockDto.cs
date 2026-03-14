using System.ComponentModel.DataAnnotations.Schema;
using Api.Dtos.Comment;

namespace Api.Dtos.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Purchase { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public decimal MarketCap { get; set; }
        public List<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}
