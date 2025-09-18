import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/faq");
        const json = await res.json();
        setFaqs(json.data || []);
      } catch (err) {}
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">FAQ</h1>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.id}>
                <div className="font-semibold">{f.q}</div>
                <div className="text-muted-foreground">{f.a}</div>
              </div>
            ))}
            {faqs.length === 0 && (
              <div className="text-muted-foreground">No FAQ available.</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
