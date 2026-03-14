using Api.Dtos.Comment;
using Api.Dtos.Stock;
using Api.Model;

namespace Api.Mappers
{
    public static class StockMapper
    {
        public static StockDto StockToStockDto(this Stock stock)
        {
            return new StockDto
            {
                Id = stock.Id,
                Symbol = stock.Symbol,
                CompanyName = stock.CompanyName,
                Purchase = stock.Purchase,
                LastDiv = stock.LastDiv,
                Industry = stock.Industry,
                MarketCap = stock.MarketCap,
                Comments = stock.Comments?.Select(c => c.CommentToCommentDto()).ToList() ?? new List<CommentDto>()
            };
        }

        public static Stock CreateDtoToStock(this CreateStockRequestDto createStockRequestDto)
        {
            return new Stock
            {
                Symbol = createStockRequestDto.Symbol,
                CompanyName = createStockRequestDto.CompanyName,
                Purchase = createStockRequestDto.Purchase,
                LastDiv = createStockRequestDto.LastDiv,
                Industry = createStockRequestDto.Industry,
                MarketCap = createStockRequestDto.MarketCap
            };
        }

        public static StockDto FMPStockToStockDto(this FMPStocks fmpstock)
        {
            return new StockDto
            {
                Symbol = fmpstock.symbol,
                CompanyName = fmpstock.companyName ,
                Purchase = fmpstock.price,
                LastDiv = fmpstock.lastDividend,
                Industry = fmpstock.industry,
                MarketCap = fmpstock.marketCap
            };
        }
    }
}
