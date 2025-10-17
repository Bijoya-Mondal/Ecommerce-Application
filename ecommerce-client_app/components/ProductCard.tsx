type Product = { id: string; name: string; price: number };

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: 8, padding: 16 }}>
      <h3>{product.name}</h3>
      <div>Price: ${product.price}</div>
      <button onClick={() => onAdd(product)}>Add to Cart</button>
    </div>
  );
}
