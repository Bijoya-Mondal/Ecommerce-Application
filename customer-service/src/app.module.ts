import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersModule } from './customers/customers.module';
// Import other modules when created

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
    CustomersModule,
  ],
})
export class AppModule {}
