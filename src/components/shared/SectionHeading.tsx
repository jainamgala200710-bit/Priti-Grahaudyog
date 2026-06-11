'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center'
      )}
    >
      <h2
        className={cn(
          'font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4',
          'heading-decorated'
        )}
      >
        {title}
      </h2>

      {/* Gradient divider */}
      <div className="section-divider mt-6 mb-4" />

      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
