import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import type { Order } from "@/types";

export function useOrdersQuery() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async (): Promise<Order[]> => {
      const paths = [
        "/orders",
        "/api/orders",
        "/api/order/my-order",
        "/order",
        "/api/order",
      ];
      for (const p of paths) {
        try {
          const { data } = await axios.get(p);
          if (Array.isArray(data)) return data as Order[];
          if (Array.isArray((data as any)?.data))
            return (data as any).data as Order[];
        } catch (e) {}
      }
      return [];
    },
  });
}

export function useCreateOrderMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Omit<Order, "id" | "createdAt">) => {
      const paths = ["/orders", "/api/orders", "/api/order/checkout", "/order"];
      for (const p of paths) {
        try {
          const { data } = await axios.post(p, body);
          return data as Order;
        } catch (e) {}
      }
      throw new Error("No order endpoint available");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
