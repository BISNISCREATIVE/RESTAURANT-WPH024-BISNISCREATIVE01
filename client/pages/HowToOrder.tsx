import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowToOrder() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-4">How to Order</h1>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Browse restaurants or search for your favorite food.</li>
            <li>Add items to your cart using the Add button.</li>
            <li>Open cart and proceed to checkout.</li>
            <li>Fill in your delivery details and place the order.</li>
            <li>Track your order status in Track Order.</li>
          </ol>
        </div>
      </main>
      <Footer />
    </div>
  );
}
