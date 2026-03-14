using Api.Dtos.Stock;
using Api.Model;

namespace Api.Interface
{
    public interface IPortfolioRepository
    {
        Task<List<StockDto>> GetUserPortfolio(string userId);
        Task<bool> CreatePortfolioAsync(Portfolio newPortfolio);
        Task<bool> PortfolioExistAsync(string userId, int stockId);
        Task<bool> DeletePortfolioAsync(string userId,string symbol);
    }
}