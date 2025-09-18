import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-28">
          <div className="flex flex-col items-center">
            <img src="/placeholder.svg" alt="logo" className="w-12 h-12 mb-4" />
            <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm text-center">
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-2">
                  ✓
                </div>
                <div className="text-xl font-extrabold">Payment Success</div>
                <div className="text-sm text-muted-foreground">
                  Your payment has been successfully processed.
                </div>
              </div>

              <div className="mt-4 text-left text-sm">
                <div className="flex justify-between py-1">
                  <span>Date</span>
                  <span className="font-semibold">
                    {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Payment Method</span>
                  <span className="font-semibold">Bank Rakyat Indonesia</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Price (2 items)</span>
                  <span className="font-semibold">Rp100.000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">Rp10.000</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Service Fee</span>
                  <span className="font-semibold">Rp1.000</span>
                </div>
                <div className="border-t my-3" />
                <div className="flex justify-between py-1 text-lg font-extrabold">
                  <span>Total</span>
                  <span>Rp111.000</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/orders"
                  className="inline-block w-full bg-red-600 text-white py-3 rounded-full"
                >
                  See My Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
