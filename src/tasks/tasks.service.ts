import { Task } from './task.entity';
import { TasksModule } from './tasks.module';
import { TasksRepository } from './tasks.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { getTaskFilterDto } from './dtos/get-tasks-filter.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository:TasksRepository,
        ){

    }

    getTasks(filterDto:getTaskFilterDto,user:User):Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto,user);
    }


    async getTaskById(id: string,user:User): Promise<Task>{

        const found = await this.tasksRepository.findOne({where:{id,user}});
        if(!found){
             throw new NotFoundException(`Task with Id ${id} not found`);
        }

        return found;
    }



     createTask(CreateTaskDto:CreateTaskDto,user:User):Promise<Task>{
        return this.tasksRepository.createTask(CreateTaskDto,user)
    }

    async deleteTask(id:string,user:User):Promise<void>{
        
        const result = await this.tasksRepository.delete({id,user})
        if(result.affected===0){
            throw new NotFoundException(`Task with Id ${id} not found`);
        }
    
    }

    async updateTaskStatus(id:string,status:TaskStatus,user:User):Promise<Task>{

        const task = await this.getTaskById(id,user);
        task.status = status;
        await this.tasksRepository.save(task)
        return task;


    }
}
