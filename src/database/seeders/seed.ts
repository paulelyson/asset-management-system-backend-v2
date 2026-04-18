import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UsersSeeder } from './user.seeder';
import { CourseOfferingsSeeder } from './course-offerings.seeder';

async function bootstrap() {
  // Boots the full NestJS app so all providers (Mongoose, config, etc.) are available.
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  try {
    /**
     * Order matters — dependencies must be seeded before dependents.
     *
     *   Users       → must exist before CourseOfferings (instructor ref)
     *   Courses     → must exist before CourseOfferings (course ref)
     *   Locations   → must exist before CourseOfferings (schedule.location ref)
     *   CourseOfferings → last
     */
    await app.get(UsersSeeder).seed();
    await app.get(CourseOfferingsSeeder).seed();
  } catch (err) {
    console.error('Seeder failed:', err);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
