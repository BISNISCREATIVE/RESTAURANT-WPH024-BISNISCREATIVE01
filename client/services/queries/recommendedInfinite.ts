import { useEffect, useState, useRef, useCallback } from "react";
import axios from "@/services/api/axios";
import type { MenuItem } from "@/types";

export function useRecommendedInfinite(pageSize = 12, q?: string) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(
    async (p: number, query?: string) => {
      setLoading(true);
      try {
        const params: any = { page: p, limit: pageSize };
        if (query) params.q = query;
        const res = await axios.get("/resto", { params });
        const payload = res.data?.data ?? res.data ?? {};
        const list = payload?.restaurants ?? [];
        const mapped: MenuItem[] = (list || []).map((resto: any) => ({
          id: `resto-${resto.id}`,
          name: resto.name ?? "Restaurant",
          price: Number(resto?.priceRange?.min ?? 0) || 0,
          image:
            Array.isArray(resto.images) && resto.images.length
              ? resto.images[0]
              : (resto.logo ?? "/placeholder.svg"),
          category: null,
          restaurantId: Number(resto.id) || 0,
          restaurantName: resto.name ?? null,
        }));

        setItems((prev) => (p === 1 ? mapped : [...prev, ...mapped]));
        const pagination = payload?.pagination;
        if (pagination) {
          setHasMore(p < pagination.totalPages);
        } else {
          setHasMore((mapped.length ?? 0) === pageSize);
        }
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    // load first page or when query changes
    fetchPage(1, q);
    setPage(1);
  }, [fetchPage, q]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    await fetchPage(next, q);
  };

  const reset = () => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, q);
  };

  return { items, loading, hasMore, loadMore, reset };
}
