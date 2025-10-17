type Order = { id: string; createdAt: string; total: number };
export default function OrderList({ orders }: { orders: Order[] }) {
  if (!orders.length) return <p>No orders found.</p>;
  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          Order #{order.id} - {new Date(order.createdAt).toLocaleString()} - Total: ${order.total}
        </li>
      ))}
    </ul>
  );
}
