import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function AddRestaurant() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const payload: any = {};
    fd.forEach((v, k) => (payload[k] = v));
    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        toast({
          title: "Restaurant added",
          description: json.data?.name ?? "Added",
        });
        nav("/");
      } else
        toast({ title: "Failed", description: "Failed to add restaurant" });
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
          <h1 className="text-2xl font-bold mb-4">Add Restaurant</h1>
          <form onSubmit={submit} className="space-y-3">
            <input
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="place"
              placeholder="Place"
              className="w-full p-2 border rounded"
            />
            <input
              name="logo"
              placeholder="Logo URL"
              className="w-full p-2 border rounded"
            />
            <input
              name="images"
              placeholder="Image URLs (comma)"
              className="w-full p-2 border rounded"
            />
            <div>
              <button className="px-4 py-2 bg-red-600 text-white rounded">
                {loading ? "Saving..." : "Add Restaurant"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
