'use client';
import { useState } from 'react';
import { productOrderApi } from '@/utils/api';
type Product = { id: string; name: string; price: number };

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState('');

  const onCheckout = async () => {
    try {
      await productOrderApi.post('/orders', { customerId, items: cart.map(p => ({ productId: p.id, qty: 1 })) });
      setCart([]);
      setMessage('Order placed!');
    } catch {
      setMessage('Error checking out.');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <label>
        Customer ID:
        <input value={customerId} onChange={e => setCustomerId(e.target.value)} />
      </label>
      <button onClick={onCheckout} disabled={!cart.length || !customerId}>Place Order</button>
      <div>{message}</div>
      <ul>
        {cart.map(item => <li key={item.id}>{item.name} (${item.price})</li>)}
      </ul>
    </div>
  );
}
