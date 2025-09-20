import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import type { Category } from "@/types";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const paths = [
        "/categories",
        "/api/categories",
        "/category",
        "/api/category",
      ];
      for (const p of paths) {
        try {
          const { data } = await axios.get(p);
          if (Array.isArray(data)) return data;
          if (Array.isArray((data as any)?.data)) return (data as any).data;
        } catch (e) {}
      }
      return [];
    },
    staleTime: 5 * 60_000,
  });
}
