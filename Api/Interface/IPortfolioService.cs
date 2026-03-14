using Api.Dtos.Stock;

namespace Api.Interface
{
    public interface IPortfolioService
    {
        Task<IReadOnlyList<StockDto>> GetUserPortfolioAsync(string userId);
        Task AddPortfolioAsync(string userId,string symbol);
        Task PortfolioDeleteAsync(string userId, string symbol);
    }
}