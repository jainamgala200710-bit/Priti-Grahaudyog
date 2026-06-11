'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { getInitials } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/constants';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Rajesh Patel',
    location: 'Ghatkopar, Mumbai',
    rating: 5,
    review: 'Priti\'s Gruh Udyog has been our go-to namkeen place in Ghatkopar. Their Spicy Sev is unmatched in flavor and crunch. It tastes exactly like traditional home cooking!',
  },
  {
    id: '2',
    name: 'Amisha Shah',
    location: 'Mulund, Mumbai',
    rating: 5,
    review: 'Absolutely love their Bhavnagari Gathiya! It is soft, fresh, and not oily at all. The quality has remained consistent and perfect. Highly recommended!',
  },
  {
    id: '3',
    name: 'Vikram Mehta',
    location: 'Vile Parle, Mumbai',
    rating: 5,
    review: 'Since they started in Ghatkopar, I make sure to buy packets of Ratlami Sev and Mixture from here. Truly premium taste and freshly prepared!',
  },
  {
    id: '4',
    name: 'Preeti Joshi',
    location: 'Borivali, Mumbai',
    rating: 5,
    review: 'The quality of besan and spices they use is clearly superior. My kids love their Tikha Gathiya and Sweet Mixture. It feels very clean, hygienic, and home-cooked.',
  },
  {
    id: '5',
    name: 'Suresh Gadhvi',
    location: 'Chembur, Mumbai',
    rating: 5,
    review: 'Being a traditional snack lover, I am very picky about my Gathiya. Priti\'s Gruh Udyog captures the authentic traditional flavor perfectly. Best snacks ever!',
  },
  {
    id: '6',
    name: 'Deepa Trivedi',
    location: 'Thane, Mumbai',
    rating: 5,
    review: 'Exceptional hygiene standards and fresh packaging. We always order their Chana Dal and Spicy Sev for our guests during festivals. Excellent local business!',
  },
];

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const nextSlide = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slideVariants: Variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-saffron/10 via-deep-red/5 to-saffron/5 overflow-hidden">
        <div className="pattern-overlay absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
          <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron mb-3">
            Customer Love
          </Badge>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Our <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Read stories of satisfaction and pure delight from our family of happy customers across India.
          </p>
        </div>
      </section>

      {/* Featured Testimonial Slider */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative">
          <SectionHeading
            title="Voices of Gratitude"
            subtitle="Take a look at what our regular customers have to say about their snacking experiences."
          />

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence initial={false} custom={slideDirection} mode="wait">
              <motion.div
                key={activeIndex}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <Card className="glass border-saffron/20 bg-saffron-50/10 rounded-3xl p-8 md:p-12 shadow-sm text-center relative overflow-hidden">
                  <Quote className="absolute top-6 left-6 h-16 w-16 text-saffron/5 z-0" />
                  <Quote className="absolute bottom-6 right-6 h-16 w-16 text-saffron/5 z-0 transform rotate-180" />

                  <CardContent className="p-0 flex flex-col items-center relative z-10">
                    <div className="flex gap-1.5 mb-6">
                      {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-saffron text-saffron" />
                      ))}
                    </div>

                    <p className="text-lg md:text-2xl text-foreground italic leading-relaxed mb-8 max-w-2xl font-medium">
                      "{TESTIMONIALS[activeIndex].review}"
                    </p>

                    <Avatar className="h-16 w-16 border-2 border-saffron/30 shadow-md mb-3">
                      <AvatarFallback className="gradient-saffron text-white text-lg font-bold">
                        {getInitials(TESTIMONIALS[activeIndex].name)}
                      </AvatarFallback>
                    </Avatar>

                    <h4 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold text-foreground">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground uppercase font-semibold tracking-wider mt-1">
                      {TESTIMONIALS[activeIndex].location}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-20px] md:left-[-50px] z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-saffron/30 text-saffron hover:bg-saffron/10 bg-background shadow-md"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] md:right-[-50px] z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-saffron/30 text-saffron hover:bg-saffron/10 bg-background shadow-md"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8 z-10 relative">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSlideDirection(idx > activeIndex ? 'right' : 'left');
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-6 bg-saffron' : 'w-2 bg-saffron-200 dark:bg-zinc-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid listing of all Testimonials */}
      <section className="py-20 bg-saffron-50/30 dark:bg-dark-900/10">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Browse All Reviews"
            subtitle="True accounts from people who love our traditional Indian farsan."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <Card className="card-hover bg-card border border-border/50 rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-saffron text-saffron" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic mb-6">
                      "{item.review}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="gradient-saffron text-white text-xs font-bold">
                        {getInitials(item.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-foreground leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Write / WhatsApp Testimonial CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          <AnimatedSection className="space-y-6">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We would love to hear from you! If you enjoy our traditional Gujarati namkeens, please drop us a message on WhatsApp.
            </p>
            <a
              href={getWhatsAppLink("Hi! I would like to share my experience: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="gradient-saffron text-white border-0 gap-2 rounded-full px-8 shadow-md">
                <MessageCircle className="h-5 w-5" />
                Submit Feedback on WhatsApp
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
