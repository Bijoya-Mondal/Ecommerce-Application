import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // ...Order CRUD methods...

  // Create a new order
  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.ordersRepository.create(orderData);
    return this.ordersRepository.save(order);
  }

  // Retrieve all orders with their items
  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['order_items'] });
  }

  // Get one order by id with items
  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['order_items'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // Update an existing order
  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Delete an order (cascade deletes order items)
  async remove(id: number): Promise<void> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Order not found');
  }

  // Create a new order item for an order
  async addOrderItem(orderId: number, itemData: { product_id: number; quantity: number; }): Promise<OrderItem> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    const product = await this.productsRepository.findOne({ where: { id: itemData.product_id } });
    if (!product) throw new NotFoundException('Product not found');

    const unit_price = product.price;
    const line_total = unit_price * itemData.quantity;

    const orderItem = this.orderItemsRepository.create({
      order_id: order.id,
      product_id: product.id,
      quantity: itemData.quantity,
      unit_price,
      line_total,
    });

    await this.orderItemsRepository.save(orderItem);
    return orderItem;
  }

  // Update quantity of an order item
  async updateOrderItem(itemId: number, quantity: number): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findOne({ where: { id: itemId } });
    if (!orderItem) throw new NotFoundException('Order item not found');

    orderItem.quantity = quantity;
    orderItem.line_total = Number(orderItem.unit_price) * quantity;

    await this.orderItemsRepository.save(orderItem);
    return orderItem;
  }

  // Remove an order item
  async removeOrderItem(itemId: number): Promise<void> {
    const result = await this.orderItemsRepository.delete(itemId);
    if (result.affected === 0) throw new NotFoundException('Order item not found');
  }

  // Optional: Get order items for a given order
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return this.orderItemsRepository.find({ where: { order_id: orderId }, relations: ['product'] });
  }
}
