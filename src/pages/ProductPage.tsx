import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";

const ProductPage = () => {
  const { id } = useParams();
  const products = useProductsStore((s) => s.products);

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Product not found</h2>
        <Link to="/products">← Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <Link to="/products">← Back</Link>

      <h1 style={{ marginTop: 20 }}>{product.title}</h1>

      <img
        src={product.image}
        style={{
          width: "100%",
          maxHeight: 350,
          objectFit: "contain",
          marginBottom: 20,
          borderRadius: 10,
        }}
      />

      <p>{product.description}</p>

      {product.price && (
        <p style={{ fontWeight: "bold", marginTop: 10 }}>
          Price: ${product.price}
        </p>
      )}
    </div>
  );
};

export default ProductPage;
