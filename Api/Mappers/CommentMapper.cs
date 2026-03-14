using Api.Dtos.Comment;
using Api.Model;

namespace Api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto CommentToCommentDto(this Comment comment)
        {
            return new CommentDto
            {
                Id = comment.Id,
                Title = comment.Title,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                StockId = comment.StockId,
                CreatedBy = comment.AppUser.UserName
            };
        }
        public static Comment CreateDtoToComment(this CreateCommentRequestDto commentDto,string userId,int stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stockId,
                AppUserId = userId
            };
        }
    }   
}
