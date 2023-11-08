import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor";
import { Logger } from "@nestjs/common";
import { env } from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor);
  const port = 3000;
  await app.listen(port);
  // console.log(process.env.STAGE);

  // Logger.log(process.env.TEST_VALUE);
  Logger.log(`Application listening on port : ${port}`);
}
bootstrap();
