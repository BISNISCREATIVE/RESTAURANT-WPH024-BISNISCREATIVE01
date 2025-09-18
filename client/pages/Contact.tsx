import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const payload: any = {};
    fd.forEach((v, k) => (payload[k] = v));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setMsg(json.message || "Thanks");
      toast({
        title: "Message sent",
        description: json.message || "Thanks for contacting us",
      });
    } catch (err) {
      setMsg("Failed to send");
      toast({ title: "Failed", description: "Failed to send message" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <form onSubmit={submit} className="space-y-3">
            <input
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-2 border rounded h-32"
              required
            />
            <div>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
          {msg && <div className="mt-4 text-muted-foreground">{msg}</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
