import { Metadata } from 'next';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BUSINESS } from '@/lib/constants';
import {
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Package,
  Award,
  History,
  Scale,
  Smile,
  Timer,
  UtensilsCrossed,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about the rich heritage, values, manufacturing standards and quality commitment of ${BUSINESS.name}.`,
};

const TIMELINE_EVENTS = [
  {
    year: '2021',
    title: 'The Humble Kitchen Beginning',
    description: 'Priti Ben started making traditional Gujarati namkeen from her home kitchen in Ghatkopar, Mumbai for friends and family.',
  },
  {
    year: '2023',
    title: 'First Dedicated Kitchen',
    description: 'Due to growing demand, we transitioned to a local production unit in Ghatkopar, establishing the brand name "Priti\'s Gruh Udyog".',
  },
  {
    year: '2024',
    title: 'Mumbai-Wide Delivery',
    description: 'Expanded distribution across Mumbai, delivering fresh batches daily to retail partners and direct customers.',
  },
  {
    year: 'Present',
    title: 'Trust & Growth',
    description: 'Currently serving over 1,500 happy families with over 20 product varieties, committed to the same homemade taste.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Selection of Ingredients',
    description: 'We source premium-grade chana besan, whole spices, and quality edible oils from trusted local farmers.',
    icon: Scale,
  },
  {
    step: '02',
    title: 'Traditional Preparation',
    description: 'Snacks are prepared in small batches by experienced makers following secret recipes passed down through generations.',
    icon: UtensilsCrossed,
  },
  {
    step: '03',
    title: 'Quality & Taste Testing',
    description: 'Every batch undergoes rigorous taste and quality checks to ensure consistent crunch and perfect seasoning.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'Fresh Packaging',
    description: 'Packaged in premium food-grade material that locks in freshness, aroma, and crispiness for a long shelf-life.',
    icon: Package,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-saffron/10 via-deep-red/5 to-saffron/5 overflow-hidden">
        <div className="pattern-overlay absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
          <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron mb-3">
            Our Journey
          </Badge>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            About <span className="gradient-text">{BUSINESS.name}</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Preserving the authentic flavors of Gujarati tradition, made with homemade love and purity since generations.
          </p>
        </div>
      </section>

      {/* Legacy / Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Text */}
            <AnimatedSection className="space-y-6">
              <div className="inline-flex items-center gap-2 text-saffron font-bold uppercase tracking-wider text-sm">
                <History className="h-5 w-5" />
                Our Story
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-foreground">
                Authentic Homemade Taste That Binds Families
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Priti's Gruh Udyog began in Ghatkopar, Mumbai, as a small home kitchen initiative. Guided by a passion for authentic Gujarati flavors, our founder Priti Ben believed that namkeen isn't just a snack, but a medium that brings families together during teatime, festivals, and celebrations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started with a single pan and a few traditional spices has today grown into a trusted local name across Mumbai. Despite our growth, our heart remains in that home kitchen. We still mix our spices manually, prepare small batches to ensure quality, and strictly avoid chemical preservatives.
              </p>
              <div className="border-l-4 border-saffron pl-4 italic text-foreground font-medium my-4">
                "Our promise remains unchanged: to serve snacks that are as pure, delicious, and healthy as the ones made in your own home."
              </div>
            </AnimatedSection>

            {/* Story Highlight Card */}
            <AnimatedSection delay={0.2}>
              <Card className="glass bg-saffron-50/30 border border-saffron/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-bl-full z-0" />
                <CardContent className="p-0 z-10 relative space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-saffron text-white flex items-center justify-center shadow-md">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    Our Core Values
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Uncompromising Purity:</strong> We use 100% natural, fresh ingredients with no artificial chemical additives.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Award className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Traditional Taste:</strong> Preserving generations-old Saurashtrian recipes with authentic regional spices.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Smile className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Customer Happiness:</strong> Listening to feedback and serving every client with gratitude and love.
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-saffron-50/30 dark:bg-dark-900/10">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Our Milestones"
            subtitle="How we grew from a small home kitchen into Mumbai's beloved namkeen brand."
          />

          <div className="max-w-4xl mx-auto relative border-l border-saffron/30 ml-4 md:ml-auto">
            {TIMELINE_EVENTS.map((event, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className="mb-10 md:mb-12 relative pl-8 md:pl-0 md:w-1/2 md:even:ml-auto md:odd:mr-auto md:odd:text-right md:odd:pl-0 md:odd:pr-8">
                {/* Dot */}
                <div className="absolute left-[-6px] top-1.5 md:left-auto md:right-[-6px] md:group-even:left-[-6px] h-3 w-3 rounded-full bg-saffron border-2 border-background z-10" />
                
                {/* Timeline Year */}
                <div className="text-saffron font-bold text-lg mb-1">
                  {event.year}
                </div>
                {/* Content */}
                <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Our Manufacturing Process"
            subtitle="Purity in every step. Here is how we ensure that the snacks reaching your table are fresh, crisp, and hygienic."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PROCESS_STEPS.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 0.15}>
                  <Card className="card-hover border border-border/50 bg-card rounded-2xl h-full p-6 relative overflow-hidden group">
                    <span className="absolute top-4 right-4 text-4xl font-extrabold text-saffron/10 group-hover:text-saffron/20 group-hover:scale-110 transition-all">
                      {item.step}
                    </span>
                    <CardContent className="p-0 flex flex-col justify-between h-full pt-4">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-saffron/10 text-saffron flex items-center justify-center mb-5">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground mb-3">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hygiene Standards */}
      <section className="py-20 bg-dark-900 text-white dark:bg-dark-900/50">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <AnimatedSection className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-saffron/20 border border-saffron/30 text-saffron flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold">
              Certified Quality & Hygiene Standards
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Our kitchen adheres to the highest level of food safety standards. We hold active government food certifications (FSSAI) and our premises undergo daily sanitization, health checks for workers, and clean water filtration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Badge className="bg-saffron text-white border-0 py-1.5 px-4 text-xs font-semibold rounded-full">
                100% Vegetarian Facility
              </Badge>
              <Badge className="bg-deep-red text-white border-0 py-1.5 px-4 text-xs font-semibold rounded-full">
                FSSAI Compliant
              </Badge>
              <Badge className="bg-white/10 text-white hover:bg-white/20 border border-white/20 py-1.5 px-4 text-xs font-semibold rounded-full">
                No Artificial Preservatives
              </Badge>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
