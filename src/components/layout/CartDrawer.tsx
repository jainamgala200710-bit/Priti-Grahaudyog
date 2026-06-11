'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
    checkoutViaWhatsApp,
    isCartOpen,
    setIsCartOpen,
    cartBounceKey,
  } = useCart();

  const [notes, setNotes] = React.useState('');

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger
        render={
          <motion.button
            id="cart-trigger-btn"
            key={cartBounceKey}
            animate={
              cartBounceKey > 0
                ? {
                    scale: [1, 1.3, 0.9, 1.15, 1],
                    rotate: [0, -8, 8, -4, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Open Cart"
          />
        }
      >
        <div className="relative">
          <ShoppingBag className="h-4 w-4" />
          {cartCount > 0 && (
            <motion.span
              key={`badge-${cartBounceKey}`}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-[10px] font-bold text-white shadow-sm"
            >
              {cartCount}
            </motion.span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[450px] p-0 flex flex-col h-full bg-background border-l border-border/50 shadow-2xl">
        <SheetHeader className="p-6 border-b border-border flex flex-row items-center justify-between">
          <SheetTitle className="font-[family-name:var(--font-heading)] text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-saffron" />
            Shopping Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-full bg-saffron-50 dark:bg-zinc-800/50 flex items-center justify-center text-saffron mb-2">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="font-bold text-lg">Your cart is empty</h4>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                  Browse our premium homemade snacks and add items to your cart.
                </p>
              </motion.div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.price || 0;
                const itemTotal = itemPrice * item.quantity;
                const displayWeight = item.selectedWeight || item.product.weight || '250g';
                return (
                  <motion.div
                    key={`${item.product.id}__${item.product.name}__${item.selectedWeight || ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex items-center gap-4 p-3 rounded-xl border border-border/40 bg-card hover:border-saffron-100/50 transition-colors group relative"
                  >
                    {/* Product Image */}
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-saffron-50 flex items-center justify-center text-xs font-bold text-saffron">
                          {item.product.name.slice(0, 2)}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {displayWeight} • {formatPrice(itemPrice)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedWeight, item.product.name)}
                          className="h-6 w-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedWeight, item.product.name)}
                          className="h-6 w-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col items-end justify-between self-stretch">
                      <span className="font-bold text-sm text-foreground">
                        {formatPrice(itemTotal)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedWeight, item.product.name)}
                        className="text-muted-foreground hover:text-deep-red transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Cart summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/40 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="font-bold text-lg text-foreground">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cart-instructions" className="text-xs font-semibold text-muted-foreground block">
                Additional Instructions (Optional)
              </label>
              <textarea
                id="cart-instructions"
                rows={2}
                placeholder="e.g. Less spicy, extra ghee, no onion, delivery timing preference, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-border bg-background focus:ring-1 focus:ring-saffron focus:border-saffron focus:outline-none resize-none"
              />
            </div>

            <Button
              onClick={() => checkoutViaWhatsApp(notes)}
              className="w-full gradient-saffron text-white border-0 gap-2 rounded-full py-5 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5" />
              Checkout via WhatsApp
            </Button>

            <p className="text-[10px] text-center text-muted-foreground">
              Your order will be summarized and sent as a single WhatsApp message to our team to finalize delivery and payment.
            </p>
            <p className="text-[10px] text-center text-amber-500 font-semibold mt-1">
              ⚠️ Note: No home delivery available. Pickup or Wefast delivery only.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
