using System.Security.Claims;

namespace Api.Extensions
{
    public static class ClaimPrincipalExtension
    {
        public static string GetUserId(this ClaimsPrincipal user) =>
         user.FindFirstValue(ClaimTypes.NameIdentifier)
          ?? throw new UnauthorizedAccessException();
    }
}