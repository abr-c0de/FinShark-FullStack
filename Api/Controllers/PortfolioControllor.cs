using Api.Dtos.Portfolio;
using Api.Extensions;
using Api.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/portfolios")]
    public class PortfolioController(IPortfolioService portfolioService) : ControllerBase
    {
        private readonly IPortfolioService _portfolioService = portfolioService;


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            try
            {
                var portfolio = await _portfolioService.GetUserPortfolioAsync(User.GetUserId());
                return Ok(portfolio);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio([FromBody] AddportfolioDto newPortfolio)
        {
            try
            {
                await _portfolioService.AddPortfolioAsync(User.GetUserId(), newPortfolio.Symbol);
                return Ok();                               
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            try
            {
                await _portfolioService.PortfolioDeleteAsync(User.GetUserId(), symbol);
                return Ok();
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}