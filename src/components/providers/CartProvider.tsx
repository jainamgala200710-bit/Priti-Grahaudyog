'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { openBothWhatsApp } from '@/lib/constants';
import { toast } from 'sonner';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string; // e.g. "250g", "500g", "1000g"
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedWeight?: string) => void;
  removeFromCart: (productId: string, selectedWeight?: string, productName?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedWeight?: string, productName?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  checkoutViaWhatsApp: (notes?: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartBounceKey: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to create a unique key for a cart item (product + weight combo)
function cartItemKey(productId: string, selectedWeight?: string): string {
  return selectedWeight ? `${productId}__${selectedWeight}` : productId;
}

export function getProductPrice(product: Product, selectedWeight?: string): number {
  return product.price || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartBounceKey, setCartBounceKey] = useState(0);

  const triggerBounce = useCallback(() => {
    setCartBounceKey((prev) => prev + 1);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('priti_graha_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('priti_graha_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity = 1, selectedWeight?: string) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.product.name === product.name &&
        (item.selectedWeight || '') === (selectedWeight || '')
    );
    let newCart = [...cart];
    const isUpdate = existingIndex > -1;

    if (isUpdate) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity, selectedWeight });
    }

    saveCart(newCart);
    triggerBounce();

    const weightLabel = selectedWeight ? ` (${selectedWeight})` : '';
    const newQty = isUpdate ? newCart[existingIndex].quantity : quantity;

    toast.custom(
      (t) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(24, 24, 27, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5), 0 2px 8px -2px rgba(0,0,0,0.2)',
            minWidth: '320px',
            maxWidth: '380px',
            fontFamily: 'inherit',
            position: 'relative',
            animation: 'slideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Avatar Area with overlap badge */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#27272a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid rgba(255,255,255,0.1)',
              }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ShoppingBag style={{ width: '20px', height: '20px', color: '#f59e0b' }} />
              )}
            </div>
            
            {/* Small green cart/check badge overlay at bottom right of avatar */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#16a34a',
                border: '1.5px solid #18181b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 style={{ width: '10px', height: '10px', color: '#fff' }} />
            </div>
          </div>

          {/* Text Content */}
          <div style={{ flex: 1, minWidth: 0, paddingRight: '20px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#a1a1aa',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              Priti's Gruh Udyog
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 750,
                color: '#fff',
                lineHeight: 1.2,
              }}
            >
              {isUpdate ? 'Quantity Updated' : 'Your order is added to cart'}
            </div>
            <div style={{ fontSize: '11px', color: '#d4d4d8', marginTop: '3px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {product.name}{weightLabel} • Qty {newQty}
            </div>
          </div>

          {/* "now" timestamp in top right */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              fontSize: '10px',
              color: '#71717a',
            }}
          >
            now
          </div>

          {/* View Button */}
          <button
            onClick={() => {
              toast.dismiss(t);
              setIsCartOpen(true);
            }}
            style={{
              flexShrink: 0,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap' as const,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginLeft: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
          >
            <ShoppingBag style={{ width: '11px', height: '11px' }} />
            View
          </button>
        </div>
      ),
      {
        duration: 2500,
        position: 'top-right',
        style: { background: 'transparent', boxShadow: 'none', padding: 0 },
      }
    );
  };

  const removeFromCart = (productId: string, selectedWeight?: string, productName?: string) => {
    const item = cart.find(
      (item) =>
        item.product.id === productId &&
        (!productName || item.product.name === productName) &&
        (item.selectedWeight || '') === (selectedWeight || '')
    );
    const newCart = cart.filter(
      (item) =>
        !(
          item.product.id === productId &&
          (!productName || item.product.name === productName) &&
          (item.selectedWeight || '') === (selectedWeight || '')
        )
    );
    saveCart(newCart);
    if (item) {
      toast.info(`${item.product.name} removed from cart`);
    }
  };

  const updateQuantity = (productId: string, quantity: number, selectedWeight?: string, productName?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedWeight, productName);
      return;
    }

    const newCart = cart.map((item) => {
      if (
        item.product.id === productId &&
        (!productName || item.product.name === productName) &&
        (item.selectedWeight || '') === (selectedWeight || '')
      ) {
        return { ...item, quantity };
      }
      return item;
    });

    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    const price = item.product.price || 0;
    return total + price * item.quantity;
  }, 0);

  const checkoutViaWhatsApp = (notes?: string) => {
    if (cart.length === 0) return;

    let message = `*New Order from Priti's Gruh Udyog*\n\n`;
    message += `I would like to place an order for the following items:\n\n`;

    cart.forEach((item, index) => {
      const price = item.product.price || 0;
      const subtotal = price * item.quantity;
      const weightStr = item.selectedWeight ? ` (${item.selectedWeight})` : item.product.weight ? ` (${item.product.weight})` : '';
      message += `${index + 1}. *${item.product.name}*${weightStr}\n`;
      message += `   Qty: ${item.quantity} x ₹${price} = *₹${subtotal}*\n\n`;
    });

    message += `*Grand Total: ₹${cartTotal}*\n\n`;
    if (notes && notes.trim()) {
      message += `*Additional Instructions:*\n${notes.trim()}\n\n`;
    }
    message += `Please confirm availability and delivery terms. Thank you!`;

    openBothWhatsApp(message);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        checkoutViaWhatsApp,
        isCartOpen,
        setIsCartOpen,
        cartBounceKey,
      }}
    >
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
