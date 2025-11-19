import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import ProductPage from "./pages/ProductPage";
import CreateProduct from "./pages/CreateProduct";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />

        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductPage />} />

        <Route path="/create-product" element={<CreateProduct />} />

        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
