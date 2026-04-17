import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UsersSeeder } from './user.seeder';

async function bootstrap() {
  // Boots the full NestJS app so all providers (Mongoose, config, etc.) are available.
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const seeder = app.get(UsersSeeder);

  try {
    await seeder.seed();
  } finally {
    await app.close();
  }
}

bootstrap();