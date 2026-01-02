import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './products';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from './queryClient';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  purchase: () => void;
  isPurchasing: boolean;
  total: number;
  itemCount: number;
  products: Product[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const purchaseMutation = useMutation({
    mutationFn: async (purchaseItems: CartItem[]) => {
      const res = await apiRequest("POST", "/api/products/purchase", {
        items: purchaseItems.map(item => ({ id: item.id, quantity: item.quantity }))
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully! Check your Discord for details.",
      });
      setItems([]);
    },
    onError: (error: Error) => {
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (currentProduct && currentProduct.stock !== undefined && currentProduct.stock < quantity) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${currentProduct.stock} units of ${product.name} available.`,
        variant: "destructive"
      });
      return;
    }

    setItems(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        if (currentProduct && currentProduct.stock !== undefined && (existing.quantity + quantity) > currentProduct.stock) {
          toast({
            title: "Limited Stock",
            description: `Cannot add more ${product.name} to cart. Stock limit reached.`,
            variant: "destructive"
          });
          return current;
        }
        return current.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(current => current.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    const product = products.find(p => p.id === productId);
    if (product && product.stock !== undefined && quantity > product.stock) {
      toast({
        title: "Limited Stock",
        description: `Only ${product.stock} units available.`,
        variant: "destructive"
      });
      return;
    }

    setItems(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const purchase = () => {
    if (items.length === 0) return;
    purchaseMutation.mutate(items);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      purchase,
      isPurchasing: purchaseMutation.isPending,
      total, 
      itemCount,
      products
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
