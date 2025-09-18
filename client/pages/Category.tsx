import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRestaurantsQuery } from "@/services/queries/resto";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Category() {
  const [q, setQ] = useState("");
  const { data: restaurants = [], isLoading } = useRestaurantsQuery({ q });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-bold mb-3">Filter</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="Search restaurants"
                />
              </div>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-extrabold">All Restaurant</h1>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading && <div>Loading...</div>}
              {(!restaurants || restaurants.length === 0) && !isLoading && (
                <div className="text-muted-foreground">
                  No restaurants found.
                </div>
              )}
              {restaurants.map((r: any) => (
                <Link
                  key={r.id}
                  to={`/resto/${r.id}`}
                  className="block bg-white rounded-xl shadow p-4 flex items-center gap-4"
                >
                  <img
                    src={r.logo || r.images?.[0] || "/placeholder.svg"}
                    alt={r.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-extrabold">{r.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.city || r.place || "-"}
                    </div>
                    <div className="text-sm text-yellow-500">
                      ★ {r.rating ?? "-"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
