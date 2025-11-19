import { useEffect } from "react";
import { useProductsStore } from "../store/useProductsStore";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { products, fetchProducts, filter, setFilter, favorites } =
    useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "favorites" ? products.filter((p) => favorites[p.id]) : products;

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>Products</h1>

      <div style={{ marginBottom: 20 }}>
        <Link to="/create-product">+ Create product</Link>
      </div>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("favorites")}
          style={{ fontWeight: filter === "favorites" ? "bold" : "normal" }}
        >
          Favorites
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
