import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function TrackOrder() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function doTrack(e?: React.FormEvent) {
    e?.preventDefault();
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/track/${id}`);
      const json = await res.json();
      setResult(json.data ?? null);
    } catch (err) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">Track Order</h1>
          <form onSubmit={doTrack} className="flex gap-2 mb-6">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Order ID"
              className="flex-1 p-2 border rounded"
            />
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Track"}
            </button>
          </form>

          {result ? (
            <div>
              <h3 className="font-semibold mb-2">Order #{result.order?.id}</h3>
              <div className="mb-4">Status timeline:</div>
              <ul className="space-y-2">
                {result.timeline.map((t: any) => (
                  <li key={t.status} className="p-3 border rounded">
                    {t.status} — {new Date(t.time).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-muted-foreground">
              Enter your order id to track it.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
