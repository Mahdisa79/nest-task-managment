import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,){}


    async singUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}
