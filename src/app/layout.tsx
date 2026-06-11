import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { CosmicBackground } from "@/components/shared/CosmicBackground";
import { SEO, BUSINESS } from "@/lib/constants";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SEO.title,
    template: `%s | ${BUSINESS.name}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: BUSINESS.name }],
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    type: "website",
    locale: "en_IN",
    siteName: BUSINESS.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: BUSINESS.name,
              description: BUSINESS.description,
              telephone: BUSINESS.phone,
              email: BUSINESS.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Station Road",
                addressLocality: BUSINESS.city,
                addressRegion: BUSINESS.state,
                postalCode: BUSINESS.pincode,
                addressCountry: BUSINESS.country,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-[family-name:var(--font-body)] min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CartProvider>
            <CosmicBackground />
            <Navbar />
            <main className="flex-1 content">{children}</main>
            <Footer />
            <WhatsAppButton />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
