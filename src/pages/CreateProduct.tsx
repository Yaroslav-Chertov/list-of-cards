import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductsStore } from "../store/useProductsStore";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(2, "Минимум 2 символа"),
  description: z.string().min(10, "Минимум 10 символов"),
  image: z.string().url("Введите корректный URL"),
  price: z.number().min(1, "Цена должна быть больше 0"),
});

type FormData = z.infer<typeof schema>;

const CreateProduct = () => {
  const addProduct = useProductsStore((s) => s.addProduct);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    addProduct({
      ...data,
      id: Date.now(),
    });

    navigate("/products");
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 500,
        width: "100%",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <Link to="/products">← Back</Link>

      <h1 style={{ marginTop: 20 }}>Create Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          marginTop: 20,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%" }}>
          <input
            placeholder="Title"
            {...register("title")}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          {errors.title && (
            <p style={{ color: "red", marginTop: 5 }}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Description"
            {...register("description")}
            style={{
              width: "100%",
              padding: 10,
              height: 120,
              borderRadius: 8,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          {errors.description && (
            <p style={{ color: "red", marginTop: 5 }}>
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <input
            placeholder="Image URL"
            {...register("image")}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          {errors.image && (
            <p style={{ color: "red", marginTop: 5 }}>{errors.image.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          {errors.price && (
            <p style={{ color: "red", marginTop: 5 }}>{errors.price.message}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 16px",
            background: "#4A4AE2",
            color: "#fff",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
