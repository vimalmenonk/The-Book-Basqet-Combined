using System.Security.Claims;
using BookBasqet.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookBasqet.API.Controllers;

[ApiController]
[Route("api/debug")]
public class DebugController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly bool _isDevelopment;

    public DebugController(ApplicationDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _isDevelopment = environment.IsDevelopment();
    }

    private IActionResult? EnsureDevelopment()
    {
        return _isDevelopment ? null : NotFound();
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var guardResult = EnsureDevelopment();
        if (guardResult is not null)
        {
            return guardResult;
        }

        var users = await _context.Users
            .Include(x => x.Role)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.Email,
                RoleName = x.Role != null ? x.Role.Name : "Unknown",
                x.PasswordHash
            })
            .ToListAsync();

        var response = users.Select(x => new
        {
            x.Id,
            x.Name,
            x.Email,
            Role = x.RoleName,
            PasswordHashPreview = string.IsNullOrEmpty(x.PasswordHash)
                ? string.Empty
                : x.PasswordHash.Length > 20
                    ? x.PasswordHash.Substring(0, 20) + "..."
                    : x.PasswordHash
        });

        return Ok(response);
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var guardResult = EnsureDevelopment();
        if (guardResult is not null)
        {
            return guardResult;
        }

        var claims = User.Claims.Select(c => new { c.Type, c.Value });

        return Ok(new
        {
            IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
            AuthenticationType = User.Identity?.AuthenticationType,
            Name = User.FindFirstValue(ClaimTypes.Name),
            Email = User.FindFirstValue(ClaimTypes.Email),
            Role = User.FindFirstValue(ClaimTypes.Role),
            Subject = User.FindFirstValue("sub"),
            Claims = claims
        });
    }

    [Authorize]
    [HttpGet("claims")]
    public IActionResult Claims()
    {
        var guardResult = EnsureDevelopment();
        if (guardResult is not null)
        {
            return guardResult;
        }

        return Ok(User.Claims.Select(c => new { c.Type, c.Value }));
    }

    [Authorize]
    [HttpGet("auth-test")]
    public IActionResult AuthTest()
    {
        var guardResult = EnsureDevelopment();
        if (guardResult is not null)
        {
            return guardResult;
        }

        return Ok(new { Message = "Authenticated" });
    }
}
