import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS, NAV_ITEMS, PRODUCT_CATEGORIES, getWhatsAppLink } from '@/lib/constants';

const quickLinks = NAV_ITEMS.slice(0, 5);
const topCategories = PRODUCT_CATEGORIES.slice(0, 6);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white dark:bg-dark-900/50">
      {/* Section Divider */}
      <div className="section-divider" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold gradient-text">
                {BUSINESS.name}
              </h3>
            </Link>
            <p className="text-sm font-medium text-saffron-300 mb-3">
              {BUSINESS.tagline}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {BUSINESS.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    id={`footer-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-400 hover:text-saffron transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-saffron/50 group-hover:bg-saffron transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4 text-white">
              Our Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Sweets', href: '/category/sweet' },
                { name: 'Namkeen', href: '/category/namkeen' },
                { name: 'Party Orders & Catering', href: '/category/party-menu' },
              ].map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    id={`footer-cat-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-400 hover:text-saffron transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-saffron/50 group-hover:bg-saffron transition-colors" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-4 text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  id="footer-phone"
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-saffron transition-colors duration-200 group"
                >
                  <Phone className="h-4 w-4 mt-0.5 text-saffron/70 group-hover:text-saffron flex-shrink-0" />
                  <span>{BUSINESS.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  id="footer-email"
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-saffron transition-colors duration-200 group"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-saffron/70 group-hover:text-saffron flex-shrink-0" />
                  <span>{BUSINESS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 text-saffron/70 flex-shrink-0" />
                <span>{BUSINESS.address}</span>
              </li>
              <li>
                <a
                  id="footer-whatsapp"
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors duration-200 group"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 text-green-500/70 group-hover:text-green-400 flex-shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              © {currentYear} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with{' '}
              <span className="text-deep-red" aria-label="love">
                ❤️
              </span>{' '}
              in {BUSINESS.city}, {BUSINESS.state}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
