import type { MenuItem } from "@/types";
import type { MenuParams } from "./menus";

export function applyMenuFilters(items: MenuItem[], params?: MenuParams) {
  let out = [...items];
  if (!params) return out;
  const { q, category, sort } = params;
  if (q && q.trim()) {
    const s = q.trim().toLowerCase();
    out = out.filter((m) => m.name.toLowerCase().includes(s));
  }
  if (category) {
    out = out.filter((m) => m.categoryId === category);
  }
  switch (sort) {
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default:
      break;
  }
  return out;
}
