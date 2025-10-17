'use client';
import { useState } from 'react';
import CartItem from '@/components/CartItem';

type Product = { id: string; name: string; price: number };

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const removeFromCart = (id: string) => setCart(cart.filter(item => item.id !== id));

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty.</p> : cart.map(item =>
        <CartItem key={item.id} item={item} onRemove={removeFromCart} />
      )}
    </div>
  );
}
