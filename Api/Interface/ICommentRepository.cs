using Api.Dtos.Comment;
using Api.Helpers;

namespace Api.Interface
{
    public interface ICommentRepository
    {
        Task<List<CommentDto>> GetAllCommentsAsync(CommentQueryObject query);
        Task<CommentDto?> GetCommentByIdAsync(int id);
        Task<CommentDto> CreateCommentAsync(CreateCommentRequestDto dto, int stockId, string userId);
        Task<bool> UpdateCommentAsync(int id, UpdateCommentRequestDto updateCommentRequestDto);
        Task<bool> DeleteCommentAsync(int id);
    }
}