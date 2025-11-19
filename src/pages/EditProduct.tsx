import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  image: z.string().url(),
  price: z.number().min(1),
});

type FormData = z.infer<typeof schema>;

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductsStore();

  const product = products.find((p) => p.id.toString() === id);

  const { register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("image", product.image ?? "");
      setValue("price", product.price || 1);
    }
  }, [product, setValue]);

  const onSubmit = (data: FormData) => {
    useProductsStore.setState((state) => ({
      products: state.products.map((p) => (p.id == id ? { ...p, ...data } : p)),
    }));

    navigate("/products");
  };

  if (!product)
    return (
      <div>
        <h2>Not found</h2>
      </div>
    );

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <Link to="/products">← Back</Link>
      <h1>Edit Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <input {...register("title")} placeholder="Title" />
        <textarea {...register("description")} placeholder="Description" />
        <input {...register("image")} placeholder="Image URL" />
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
