# 🍛 Priti Graha Udyog — Premium Business Website

A production-ready website for **Priti Graha Udyog**, a traditional Indian snacks & namkeen business. Built with modern web technologies and premium design.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

## ✨ Features

### Customer-Facing
- 🏠 **Stunning Home Page** with animated hero banner and product showcase
- 📦 **Product Catalog** with search, category filters, and product cards
- 📖 **About Us** with company story, manufacturing process, and quality commitment
- ⭐ **Why Choose Us** with animated stats and feature highlights
- 💬 **Testimonials** with customer reviews slider
- 🖼️ **Gallery** with masonry grid and lightbox
- 📞 **Contact** with form, Google Maps, and business info
- 💚 **WhatsApp Integration** for instant ordering

### Admin Panel
- 🔐 **Secure Authentication** via Supabase Auth
- 📊 **Dashboard** with stats and analytics overview
- 📦 **Product Management** — Add, edit, delete products
- 🏷️ **Category Management** — Organize product categories
- 📩 **Enquiry Management** — View and manage customer enquiries

### Technical
- 🌙 **Dark Mode** with smooth theme transitions
- 📱 **Fully Responsive** — Mobile-first design
- 🔍 **SEO Optimized** — Meta tags, structured data, semantic HTML
- ⚡ **Fast Loading** — Code splitting, lazy loading, optimized images
- 🎨 **Premium Animations** — Framer Motion throughout
- 🛡️ **Type Safe** — Full TypeScript coverage

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **npm** or yarn
- A **Supabase** account ([sign up free](https://supabase.com))

### 1. Clone & Install

```bash
cd priti-graha-udyog
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema file:
   - Copy the contents of `supabase/schema.sql`
   - Paste and run in the SQL Editor
   - This creates all tables, policies, indexes, and seed data

3. Copy your credentials from **Settings > API**:
   - Project URL
   - anon/public key

### 3. Configure Environment

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create Admin User

In your Supabase dashboard:
1. Go to **Authentication > Users**
2. Click **Add User**
3. Enter admin email and password
4. This user can now log into the admin panel

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout (SEO, fonts, nav, footer)
│   ├── globals.css           # Global styles + Tailwind v4 theme
│   ├── products/             # Products listing
│   ├── about/                # About Us
│   ├── why-choose-us/        # Why Choose Us
│   ├── testimonials/         # Testimonials
│   ├── gallery/              # Gallery
│   ├── contact/              # Contact
│   ├── admin/                # Admin panel
│   │   ├── login/            # Admin login
│   │   ├── products/         # Product management
│   │   ├── categories/       # Category management
│   │   └── enquiries/        # Enquiry management
│   └── api/                  # REST API routes
│       ├── products/
│       ├── categories/
│       └── enquiries/
├── components/
│   ├── ui/                   # ShadCN UI components
│   ├── layout/               # Navbar, Footer, WhatsApp button
│   ├── home/                 # Home page sections
│   ├── admin/                # Admin panel components
│   ├── shared/               # Reusable components
│   └── providers/            # Theme provider
└── lib/
    ├── supabase/             # Supabase client utilities
    ├── constants.ts          # Business info, nav items, etc.
    ├── types.ts              # TypeScript interfaces
    └── utils.ts              # Utility functions
```

---

## 🗄️ Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `categories` | Product categories (Spicy Sev, Gathiya, etc.) |
| `products` | Product catalog with pricing, images, ingredients |
| `enquiries` | Customer enquiries and contact requests |
| `testimonials` | Customer reviews and ratings |
| `gallery` | Photo gallery organized by category |

All tables have Row Level Security (RLS) enabled:
- **Public**: Read access to products, categories, testimonials, gallery
- **Public**: Insert access for enquiries (customers can submit)
- **Admin**: Full CRUD access when authenticated

---

## 🎨 Brand Identity

| Color | Hex | Usage |
|-------|-----|-------|
| Saffron | `#FF6B00` | Primary brand color, CTAs |
| Deep Red | `#B91C1C` | Accent, gradients |
| Cream | `#FFF7ED` | Background, light sections |
| Dark Gray | `#1F2937` | Text, dark sections |

**Fonts:**
- **Playfair Display** — Headings (elegant, traditional feel)
- **Inter** — Body text (clean, modern readability)

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Custom Domain

In Vercel dashboard → Settings → Domains → Add your business domain.

---

## 📱 WhatsApp Integration

The website includes WhatsApp integration for easy ordering:
- Floating WhatsApp button on all pages
- "Order on WhatsApp" buttons on product cards
- Pre-filled messages with product details
- Direct phone number linking

To update the WhatsApp number, edit `src/lib/constants.ts`:

```typescript
export const BUSINESS = {
  whatsapp: "919876543210", // Your WhatsApp number with country code
  // ...
};
```

---

## 🔧 Customization

### Update Business Info
Edit `src/lib/constants.ts` to update:
- Business name, tagline, description
- Phone, email, WhatsApp number
- Address and map embed URL
- Business hours
- Navigation items

### Add Real Product Images
1. Place images in `public/images/products/`
2. Update product image URLs in the database
3. Or upload via the admin panel (Supabase Storage)

### Modify Theme Colors
Edit `src/app/globals.css` and update the `@theme` block with your preferred colors.

---

## 📋 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15 | React framework, SSR/SSG |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| ShadCN UI | Latest | UI component library |
| Supabase | Latest | Database, auth, storage |
| Framer Motion | Latest | Animations |
| Lucide React | Latest | Icons |
| next-themes | Latest | Dark mode |

---

## 📄 License

This project is proprietary software built for Priti Graha Udyog.

---

Built with ❤️ for **Priti Graha Udyog** — *Authentic Homemade Namkeen Since Generations*
