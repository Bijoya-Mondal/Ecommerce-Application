type Product = { id: string; name: string; price: number };
export default function CartItem({ item, onRemove }: { item: Product; onRemove: (id: string) => void }) {
  return (
    <div>
      {item.name} (${item.price})
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}
