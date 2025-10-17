import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomerEventsController } from './events/customer-events.controller';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.10.107',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer]),
    ProductsModule,
    OrdersModule
  ],
  controllers: [AppController, CustomerEventsController],
  providers: [AppService],
})
export class AppModule {}
