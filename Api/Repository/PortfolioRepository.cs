using Api.Data;
using Api.Dtos.Stock;
using Api.Interface;
using Api.Model;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class PortfolioRepository(ApplicationDbContext context) : IPortfolioRepository
    {
        private readonly ApplicationDbContext _context = context;


        public async Task<List<StockDto>> GetUserPortfolio(string userId)
        {

            return await _context.Portfolios.AsNoTracking().Where(u => u.AppUserId == userId)
            .Select(stock => new StockDto
            {
                Id = stock.StockId,
                Symbol = stock.Stock.Symbol,
                CompanyName = stock.Stock.CompanyName,
                Purchase = stock.Stock.Purchase,
                Industry = stock.Stock.Industry,
                MarketCap = stock.Stock.MarketCap
            }).ToListAsync();
        }

        public async Task<bool> CreatePortfolioAsync(Portfolio newPortfolio)
        {
            await _context.Portfolios.AddAsync(newPortfolio);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> PortfolioExistAsync(string userId, int stockId)
        {
            return await _context.Portfolios.AsNoTracking()
                            .AnyAsync(p => p.AppUserId == userId && p.StockId == stockId);
        }

        public async Task<bool> DeletePortfolioAsync(string userId, string symbol)
        {
            

            var portfolio = await _context.Portfolios
                .Include(p => p.Stock)
                .FirstOrDefaultAsync(p => p.AppUserId == userId && p.Stock.Symbol == symbol);

            

            if (portfolio == null)
                return false;

            _context.Entry(portfolio).State = EntityState.Deleted;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}