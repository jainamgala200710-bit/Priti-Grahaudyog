'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { formatPrice } from '@/lib/utils';

// Hardcoded featured products data
const FEATURED_PRODUCTS = [
  {
    name: 'Spicy Sev',
    category: 'Spicy Sev',
    price: 180,
    weight: '250g',
    emoji: '🌶️',
    gradient: 'from-orange-500/20 to-red-500/20 text-orange-600',
    image: '/images/spicy-sev.png',
  },
  {
    name: 'Bhavnagari Gathiya',
    category: 'Gathiya',
    price: 150,
    weight: '250g',
    emoji: '🥖',
    gradient: 'from-amber-400/20 to-yellow-600/20 text-amber-700',
    image: '/images/bhavnagari-gathiya.png',
  },
  {
    name: 'Ratlami Sev',
    category: 'Ratlami Sev',
    price: 170,
    weight: '250g',
    emoji: '🥨',
    gradient: 'from-orange-600/20 to-amber-700/20 text-orange-700',
    image: '/images/ratlami-sev.png',
  },
  {
    name: 'Black Salt Sev',
    category: 'Black Salt Sev',
    price: 160,
    weight: '250g',
    emoji: '🍘',
    gradient: 'from-slate-500/20 to-zinc-700/20 text-slate-700 dark:text-slate-300',
    image: '/images/black-salt-sev.png',
  },
  {
    name: 'Tikha Gathiya',
    category: 'Tikha Gathiya',
    price: 160,
    weight: '250g',
    emoji: '🌶️🥖',
    gradient: 'from-red-500/20 to-orange-500/20 text-red-600',
    image: '/images/tikha-gathiya.png',
  },
  {
    name: 'Cornflake Mixture',
    category: 'Mixture',
    price: 175,
    weight: '250g',
    emoji: '🌽🍿',
    gradient: 'from-yellow-400/20 to-orange-400/20 text-yellow-700 dark:text-yellow-500',
    image: '/images/special-mixture.png',
  },
];

export function ProductShowcase() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Signature Delicacies"
          subtitle="Explore our most loved handcrafted traditional snacks. Fresh, crunchy and packed with flavor."
        />

        {/* Product Carousel Grid (Responsive) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Card className="card-hover bg-card border border-border/50 rounded-2xl overflow-hidden h-full flex flex-col group">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="h-48 md:h-52 w-full overflow-hidden bg-muted relative group-hover:scale-[1.02] transition-transform duration-300">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={idx < 3}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center text-6xl select-none`}>
                        <span className="transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                          {product.emoji}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Homemade Speciality Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <Badge className="bg-green-600/90 text-white border-none text-[10px] uppercase font-bold tracking-wider">
                        Homemade
                      </Badge>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron font-medium">
                          {product.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {product.weight}
                        </Badge>
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-saffron transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                        Handcrafted following generations-old recipes using the highest quality standards.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-auto">
                      <span className="font-semibold text-lg text-foreground">
                        {formatPrice(product.price)}
                      </span>
                      <Link href="/products">
                        <Button size="sm" variant="ghost" className="text-saffron hover:text-saffron-600 hover:bg-saffron/10 gap-1 rounded-full text-xs font-semibold">
                          View Details
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/products">
            <Button size="lg" className="gradient-saffron text-white border-0 gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200">
              <ShoppingBag className="h-5 w-5" />
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
