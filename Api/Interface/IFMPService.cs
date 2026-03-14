using Api.Dtos.Stock;

namespace Api.Interface
{
    public interface IFMPService
    {
        Task<StockDto> FindStockBySymbolAsync(string symbol);
    }
}