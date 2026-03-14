using Api.Dtos.Comment;
using Api.Extensions;
using Api.Helpers;
using Api.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, IFMPService fmpService) : ControllerBase
    {
        private readonly ICommentRepository _commentRepository = commentRepository;
        private readonly IStockRepository _stockRepository = stockRepository;
        private readonly IFMPService _fmpService = fmpService;


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCommentsAsync([FromQuery]CommentQueryObject query)
        {
            var comments = await _commentRepository.GetAllCommentsAsync(query);
            return Ok(comments);
        }

        [HttpGet("{id:int}", Name = "GetCommentById")]
        [Authorize]
        public async Task<IActionResult> GetCommentByIdAsync([FromRoute] int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if (comment == null)
                return NotFound();
            return Ok(comment);
        }


        [HttpPost("{symbol}")]
        [Authorize]
        public async Task<IActionResult> CreateCommentAsync([FromRoute] string symbol, [FromBody] CreateCommentRequestDto newComment)
        {
            try
            {
                if (newComment == null)
                    return BadRequest("Comment body is required");

                var stock = await _stockRepository.GetStockBySymbolAsync(symbol);

                stock ??= await _fmpService.FindStockBySymbolAsync(symbol);

                if (stock.Id == 0)
                {
                    stock = await _stockRepository.CreateStockAsync(stock);

                   if (stock.Id == 0)
                      return StatusCode(500, "Stock creation failed");
                }

                var comment = await _commentRepository.CreateCommentAsync(
                    newComment,
                    stock.Id,
                    User.GetUserId()
                );

                return CreatedAtRoute(
                    "GetCommentById",
                    new { id = comment.Id },
                    comment
                );
            }
            catch (ArgumentException ex)
            {
                // invalid symbol, bad input
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                // stock not found in external API
                return NotFound(ex.Message);
            }
            catch (HttpRequestException ex)
            {
                // external API/network failure
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
            catch (Exception ex)
            {
                // fallback – will be removed when global handler is added
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateCommentAsync([FromRoute] int id, [FromBody] UpdateCommentRequestDto UpdatedComment)
        {

            var comment = await _commentRepository.UpdateCommentAsync(id, UpdatedComment);
            if (!comment)
                return NotFound();

            return Ok();
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteCommentAsync([FromRoute] int id)
        {

            var comment = await _commentRepository.DeleteCommentAsync(id);
            if (!comment)
                return NotFound();

            return Ok();
        }
    }
}