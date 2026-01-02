import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from './queryClient';
import { Product, Order } from '@shared/schema';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  purchase: () => Promise<void>;
  total: number;
  itemCount: number;
  products: Product[];
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const orderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const res = await apiRequest("POST", "/api/orders", orderData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      clearCart();
      toast({
        title: "Order Placed",
        description: "Your order has been sent for manual verification and stock updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error.message,
      });
    }
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    const liveProduct = products.find(p => p.id === product.id);
    const availableStock = liveProduct?.stock ?? 0;

    if (availableStock <= 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive"
      });
      return;
    }

    setCart(current => {
      const existing = current.find(item => item.product.id === product.id);
      const currentQtyInCart = existing?.quantity ?? 0;
      
      if (currentQtyInCart + quantity > availableStock) {
        toast({
          title: "Limited Stock",
          description: `Only ${availableStock} units available in total.`,
          variant: "destructive"
        });
        return current;
      }

      if (existing) {
        return current.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { product, quantity }];
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your basket.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(current => current.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    const liveProduct = products.find(p => p.id === productId);
    const availableStock = liveProduct?.stock ?? 0;

    if (quantity > availableStock) {
      toast({
        title: "Limited Stock",
        description: `Only ${availableStock} units available.`,
        variant: "destructive"
      });
      return;
    }

    setCart(current =>
      current.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const purchase = async () => {
    if (cart.length === 0) return;
    
    const orderTotal = cart.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
    
    await orderMutation.mutateAsync({
      total: orderTotal,
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    });
  };

  const total = cart.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      purchase,
      total, 
      itemCount,
      products,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
