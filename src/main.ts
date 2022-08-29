import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Access-Control-Allow-Credentials',
      'X-Requested-With',
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
