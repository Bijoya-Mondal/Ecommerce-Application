'use client';
import { useEffect, useState } from 'react';
import { customerApi } from '@/utils/api';
import OrderList from '@/components/OrderList';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    if (customerId) {
        customerApi.get(`/orders?customerId=${customerId}`).then(res => setOrders(res.data));
    }
  }, [customerId]);

  return (
    <div>
      <h1>My Orders</h1>
      <label>
        Customer ID:
        <input value={customerId} onChange={e => setCustomerId(e.target.value)} />
      </label>
      <OrderList orders={orders} />
    </div>
  );
}
