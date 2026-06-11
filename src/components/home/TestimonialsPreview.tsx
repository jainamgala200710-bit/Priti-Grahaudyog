'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getInitials } from '@/lib/utils';

// Hardcoded testimonial placeholders
const SAMPLE_TESTIMONIALS = [
  {
    name: 'Rajesh Patel',
    location: 'Ghatkopar, Mumbai',
    rating: 5,
    review: 'Priti\'s Gruh Udyog has been our go-to namkeen place in Ghatkopar. Their Spicy Sev is unmatched in flavor and crunch. It tastes exactly like traditional home cooking!',
  },
  {
    name: 'Amisha Shah',
    location: 'Mulund, Mumbai',
    rating: 5,
    review: 'Absolutely love their Bhavnagari Gathiya! It is soft, fresh, and not oily at all. The quality has remained consistent and perfect. Highly recommended!',
  },
  {
    name: 'Vikram Mehta',
    location: 'Vile Parle, Mumbai',
    rating: 5,
    review: 'Since they started in Ghatkopar, I make sure to buy packets of Ratlami Sev and Mixture from here. Truly premium taste and freshly prepared!',
  },
];

export function TestimonialsPreview() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          title="What Our Customers Say"
          subtitle="Discover why over 1,500 families trust Priti's Gruh Udyog for their daily snack time and special celebrations."
        />

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {SAMPLE_TESTIMONIALS.map((testimonial, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Card className="card-hover glass bg-card/65 dark:bg-dark-900/40 border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group">
                {/* Decorative Quote Icon */}
                <Quote className="absolute top-4 right-4 h-12 w-12 text-saffron/10 group-hover:scale-110 transition-transform" />

                <CardContent className="p-0 flex flex-col justify-between h-full z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-saffron text-saffron" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm md:text-base text-foreground/80 italic leading-relaxed mb-6 flex-1">
                    "{testimonial.review}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <Avatar className="h-10 w-10 border border-saffron/20">
                      <AvatarFallback className="gradient-saffron text-white text-sm font-bold">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-[family-name:var(--font-heading)] text-sm md:text-base font-bold text-foreground leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/testimonials">
            <Button variant="ghost" className="text-saffron hover:text-saffron-600 hover:bg-saffron/10 gap-2 rounded-full font-semibold">
              Read All Testimonials
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
