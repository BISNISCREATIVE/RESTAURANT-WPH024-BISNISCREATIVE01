import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function AddMenu() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const restaurantId = fd.get("restaurantId");
    if (!restaurantId) {
      alert("restaurantId required");
      setLoading(false);
      return;
    }
    const payload: any = {
      name: fd.get("name"),
      price: Number(fd.get("price") || 0),
      type: fd.get("type"),
      image: fd.get("image"),
    };
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/menus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        toast({
          title: "Menu added",
          description: json.data?.foodName ?? json.data?.name ?? "Added",
        });
        nav(`/resto/${restaurantId}`);
      } else toast({ title: "Failed", description: "Failed to add menu" });
    } catch (err) {
      alert("Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">Add Menu Item</h1>
          <form onSubmit={submit} className="space-y-3">
            <input
              name="restaurantId"
              placeholder="Restaurant ID"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="name"
              placeholder="Dish name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="price"
              placeholder="Price"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="type"
              placeholder="Type (Main, Dessert)"
              className="w-full p-2 border rounded"
            />
            <input
              name="image"
              placeholder="Image URL"
              className="w-full p-2 border rounded"
            />
            <div>
              <button className="px-4 py-2 bg-red-600 text-white rounded">
                {loading ? "Saving..." : "Add Menu"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
