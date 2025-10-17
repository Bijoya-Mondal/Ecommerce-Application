import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Injectable()
export class CustomersService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'product_order_queue',
      queueOptions: { durable: false },
    },
  })
  private client: ClientProxy;

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(data: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(data);
    const saved = await this.customerRepository.save(customer);
    this.client.emit('customer_created', saved);
    return saved;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    await this.customerRepository.update(id, data);
    const updated = await this.findOne(id);
    this.client.emit('customer_updated', updated);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Customer not found');
  }
}
