import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Customer } from 'src/entities/customer.entity'; // Ensure you have this entity defined
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class CustomerEventsController {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  @MessagePattern('customer_created')
  async handleCustomerCreated(@Payload() data: any) {
    // Check if customer already exists
    const existing = await this.customerRepository.findOne({ where: { id: data.id } });
    if (!existing) {
      // Create new customer in Product & Order service database
      const customer = this.customerRepository.create({
        id: data.id,
        name: data.name,
        email: data.email,
        created_at: data.created_at || new Date(),
      });
      await this.customerRepository.save(customer);
      console.log('Synchronized new customer:', customer);
    } else {
      console.log('Customer already exists:', data.id);
    }
  }

  @MessagePattern('customer_updated')
  async handleCustomerUpdated(@Payload() data: any) {
    // Update customer if exists
    const customer = await this.customerRepository.findOne({ where: { id: data.id } });
    if (customer) {
      customer.name = data.name;
      customer.email = data.email;
      customer.updated_at = data.updated_at || new Date();
      await this.customerRepository.save(customer);
      console.log('Updated existing customer:', customer);
    } else {
      console.log('Customer not found. Cannot update:', data.id);
    }
  }
}
