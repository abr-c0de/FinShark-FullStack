using Api.Data;
using Api.Dtos.Comment;
using Api.Helpers;
using Api.Interface;
using Api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class CommentRepository(ApplicationDbContext context) : ICommentRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<List<CommentDto>> GetAllCommentsAsync(CommentQueryObject query)
        {
            var commentsQuery = _context.Comments
                .AsNoTracking()
                .Include(c => c.AppUser)
                .Include(c => c.Stock)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                commentsQuery = commentsQuery
                    .Where(c => c.Stock.Symbol == query.Symbol);
            }

            commentsQuery = query.IsDecending
                ? commentsQuery.OrderByDescending(c => c.CreatedAt)
                : commentsQuery.OrderBy(c => c.CreatedAt);

            return await commentsQuery
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    StockId = c.StockId,
                    CreatedBy = c.AppUser.UserName
                })
                .ToListAsync();
        }

        public async Task<CommentDto?> GetCommentByIdAsync(int id)
        {
            return await _context.Comments
                        .AsNoTracking()
                        .Where(c => c.Id == id)
                        .Select(c => new CommentDto
                        {
                            Id = c.Id,
                            Title = c.Title,
                            Content = c.Content,
                            CreatedAt = c.CreatedAt,
                            StockId = c.StockId,
                            CreatedBy = c.AppUser.UserName
                        })
                        .FirstOrDefaultAsync();

        }

        public async Task<CommentDto> CreateCommentAsync(CreateCommentRequestDto dto, int stockId, string userId)
        {
            var comment = dto.CreateDtoToComment(userId, stockId);

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return await _context.Comments
                .AsNoTracking()
                .Where(c => c.Id == comment.Id)
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    StockId = c.StockId,
                    CreatedBy = c.AppUser.UserName
                })
                .FirstAsync();
        }

        public async Task<bool> UpdateCommentAsync(int id, UpdateCommentRequestDto updateCommentRequestDto)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
                return false;

            comment.Title = updateCommentRequestDto.Title;
            comment.Content = updateCommentRequestDto.Content;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCommentAsync(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
                return false;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
