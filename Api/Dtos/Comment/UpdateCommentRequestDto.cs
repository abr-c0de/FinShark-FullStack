
using System.ComponentModel.DataAnnotations;

namespace Api.Dtos.Comment
{
    public class UpdateCommentRequestDto
    {
        [Required]
        [MinLength(2,ErrorMessage = "Title must be atleast 2 characters")]
        [MaxLength(280,ErrorMessage = "Title cannot exceed 280 characters")]
        public string Title { get; set; } = string.Empty;

        [Required] 
        [MinLength(9,ErrorMessage = "Content must be 9 characters")]
        [MaxLength(390,ErrorMessage = "Content cannot exceed 390 characters")]
        public string Content { get; set; } = string.Empty;

    }
}