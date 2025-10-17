'use client';
import { useEffect, useState } from 'react';
import { productOrderApi } from '@/utils/api';
import ProductCard from './ProductCard';

type Product = { id: string; name: string; price: number };

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    productOrderApi.get('/products').then(res => setProducts(res.data));
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      {products.map(product =>
        <ProductCard key={product.id} product={product} onAdd={addToCart} />
      )}
    </div>
  );
}
