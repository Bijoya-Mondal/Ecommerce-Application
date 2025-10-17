import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/">Products</Link> |{' '}
        <Link href="/cart">Cart</Link> |{' '}
        <Link href="/checkout">Checkout</Link> |{' '}
        <Link href="/orders">My Orders</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
