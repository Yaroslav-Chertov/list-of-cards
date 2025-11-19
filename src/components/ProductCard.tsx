import { useProductsStore } from "../store/useProductsStore";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const toggleLike = useProductsStore((s) => s.toggleLike);
  const deleteProduct = useProductsStore((s) => s.deleteProduct);
  const favorites = useProductsStore((s) => s.favorites);

  const isLiked = favorites[product.id];

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={product.image} alt={product.title} className="card-img" />

      <h3 className="card-title">{product.title}</h3>

      <p className="card-desc">{product.description.slice(0, 80)}...</p>

      <div className="card-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className={`like-btn ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(product.id)}
        >
          ♥
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteProduct(product.id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
