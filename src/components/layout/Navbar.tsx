'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { NAV_ITEMS, BUSINESS, getWhatsAppLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CartDrawer } from './CartDrawer';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <motion.header
      id="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          id="navbar-logo"
          className="flex items-center gap-2 group"
        >
          <motion.span
            className="gradient-text font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {BUSINESS.name}
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
                  isActive
                    ? 'text-saffron'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-saffron rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">


          {/* Cart Drawer */}
          {mounted && <CartDrawer />}

          {/* WhatsApp CTA (Desktop) */}
          <a
            id="navbar-whatsapp-cta"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button className="gradient-saffron text-white border-0 gap-2 rounded-full px-5 shadow-md hover:shadow-lg transition-shadow">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden xl:inline">Order on WhatsApp</span>
              <span className="xl:hidden">WhatsApp</span>
            </Button>
          </a>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  id="mobile-menu-trigger"
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-6 border-b border-border">
                  <span className="gradient-text font-[family-name:var(--font-heading)] text-xl font-bold">
                    {BUSINESS.name}
                  </span>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                              isActive
                                ? 'bg-saffron/10 text-saffron'
                                : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                            )}
                          >
                            {item.label}
                            {isActive && (
                              <span className="ml-auto h-2 w-2 rounded-full bg-saffron" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border">
                  <a
                    id="mobile-whatsapp-cta"
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gradient-saffron text-white border-0 gap-2 rounded-full shadow-md">
                      <MessageCircle className="h-4 w-4" />
                      Order on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
