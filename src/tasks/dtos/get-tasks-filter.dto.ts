import {IsOptional,IsEnum,IsString} from "class-validator";
import { TaskStatus } from "../tasks.model";

export class getTaskFilterDto{

    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;  
    
    @IsOptional()
    @IsString()

    search?:string;
}