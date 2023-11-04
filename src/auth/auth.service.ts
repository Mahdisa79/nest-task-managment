import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import {UnauthorizedException} from '@nestjs/common';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository:UsersRepository,
        private jwtService:JwtService,
        ){}


    async singUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{

        const {username,password} = authCredentialsDto;
        const user = await this.userRepository.findOne({username});
        
        if(user && (await bcrypt.compare(password,user.password))){
            const payload:JwtPayload = {username};
            const accessToken:string = await this.jwtService.sign(payload);
            return {accessToken};

        }else{
            throw new UnauthorizedException('please chech your login credentials');
        }

    }

}
