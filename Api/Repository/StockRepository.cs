using Api.Data;
using Api.Dtos.Stock;
using Api.Helpers;
using Api.Interface;
using Api.Mappers;
using Api.Model;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class StockRepository(ApplicationDbContext context) : IStockRepository
    {
        private readonly ApplicationDbContext _context = context;
         

        public async Task<IEnumerable<StockDto>> GetAllStocksAsync(StockQueryObject query)
        {
           var stocks = _context.Stocks
                 .AsNoTracking()
                 .Include(s => s.Comments)
                 .ThenInclude(a => a.AppUser)
                 .AsQueryable();

            if (!string.IsNullOrEmpty(query.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
            }
            if (!string.IsNullOrEmpty(query.CompanyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
            }
            if(!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDescending ? stocks.OrderByDescending(s => s.Symbol) : stocks.OrderBy(s => s.Symbol);
                }
                else if(query.SortBy.Equals("CompanyName", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDescending ? stocks.OrderByDescending(s => s.CompanyName) : stocks.OrderBy(s => s.CompanyName);
                }
                else if(query.SortBy.Equals("MarketCap", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDescending ? stocks.OrderByDescending(s => s.MarketCap) : stocks.OrderBy(s => s.MarketCap);
                }

            }
            
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
                
            stocks = stocks.Skip(skipNumber).Take(query.PageSize);

            
            var stockList = await stocks.ToListAsync();
            return stockList.Select(s => s.StockToStockDto());
        }

        // public async Task<List<StockDto>> GetAllStocksAsync()
        // {
        //    return await _context.Stocks
        //          .Select(s => new StockDto
        //          {
        //             Id = s.Id,
        //             Symbol = s.Symbol,
        //             CompanyName = s.CompanyName,
        //             Purchase = s.Purchase,
        //             LastDiv = s.LastDiv,
        //             Industry = s.Industry,
        //             MarketCap = s.MarketCap,
        //             Comments = s.Comments.Select(c => new CommentDto
        //              {
        //                 Id = c.Id,
        //                 Title = c.Title,
        //                 Content = c.Content,
        //                 CreatedAt = c.CreatedAt,
        //                 StockId = c.StockId
        //             }).ToList()
        //                 })
        //                 .ToListAsync();
        // }

        public async Task<StockDto?> GetStockByIdAsync(int id)
        {
            var stock = await _context.Stocks
                .AsNoTracking()
                .Include(s => s.Comments)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (stock == null)
                return null;

            return stock.StockToStockDto();
        }

        public async Task<StockDto?> GetStockBySymbolAsync(string symbol)
        {
            var stock = await _context.Stocks.AsNoTracking().FirstOrDefaultAsync(s => s.Symbol == symbol);

            if (stock == null)
                return null;

            return stock.StockToStockDto();

        }

        public async Task<StockDto> CreateStockAsync(StockDto stockRequest)
        {
            var stock = new Stock {
                Symbol = stockRequest.Symbol,
                CompanyName = stockRequest.CompanyName,
                Purchase = stockRequest.Purchase,
                LastDiv = stockRequest.LastDiv,
                Industry = stockRequest.Industry,
                MarketCap = stockRequest.MarketCap

            };
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return stock.StockToStockDto();
        }

        public async Task<StockDto?> UpdateStockAsync(int id, UpdateStockRequestDto StockDto)
        {
            var existingstock = await _context.Stocks.FindAsync(id);
            if (existingstock == null)
                return null;

            existingstock.Symbol = StockDto.Symbol;
            existingstock.CompanyName = StockDto.CompanyName;
            existingstock.Purchase = StockDto.Purchase;
            existingstock.LastDiv = StockDto.LastDiv;
            existingstock.Industry = StockDto.Industry;
            existingstock.MarketCap = StockDto.MarketCap;

            await _context.SaveChangesAsync();
            return existingstock.StockToStockDto();
        }

        public async Task<bool> DeleteStockAsync(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock == null)
                return false;

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
            return true;
        }
        
        public async Task<bool> StockExistsAsync(string symbol)
        {
            return await _context.Stocks.AsNoTracking().AnyAsync(s => s.Symbol == symbol);
        }
    }
}