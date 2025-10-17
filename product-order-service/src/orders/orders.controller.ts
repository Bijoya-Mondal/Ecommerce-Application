import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /// Create a new order
  @Post()
  createOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.ordersService.create(orderData);
  }

  // Get all orders
  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  // Get single order by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  // Update order
  @Put(':id')
  updateOrder(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Order>): Promise<Order> {
    return this.ordersService.update(id, data);
  }

  // Delete order
  @Delete(':id')
  removeOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.remove(id);
  }

  @Post(':orderId/items')
  addOrderItem(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() itemData: { product_id: number; quantity: number }
  ): Promise<OrderItem> {
    return this.ordersService.addOrderItem(orderId, itemData);
  }

  @Put('items/:itemId')
  updateOrderItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() data: { quantity: number }
  ): Promise<OrderItem> {
    return this.ordersService.updateOrderItem(itemId, data.quantity);
  }

  @Delete('items/:itemId')
  removeOrderItem(
    @Param('itemId', ParseIntPipe) itemId: number
  ): Promise<void> {
    return this.ordersService.removeOrderItem(itemId);
  }
}
