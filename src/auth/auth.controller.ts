import { AuthService } from './auth.service';
import { Controller, Post,Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
 
    constructor(private authService:AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.singUp(authCredentialsDto);
    }


}
