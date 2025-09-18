import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import MyCart from "./pages/MyCart";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import RestaurantDetail from "./pages/RestaurantDetail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HowToOrder from "./pages/HowToOrder";
import PaymentMethods from "./pages/PaymentMethods";
import TrackOrder from "./pages/TrackOrder";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import AddRestaurant from "./pages/AddRestaurant";
import AddMenu from "./pages/AddMenu";
import { Provider } from "react-redux";
import { store } from "@/store";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resto/:id" element={<RestaurantDetail />} />
            <Route path="/category" element={<Category />} />
            <Route path="/cart" element={<MyCart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/how-to-order" element={<HowToOrder />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/add-menu" element={<AddMenu />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

createRoot(document.getElementById("root")!).render(<App />);
