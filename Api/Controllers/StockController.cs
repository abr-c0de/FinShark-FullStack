using Api.Dtos.Stock;
using Api.Helpers;
using Api.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [ApiController]
    [Route("api/stocks")]
    public class StockController(IStockRepository stockRepository) : ControllerBase
    {
        private readonly IStockRepository _stockRepository = stockRepository;
        

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetStocksAsync([FromQuery] StockQueryObject query)
        {
            var stockDtos = await _stockRepository.GetAllStocksAsync(query);
            return Ok(stockDtos);
        }

        [HttpGet("{id:int}", Name = "GetStockById")]
        public async Task<IActionResult> GetStockByIdAsync([FromRoute] int id)
        {
            var stock = await _stockRepository.GetStockByIdAsync(id);
            if (stock == null)
                return NotFound();
            return Ok(stock);

        }

        [HttpPost]
        public async Task<IActionResult> CreateStockAsync([FromBody] StockDto NewStock)
        {
            var stock = await _stockRepository.CreateStockAsync(NewStock);
            if (stock == null)
                return BadRequest();

            return CreatedAtRoute(
                "GetStockById",
                 new { id = stock.Id },
                 stock
            );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateStockAsync([FromRoute] int id, [FromBody] UpdateStockRequestDto UpdatedStock)
        {
            var stock = await _stockRepository.UpdateStockAsync(id, UpdatedStock);
            if (stock == null)
                return NotFound();

            return Ok(stock);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStock([FromRoute] int id)
        {
            var stock = await _stockRepository.DeleteStockAsync(id);
            if (!stock)
                return NotFound();
            return NoContent();
        }
    }
}