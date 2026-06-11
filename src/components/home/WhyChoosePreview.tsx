'use client';

import { motion, Variants } from 'framer-motion';
import { Home, Sparkles, Zap, Truck, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { WHY_CHOOSE_US } from '@/lib/constants';

// Icon mapping
const ICON_MAP = {
  Home: Home,
  Sparkles: Sparkles,
  Zap: Zap,
  Truck: Truck,
  Heart: Heart,
} as const;

export function WhyChoosePreview() {
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
    <section className="py-20 md:py-28 bg-saffron-50/50 dark:bg-dark-900/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Why Choose Us"
          subtitle="We take pride in our heritage of delivering pure, healthy and authentic Indian snacks."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP] || Heart;
            return (
              <motion.div key={idx} variants={cardVariants}>
                <Card className="card-hover glass bg-card/60 dark:bg-dark-900/60 border border-border/40 hover:border-saffron/30 rounded-2xl h-full flex flex-col items-center text-center p-6 transition-all duration-300">
                  <CardContent className="p-0 flex flex-col items-center">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-full gradient-saffron flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <h3 className="font-[family-name:var(--font-heading)] text-base md:text-lg font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
