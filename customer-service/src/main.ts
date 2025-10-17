import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],   // Adjust your RabbitMQ server URL
      queue: 'customer_queue',
      queueOptions: {
        durable: false,
      },
    },
  }); 
  await app.listen();
  console.log(`Customer microservice is listening for RabbitMQ messages...`);
}
bootstrap();

