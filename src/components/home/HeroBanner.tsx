'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { MessageCircle, ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUSINESS, getWhatsAppLink } from '@/lib/constants';

export function HeroBanner() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden py-24">
      {/* Indian Motif Pattern Overlay */}
      <div className="pattern-overlay absolute inset-0 opacity-15" />

      {/* Decorative Floating Circles */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-saffron/10 to-transparent blur-2xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gradient-to-bl from-deep-red/10 to-transparent blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          {/* Subheading / Tagline accent */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-saffron/30 bg-saffron/5 text-saffron text-sm font-semibold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron animate-pulse" />
            Traditional Taste
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] text-balance"
          >
            Authentic Homemade <span className="gradient-text">Namkeen</span> Since Generations
          </motion.h1>

          {/* Tagline / Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl text-balance"
          >
            {BUSINESS.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
          >
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gradient-saffron text-white border-0 gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 duration-200">
                <ShoppingBag className="h-5 w-5" />
                View Products
              </Button>
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-saffron/50 text-saffron hover:bg-saffron/5 gap-2 rounded-full px-8 hover:border-saffron hover:scale-105 active:scale-95 transition-all duration-200">
                <MessageCircle className="h-5 w-5" />
                Order on WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground cursor-pointer z-10">
        <span className="text-xs tracking-widest uppercase font-semibold">Scroll Down</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-saffron" />
      </div>
    </section>
  );
}
