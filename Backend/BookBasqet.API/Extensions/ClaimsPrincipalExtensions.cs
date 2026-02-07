using System.Security.Claims;

namespace BookBasqet.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal principal)
    {
        var sub = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                  ?? principal.FindFirstValue("sub")
                  ?? throw new UnauthorizedAccessException("Invalid token.");
        return int.Parse(sub);
    }
}
