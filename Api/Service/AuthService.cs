
using System.ComponentModel.DataAnnotations;
using Api.Dtos.Account;
using Api.Interface;
using Api.Model;
using Microsoft.AspNetCore.Identity;

namespace Api.Service
{
    public class AuthService(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager) : IAuthService
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly ITokenService _tokenService = tokenService;
        private readonly SignInManager<AppUser> _signInManager = signInManager;
    

        public async Task<NewUserDto> Register(RegisterDto newUser)
        {
            var user = new AppUser
            {
                UserName = newUser.Username,
                Email = newUser.Email
            };

            var createResult = await _userManager.CreateAsync(user, newUser.Password);

            if (!createResult.Succeeded)
                throw new ValidationException(
                  string.Join(", ", createResult.Errors.Select(e => e.Description)));

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleResult.Succeeded)
            {
                // rollback user creation
                await _userManager.DeleteAsync(user);
                throw new InvalidOperationException(
                  string.Join(", ", roleResult.Errors.Select(e => e.Description)));
            }

            return new NewUserDto
            {
                Username = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Token = _tokenService.CreateToken(user)
            };
        }

        public async Task<NewUserDto> Login(LoginDto loginUser)
        {
            var user = await _userManager.FindByNameAsync(loginUser.Username)
             ?? throw new UnauthorizedAccessException("Invalid username or password");


            var result = await _signInManager.CheckPasswordSignInAsync(user, loginUser.Password, false);

            if (!result.Succeeded)
            throw new UnauthorizedAccessException("Invalid username or password");

            return 
                new NewUserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };
                                            
        }
    }
}