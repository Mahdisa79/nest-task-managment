import { CreateTaskDto } from './dtos/create-task.dto';
import { title } from 'process';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { getTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dtos/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:getTaskFilterDto): Task[] {

    if(Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto);
    }else{
      return this.tasksService.getAllTasks();
    }

  }

  @Get("/:id")
  getTaskById(@Param('id') id:string):Task{

    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto:CreateTaskDto):Task {
    return this.tasksService.createTask(CreateTaskDto); 
  }

  @Delete("/:id")
  deleteTask(@Param('id') id:string):void{
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param('id') id:string,@Body() updateTaskStatusDto:updateTaskStatusDto):Task{

    const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id,status )

  }
}
