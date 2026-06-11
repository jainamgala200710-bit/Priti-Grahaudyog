'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  PhoneCall,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Loader2,
  Phone,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { BUSINESS, getWhatsAppLink } from '@/lib/constants';
import { toast, Toaster } from 'sonner';

interface ContactFormInput {
  customer_name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>();

  const onSubmit = async (data: ContactFormInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success('Enquiry Submitted!', {
        description: 'Thank you Rajesh. We will get back to you shortly.',
      });
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Submission Failed', {
        description: 'Something went wrong. Please try again or chat via WhatsApp.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-20">
      <Toaster position="top-right" richColors />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-saffron/10 via-deep-red/5 to-saffron/5 overflow-hidden">
        <div className="pattern-overlay absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
          <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron mb-3">
            Get In Touch
          </Badge>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about bulk orders, pricing, or custom packets? Feel free to contact us. We are happy to help!
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Form Column - Left (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatedSection>
                <Card className="border border-border/50 bg-card rounded-3xl p-6 md:p-8 shadow-sm">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                      Send Us an Enquiry
                    </CardTitle>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Fill out the form below and our team will get in touch within 24 hours.
                    </p>
                  </CardHeader>

                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <Label htmlFor="customer_name" className="text-sm font-semibold">
                          Your Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="customer_name"
                          placeholder="Enter your full name"
                          {...register('customer_name', { required: 'Name is required' })}
                          className={errors.customer_name ? 'border-destructive focus-visible:ring-destructive/30' : ''}
                        />
                        {errors.customer_name && (
                          <span className="text-xs text-destructive font-medium">{errors.customer_name.message}</span>
                        )}
                      </div>

                      {/* Phone & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm font-semibold">
                            Phone Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            placeholder="Enter 10-digit number"
                            type="tel"
                            {...register('phone', {
                              required: 'Phone is required',
                              pattern: {
                                value: /^[0-9+ ]{10,15}$/,
                                message: 'Invalid phone number',
                              },
                            })}
                            className={errors.phone ? 'border-destructive focus-visible:ring-destructive/30' : ''}
                          />
                          {errors.phone && (
                            <span className="text-xs text-destructive font-medium">{errors.phone.message}</span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-semibold">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                              },
                            })}
                            className={errors.email ? 'border-destructive focus-visible:ring-destructive/30' : ''}
                          />
                          {errors.email && (
                            <span className="text-xs text-destructive font-medium">{errors.email.message}</span>
                          )}
                        </div>
                      </div>

                      {/* Message field */}
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-sm font-semibold">
                          Your Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you? (e.g. order quantities, specific snack enquiries...)"
                          rows={5}
                          {...register('message', { required: 'Message is required' })}
                          className={errors.message ? 'border-destructive focus-visible:ring-destructive/30' : ''}
                        />
                        {errors.message && (
                          <span className="text-xs text-destructive font-medium">{errors.message.message}</span>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full gradient-saffron text-white border-0 gap-2 rounded-full py-2.5 shadow-md mt-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Info Column - Right (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection delay={0.15}>
                <Card className="border border-border/50 bg-card rounded-3xl p-6 md:p-8 shadow-sm">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                      Contact Information
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 space-y-6">
                    {/* Phone */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                        <PhoneCall className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Call Us</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">{BUSINESS.phoneDisplay}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Email Us</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">{BUSINESS.email}</p>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">WhatsApp Chat</h4>
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-saffron hover:underline mt-0.5 inline-block font-semibold"
                        >
                          Chat on WhatsApp ({BUSINESS.phoneDisplay})
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Our Store Address</h4>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                          {BUSINESS.address}
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="pt-4 border-t border-border/40 space-y-3">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-saffron" />
                        Business Hours
                      </h4>
                      <div className="grid grid-cols-2 text-xs md:text-sm text-muted-foreground gap-y-1.5 max-w-sm">
                        <span>Monday - Friday:</span>
                        <span className="font-semibold text-foreground">{BUSINESS.businessHours.weekdays}</span>
                        <span>Saturday:</span>
                        <span className="font-semibold text-foreground">{BUSINESS.businessHours.saturday}</span>
                        <span>Sunday:</span>
                        <span className="font-semibold text-saffron font-bold">{BUSINESS.businessHours.sunday}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="h-96 w-full relative border-t border-border/40">
        <iframe
          src={BUSINESS.mapEmbedUrl}
          className="w-full h-full border-0 absolute inset-0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${BUSINESS.name} store location map`}
        />
      </section>
    </div>
  );
}
