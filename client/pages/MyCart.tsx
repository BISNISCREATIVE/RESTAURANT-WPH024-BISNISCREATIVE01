import { FunctionComponent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateQty, removeFromCart } from "@/features/cart/cartSlice";
import { formatCurrency } from "@/lib/format";
import { useNavigate } from "react-router-dom";

const MyCart: FunctionComponent = () => {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const grouped: Record<string, any[]> = items.reduce(
    (acc, it) => {
      const key = String(it.restaurantId || "unknown");
      acc[key] = acc[key] || [];
      acc[key].push(it);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  const totals = (list: any[]) => list.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">My Cart</h1>

          {items.length === 0 && (
            <div className="text-muted-foreground">Your cart is empty.</div>
          )}

          <div className="space-y-6">
            {Object.keys(grouped).map((rid) => (
              <div key={rid} className="bg-white rounded-2xl shadow p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                    🍔
                  </div>
                  <div className="font-semibold">
                    {grouped[rid][0]?.restaurantName || "Restaurant"}
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground"> </div>
                </div>

                {grouped[rid].map((it) => (
                  <div
                    key={String(it.id)}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={it.image || "/placeholder.svg"}
                        alt={it.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="font-extrabold">
                          {formatCurrency(it.price)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQty({
                              id: it.id,
                              qty: Math.max(1, it.qty - 1),
                            }),
                          )
                        }
                        className="w-9 h-9 rounded-full border flex items-center justify-center"
                      >
                        −
                      </button>
                      <div className="font-semibold">{it.qty}</div>
                      <button
                        onClick={() =>
                          dispatch(updateQty({ id: it.id, qty: it.qty + 1 }))
                        }
                        className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(it.id))}
                        className="text-sm text-muted-foreground ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="font-extrabold text-lg">
                      {formatCurrency(totals(grouped[rid]))}
                    </div>
                  </div>
                  <button
                    onClick={() => nav("/checkout")}
                    className="rounded-full bg-red-600 text-white px-6 py-2"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCart;
