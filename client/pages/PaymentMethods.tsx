import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function PaymentMethods() {
  const [methods, setMethods] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/payment-methods");
        const json = await res.json();
        setMethods(json.data || []);
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
          <div className="grid gap-3">
            {methods.map((m) => (
              <div key={m.id} className="p-4 border rounded-lg">
                {m.name}
              </div>
            ))}
            {methods.length === 0 && (
              <div className="text-muted-foreground">
                No payment methods available.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
