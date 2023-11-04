import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { getTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dtos/update-task-status.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:getTaskFilterDto): Promise<Task[]> {

    return this.tasksService.getTasks(filterDto)

  }

  
  @Get("/:id")
  getTaskById(@Param('id') id:string):Promise<Task>{
    return this.tasksService.getTaskById(id);  
  }



  @Post()
  createTask(@Body() CreateTaskDto:CreateTaskDto,@GetUser() user:User):Promise<Task> {
    return this.tasksService.createTask(CreateTaskDto); 
  }

  // @Delete("/:id")
  // deleteTask(@Param('id') id:string):void{
  //   return this.tasksService.deleteTask(id);
  // }

  @Patch("/:id/status")
  updateTaskStatus(@Param('id') id:string,@Body() updateTaskStatusDto:updateTaskStatusDto):Promise<Task>{

    const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id,status )

  }
}
