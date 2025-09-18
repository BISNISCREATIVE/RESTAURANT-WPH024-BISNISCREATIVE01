import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecommendedQuery } from "@/services/queries/recommended";
import { useRecommendedInfinite } from "@/services/queries/recommendedInfinite";

export default function Index() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<string>("");
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    setQ(sp.get("q") || "");
    setSort(sp.get("sort") || "");
  }, [location.search]);

  const { data, isLoading } = useRecommendedQuery();
  const {
    items,
    loading: loadingMore,
    hasMore,
    loadMore,
  } = useRecommendedInfinite(12, q);

  // auto load when scrolling near bottom
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loadingMore) loadMore();
        });
      },
      { root: null, rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sentinelRef.current, hasMore, loadingMore, loadMore]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} onSearch={setQ} />

      <section className="relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fcf8594e38e724fa3abfa91ad793c6168%2F52ee757c4e724332bba8d2e5b41e33ef?format=webp&width=1600"
          alt="Hero burger"
          className="h-[420px] md:h-[560px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow">
              Explore Culinary Experiences
            </h1>
            <p className="max-w-2xl mx-auto opacity-90">
              Search and refine your choice to discover the perfect restaurant.
            </p>
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  placeholder="Search restaurants, food and drink"
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  className="w-full h-12 rounded-full pl-12 pr-4 text-black outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Categories frame under hero */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            {[
              {
                label: "All Food",
                icon: "/images/Frame 8 (All Restaurant).png",
                query: "All Food",
              },
              {
                label: "Nearby",
                icon: "/images/Frame 8 (Nearby).png",
                query: "Nearby",
              },
              {
                label: "Discount",
                icon: "/images/Frame 8 (Discount).png",
                query: "Discount",
              },
              {
                label: "Best Seller",
                icon: "/images/Frame 8 (Best Seller).png",
                query: "Best Seller",
              },
              {
                label: "Delivery",
                icon: "/images/Frame 8 (Delivery).png",
                query: "Delivery",
              },
              {
                label: "Lunch",
                icon: "/images/Frame 8 (Lunch).png",
                query: "Lunch",
              },
            ].map((c) => {
              const active =
                (q || "").toLowerCase() === (c.query || "").toLowerCase();
              return (
                <button
                  key={c.label}
                  onClick={() => nav(`/?q=${encodeURIComponent(c.query)}`)}
                  className={`rounded-2xl bg-white shadow-sm hover:shadow-md transition p-2 flex flex-col items-center gap-1 ${active ? "ring-2 ring-red-500" : ""}`}
                >
                  <img
                    src={c.icon}
                    alt={c.label}
                    className="h-20 object-contain"
                  />
                  <b className="text-gray-700 text-sm">{c.label}</b>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-extrabold">Recommended</h2>
          </div>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-muted/30 animate-pulse rounded-xl"
                />
              ))}
            </div>
          )}
          {!isLoading && (
            <>
              {/* primary recommended items from /resto/recommended */}
              {data && data.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {data.map((item) => (
                    <div
                      key={String(item.id)}
                      className="cursor-pointer"
                      onClick={() => nav(`/resto/${item.restaurantId}`)}
                    >
                      <ProductCard item={item} />
                    </div>
                  ))}
                </div>
              )}

              {/* infinite list from /resto (paginated) */}
              {items && items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <div
                      key={String(item.id)}
                      className="cursor-pointer"
                      onClick={() => nav(`/resto/${item.restaurantId}`)}
                    >
                      <ProductCard item={item} />
                    </div>
                  ))}
                </div>
              )}

              {!((data && data.length) || (items && items.length)) && (
                <div className="py-12 text-center text-muted-foreground">
                  <img
                    src="/placeholder.svg"
                    alt="No recommendations"
                    className="mx-auto h-40 w-40 object-contain mb-6"
                  />
                  <div className="text-lg font-medium mb-2">
                    No recommendations yet
                  </div>
                  <div className="max-w-xl mx-auto mb-4">
                    We couldn't find recommended items right now. Try browsing
                    restaurants instead.
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button onClick={() => nav("/")}>Browse Restaurants</Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => loadMore()}
              disabled={!hasMore}
            >
              {hasMore ? (loadingMore ? "Loading..." : "Show More") : "No more"}
            </Button>
          </div>
          <div ref={sentinelRef} />
        </div>
      </main>

      <Footer />

      <div className="fixed bottom-5 right-5">
        <CartDrawer>
          <Button>Open Cart</Button>
        </CartDrawer>
      </div>
    </div>
  );
}
