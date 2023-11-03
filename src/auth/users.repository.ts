import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { EntityRepository,Repository } from 'typeorm';
import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';import { User } from './user.entity';

  import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User>{


    async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void> {
    
        const {username,password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = this.create({username,password:hashedPassword});
        try {
            await this.save(user);            
        } catch (error) {

            if(error.code==='23505'){ //duplicate username
            throw new ConflictException('Username already exists')
            }
            else{
            throw new InternalServerErrorException();
            }
            
        }

    
    }

}
