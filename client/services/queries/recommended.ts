import { useQuery } from "@tanstack/react-query";
import axios from "@/services/api/axios";
import type { MenuItem } from "@/types";

function normalizeMenu(
  raw: any,
  restaurantId?: number,
  restaurantName?: string,
  fallbackImage?: string,
): MenuItem {
  const id = raw?.id ?? raw?._id ?? raw?.menuId ?? raw?.foodId ?? "";
  const name = raw?.foodName ?? raw?.name ?? raw?.title ?? "Untitled";
  const price = Number(raw?.price ?? raw?.cost ?? 0) || 0;
  const image =
    raw?.image ??
    raw?.imageUrl ??
    raw?.photo ??
    fallbackImage ??
    "/placeholder.svg";
  return {
    id: String(id),
    name: String(name),
    price,
    image,
    category: raw?.type ?? raw?.category ?? null,
    restaurantId: Number(restaurantId ?? 0) || 0,
    restaurantName: restaurantName ?? null,
  } as MenuItem;
}

export function useRecommendedQuery() {
  return useQuery({
    queryKey: ["recommended"],
    queryFn: async (): Promise<MenuItem[]> => {
      // Primary: try the /resto/recommended endpoint provided by the foody API
      try {
        const res = await axios.get("/resto/recommended");
        const payload = res.data?.data ?? res.data;
        const recs =
          payload?.recommendations ?? payload?.recommendation ?? null;
        if (Array.isArray(recs) && recs.length) {
          const items: MenuItem[] = [];
          for (const r of recs) {
            const restoId = r?.id ?? r?.restaurantId ?? 0;
            const restoName = r?.name ?? r?.restaurantName ?? null;
            const restoImages =
              Array.isArray(r?.images) && r.images.length ? r.images : null;
            const fallback = restoImages
              ? restoImages[0]
              : (r?.logo ?? "/placeholder.svg");
            const sample =
              r?.sampleMenus ?? r?.sampleMenu ?? r?.menus ?? r?.sample ?? [];
            if (Array.isArray(sample) && sample.length) {
              for (const m of sample)
                items.push(normalizeMenu(m, restoId, restoName, fallback));
            } else {
              // if no sample menus, create a pseudo-item from restaurant itself
              items.push({
                id: `resto-${restoId}`,
                name: r?.name ?? "Restaurant",
                price: Number(r?.priceRange?.min ?? 0) || 0,
                image: fallback,
                category: null,
                restaurantId: Number(restoId) || 0,
                restaurantName: restoName ?? null,
              } as MenuItem);
            }
          }
          if (items.length) return items;
        }
      } catch (err) {
        // ignore and fallback
      }

      // Fallback: request list of restaurants and map to pseudo-menu items using images/priceRange
      try {
        const r = await axios.get("/resto", { params: { page: 1, limit: 12 } });
        const payload = r.data?.data ?? r.data ?? {};
        const list = payload?.restaurants ?? payload ?? [];
        if (Array.isArray(list) && list.length) {
          const items: MenuItem[] = list.slice(0, 12).map((resto: any) => ({
            id: `resto-${resto.id}`,
            name: resto.name ?? "Restaurant",
            price: Number(resto?.priceRange?.min ?? resto?.price ?? 0) || 0,
            image:
              Array.isArray(resto.images) && resto.images.length
                ? resto.images[0]
                : (resto.logo ?? "/placeholder.svg"),
            category: null,
            restaurantId: Number(resto.id) || 0,
            restaurantName: resto.name ?? null,
          }));
          return items;
        }
      } catch (err) {
        // ignore
      }

      return [];
    },
    staleTime: 30_000,
  });
}
