'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Home,
  Sparkles,
  Zap,
  Truck,
  Heart,
  Calendar,
  Users,
  Package,
  MapPin,
  MessageCircle,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { WHY_CHOOSE_US, BUSINESS_STATS, getWhatsAppLink } from '@/lib/constants';

const ICON_MAP = {
  Home: Home,
  Sparkles: Sparkles,
  Zap: Zap,
  Truck: Truck,
  Heart: Heart,
  Calendar: Calendar,
  Users: Users,
  Package: Package,
  MapPin: MapPin,
} as const;

function StatCounter({ value, label, icon }: { value: string; label: string; icon: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericVal = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(String(numericVal), '');
  const IconComponent = ICON_MAP[icon as keyof typeof ICON_MAP] || Users;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = numericVal;
    if (start === end) return;

    const totalMiliseconds = 1500;
    const stepTime = 30;
    const numSteps = totalMiliseconds / stepTime;
    const increment = Math.ceil(end / numSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericVal]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border/50 shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mb-4">
        <IconComponent className="h-6 w-6" />
      </div>
      <span className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-xs md:text-sm font-semibold text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function WhyChooseUsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-saffron/10 via-deep-red/5 to-saffron/5 overflow-hidden">
        <div className="pattern-overlay absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
          <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron mb-3">
            Pure & Fresh
          </Badge>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Why Choose <span className="gradient-text">Our Taste</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover the values, standards, and traditional methods that make Priti&apos;s Gruh Udyog namkeens the absolute best choice for your family.
          </p>
        </div>
      </section>

      {/* Feature Cards (Alternating Layouts) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="space-y-16 md:space-y-24">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP] || Heart;
              const isEven = idx % 2 === 0;
              return (
                <AnimatedSection
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Decorative Icon Side */}
                  <div className="w-full md:w-2/5 flex justify-center">
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl gradient-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron transform rotate-3 hover:rotate-6 transition-transform shadow-sm relative group">
                      <div className="absolute inset-0 gradient-saffron rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <IconComponent className="h-16 w-16 md:h-20 md:w-20 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Text Description Side */}
                  <div className="w-full md:w-3/5 text-center md:text-left space-y-4">
                    <span className="text-saffron font-bold text-xs uppercase tracking-widest bg-saffron/10 px-3 py-1 rounded-full">
                      Benefit {idx + 1}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-saffron-50/50 dark:bg-dark-900/10">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Our Growth in Numbers"
            subtitle="Years of passion, happy families, and Mumbai-wide delivery."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {BUSINESS_STATS.map((stat, idx) => (
              <StatCounter
                key={idx}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron/5 via-deep-red/5 to-saffron/5 opacity-50" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl relative z-10">
          <AnimatedSection className="space-y-6">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold text-foreground">
              Craving Something Savory?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Order fresh traditional namkeen today. Made with absolute hygiene and premium ingredients. Delivered directly to your home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto gradient-saffron text-white border-0 gap-2 rounded-full px-8 shadow-md">
                  <MessageCircle className="h-5 w-5" />
                  Order on WhatsApp
                </Button>
              </a>
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-saffron/50 text-saffron hover:bg-saffron/5 gap-2 rounded-full px-8">
                  <ShoppingBag className="h-5 w-5" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
