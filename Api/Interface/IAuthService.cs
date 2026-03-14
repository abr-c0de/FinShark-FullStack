
using Api.Dtos.Account;

namespace Api.Interface
{
    public interface IAuthService
    {
        Task<NewUserDto> Register(RegisterDto newUser);
        Task<NewUserDto> Login(LoginDto user);
        
    }
}