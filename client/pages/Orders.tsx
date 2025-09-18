import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/format";
import { useState, useEffect } from "react";
import ReviewModal from "@/components/ReviewModal";

export default function Orders() {
  const [showReviewFor, setShowReviewFor] = useState<number | string | null>(
    null,
  );
  const [orders, setOrders] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem("orders") || "[]"),
  );

  // try to fetch from API when available
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { getOrders } = await import("@/services/api/orders");
        const res = await getOrders();
        if (mounted && Array.isArray(res)) setOrders(res.slice(0, 50));
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">Order History</h1>
          {orders.length === 0 && (
            <div className="text-muted-foreground">No orders yet.</div>
          )}
          <div className="grid gap-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white border rounded-xl p-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{dayjs(o.createdAt).format("DD MMM YYYY HH:mm")}</span>
                  <span>{formatCurrency(o.total)}</span>
                </div>
                <ul className="mt-2 text-sm list-disc pl-6">
                  {o.items.map((it: any) => (
                    <li key={it.id}>
                      {it.name} × {it.qty}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      // open review modal for first item's restaurant
                      const first = o.items?.[0];
                      setShowReviewFor(first?.restaurantId ?? null);
                    }}
                    className="rounded-full bg-red-600 text-white px-4 py-2"
                  >
                    Give Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {showReviewFor && (
        <ReviewModal
          restaurantId={showReviewFor}
          onClose={() => setShowReviewFor(null)}
        />
      )}
    </div>
  );
}
