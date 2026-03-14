using Api.Dtos.Stock;
using Api.Interface;
using Api.Model;
using Microsoft.AspNetCore.Identity;

namespace Api.Service
{
    public class PortfolioService(UserManager<AppUser> userManager, IPortfolioRepository portfolioRepository, IStockRepository stockRepository, IFMPService fMPService) : IPortfolioService
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IPortfolioRepository _portfolioRepository = portfolioRepository;
        private readonly IStockRepository _stockRepository = stockRepository;
        private readonly IFMPService _fmpService = fMPService;

        public async Task<IReadOnlyList<StockDto>> GetUserPortfolioAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId)
                ?? throw new KeyNotFoundException("User not found");

            return await _portfolioRepository.GetUserPortfolio(user.Id);
        }

        public async Task AddPortfolioAsync(string userId, string symbol)
        {
            if (string.IsNullOrWhiteSpace(userId))
                throw new ArgumentException("UserId is required", nameof(userId));

            if (string.IsNullOrWhiteSpace(symbol))
                throw new ArgumentException("Symbol is required", nameof(symbol));

            var stock = await _stockRepository.GetStockBySymbolAsync(symbol)
                        ?? await _stockRepository.CreateStockAsync(
                               await _fmpService.FindStockBySymbolAsync(symbol)
                           );

            if (await _portfolioRepository.PortfolioExistAsync(userId, stock.Id))
                throw new InvalidOperationException("Stock already in portfolio");

            var portfolio = new Portfolio
            {
                AppUserId = userId,
                StockId = stock.Id
            };

            var created = await _portfolioRepository.CreatePortfolioAsync(portfolio);

            if (!created)
                throw new InvalidOperationException("Portfolio could not be created.");
        }


        public async Task PortfolioDeleteAsync(string userId, string symbol)
        {
            var deleted = await _portfolioRepository.DeletePortfolioAsync(userId, symbol);

            if (!deleted)
                throw new ArgumentException("Portfolio not found");
        }
    }
}