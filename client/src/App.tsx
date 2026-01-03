import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetails from "@/pages/product-details";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Login from "@/pages/login";
import Status from "@/pages/status";
import OrderStatus from "@/pages/order-status";
import Feedback from "@/pages/feedback";
import TOS from "@/pages/tos";
import Privacy from "@/pages/privacy";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/status" component={OrderStatus} />
        <Route path="/inventory-status" component={Status} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/tos" component={TOS} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
