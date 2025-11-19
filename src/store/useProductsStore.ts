import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";
import axios from "axios";

type State = {
  products: Product[];
  favorites: Record<string | number, boolean>;
  filter: "all" | "favorites";
  fetchProducts: () => Promise<void>;
  addProduct: (p: Product) => void;
  deleteProduct: (id: string | number) => void;
  toggleLike: (id: string | number) => void;
  setFilter: (f: "all" | "favorites") => void;
};

export const useProductsStore = create<State>()(
  persist(
    (set, get) => ({
      products: [],
      favorites: {},
      filter: "all",

      fetchProducts: async () => {
        // Если данные уже есть → не перезаписываем (не ломаем созданные карточки)
        if (get().products.length > 0) return;

        try {
          const res = await axios.get("https://fakestoreapi.com/products");
          set({ products: res.data });
        } catch (e) {
          console.error("fetchProducts error", e);
          set({ products: [] });
        }
      },

      addProduct: (p) =>
        set((state) => ({
          products: [{ ...p, id: `${Date.now()}` }, ...state.products],
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((x) => x.id !== id),
        })),

      toggleLike: (id) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [id]: !state.favorites[id],
          },
        })),

      setFilter: (f) => set({ filter: f }),
    }),

    {
      name: "products-store",
    }
  )
);
