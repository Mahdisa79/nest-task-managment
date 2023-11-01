import { Task } from './task.entity';
import { TasksModule } from './tasks.module';
import { TasksRepository } from './tasks.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { getTaskFilterDto } from './dtos/get-tasks-filter.dto';
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository:TasksRepository,
        ){

    }

    getTasks(filterDto:getTaskFilterDto):Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto);
    }


    async getTaskById(id: string): Promise<Task>{

        const found = await this.tasksRepository.findOne(id);
        if(!found){
             throw new NotFoundException(`Task with Id ${id} not found`);
        }

        return found;
    }



     createTask(CreateTaskDto:CreateTaskDto):Promise<Task>{
        return this.tasksRepository.createTask(CreateTaskDto)
    }

    // deleteTask(id:string):void{
        
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task)=> task.id !== found.id)
    
    // }

    async updateTaskStatus(id:string,status:TaskStatus):Promise<Task>{

        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task)
        return task;


    }
}
