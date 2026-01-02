import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from './products';
import { useToast } from '@/hooks/use-toast';

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
  total: number;
  itemCount: number;
  products: Product[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const { toast } = useToast();

    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    // Check local stock state
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
        // Also check if existing + new exceeds stock
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
    
    // Check stock
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

  const purchase = async () => {
    try {
      // Mock order data
      const orderData = {
        total: total,
        status: "pending"
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      // Update local products state from the server after purchase
      const productsRes = await fetch("/api/products");
      if (productsRes.ok) {
        const updatedProducts = await productsRes.json();
        setProducts(updatedProducts);
      } else {
        // Fallback: manually update stock if API fetch fails
        setProducts(currentProducts => {
          return currentProducts.map(p => {
            const cartItem = items.find(item => item.id === p.id);
            if (cartItem && p.stock !== undefined) {
              return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
            }
            return p;
          });
        });
      }
      
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully! Check your Discord for details.",
      });
      
      setItems([]);
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order.",
        variant: "destructive"
      });
    }
  };

  const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      purchase,
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
