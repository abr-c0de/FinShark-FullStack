using Api.Dtos.Stock;
using Api.Helpers;

namespace Api.Interface
{
    public interface IStockRepository
    {
        Task<IEnumerable<StockDto>> GetAllStocksAsync(StockQueryObject query);
        Task<StockDto?> GetStockByIdAsync(int id);
        Task<StockDto?> GetStockBySymbolAsync(string symbol);
        Task<StockDto> CreateStockAsync(StockDto createStockRequestDto);
        Task<StockDto?> UpdateStockAsync(int id, UpdateStockRequestDto updateStockRequestDto);
        Task<bool> DeleteStockAsync(int id);
        Task<bool> StockExistsAsync(string symbol);
    }
}