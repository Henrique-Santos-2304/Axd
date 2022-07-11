import { NestFactory } from '@nestjs/core';
import { AppModule } from '../data/use_cases/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3030);
}
bootstrap();
