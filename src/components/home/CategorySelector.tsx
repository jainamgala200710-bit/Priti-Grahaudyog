'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const CATEGORIES = [
  {
    title: 'Sweet',
    slug: 'sweet',
    image: '/images/category-sweet.png',
    description: 'Traditional Indian mithai made with pure ghee, dry fruits, and love.',
    gradient: 'from-amber-500/80 via-orange-500/60 to-rose-500/70',
    accent: 'text-amber-300',
    count: 'Ladoo • Mohanthal • Khajur Pak',
  },
  {
    title: 'Namkeen',
    slug: 'namkeen',
    image: '/images/category-namkeen.png',
    description: 'Crispy, crunchy, and irresistibly spiced traditional Gujarati namkeen.',
    gradient: 'from-saffron/80 via-deep-red/50 to-amber-600/70',
    accent: 'text-saffron-200',
    count: 'Sev • Gathiya • Chivda',
  },
  {
    title: 'Party Orders & Catering',
    slug: 'party-menu',
    image: '/images/category-homemeal.png',
    description: 'Premium bulk catering services and customizable party menus for all occasions.',
    gradient: 'from-saffron/80 via-orange-500/60 to-deep-red/70',
    accent: 'text-orange-200',
    count: 'Sabji • Pav Bhaji • Pulao & Biryani',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function CategorySelector({
  onSelectCategory,
}: {
  onSelectCategory?: (slug: string) => void;
}) {
  return (
    <section id="categories" className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-saffron-50/30 dark:from-dark-900 dark:via-dark-900 dark:to-dark-800" />
      <div className="pattern-overlay absolute inset-0 opacity-[0.03]" />

      {/* Floating Decorative Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-saffron/5 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-deep-red/5 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading Area */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-medium mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {BUSINESS.tagline}
          </motion.div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground mb-4 tracking-tight">
            Welcome to{' '}
            <span className="gradient-text">{BUSINESS.name}</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose a category to explore our handcrafted, homemade delicacies
          </p>
        </motion.div>

        {/* Category Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.slug} variants={cardVariants}>
              <Link
                href={`/category/${category.slug}`}
                id={`category-card-${category.slug}`}
                onClick={(e) => {
                  if (onSelectCategory) {
                    e.preventDefault();
                    onSelectCategory(category.slug);
                  }
                }}
                className="group block"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative h-[420px] md:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                >
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Tag */}
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${category.accent} mb-2`}>
                      {category.count}
                    </span>

                    {/* Title */}
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
                      {category.title}
                    </h2>

                    {/* Description */}
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-5 max-w-[280px]">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Explore {category.title}</span>
                      <motion.div
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center text-muted-foreground text-sm mt-12 md:mt-16"
        >
          100% Homemade • Premium Ingredients • Made with Love in {BUSINESS.city}
        </motion.p>
      </div>
    </section>
  );
}
