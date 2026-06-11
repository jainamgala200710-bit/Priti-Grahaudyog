-- ============================================
-- Priti Graha Udyog — Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  price DECIMAL(10,2),
  image TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  weight TEXT,
  ingredients TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  location TEXT,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  avatar TEXT,
  is_featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT DEFAULT 'product' CHECK (category IN ('product', 'manufacturing', 'shop')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Public Read Policies
-- ============================================

CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public read gallery" ON gallery
  FOR SELECT USING (true);

-- Public insert for enquiries (customers can submit)
CREATE POLICY "Public insert enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- ============================================
-- Admin Policies (Authenticated Users)
-- ============================================

CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access enquiries" ON enquiries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access gallery" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Indexes for Performance
-- ============================================

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);
CREATE INDEX idx_gallery_category ON gallery(category);

-- ============================================
-- Updated_at trigger for products
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Seed Data: Categories
-- ============================================

INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Spicy Sev', 'spicy-sev', 'Traditional spicy thin sev with perfect crunch and bold flavors', 1),
  ('Black Salt Sev', 'black-salt-sev', 'Unique black salt flavored sev with a tangy twist', 2),
  ('Gathiya', 'gathiya', 'Classic Gujarati gathiya — crispy and irresistible', 3),
  ('Tikha Gathiya', 'tikha-gathiya', 'Spicy variation of traditional gathiya with fiery taste', 4),
  ('Ratlami Sev', 'ratlami-sev', 'Famous Ratlami-style sev with aromatic spices', 5),
  ('Bhavnagari Gathiya', 'bhavnagari-gathiya', 'Thick and crunchy Bhavnagari-style gathiya', 6),
  ('Chana Dal', 'chana-dal', 'Crispy roasted chana dal — a healthy and tasty snack', 7),
  ('Mixture', 'mixture', 'Perfect blend of sev, nuts, and spices', 8),
  ('Farsan', 'farsan', 'Assorted Gujarati farsan for every occasion', 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Seed Data: Sample Products
-- ============================================

INSERT INTO products (name, slug, category_id, description, price, is_available, is_featured, weight, ingredients) VALUES
  ('Classic Spicy Sev', 'classic-spicy-sev', (SELECT id FROM categories WHERE slug = 'spicy-sev'), 'Our signature spicy sev made with premium besan and a secret blend of spices. Perfect crunch in every bite.', 120.00, TRUE, TRUE, '250g', 'Besan, Edible Oil, Red Chilli, Salt, Turmeric, Asafoetida'),
  ('Premium Black Salt Sev', 'premium-black-salt-sev', (SELECT id FROM categories WHERE slug = 'black-salt-sev'), 'Tangy and flavorful sev seasoned with authentic black salt. A unique taste that keeps you coming back.', 140.00, TRUE, TRUE, '250g', 'Besan, Edible Oil, Black Salt, Cumin, Ajwain, Turmeric'),
  ('Traditional Gathiya', 'traditional-gathiya', (SELECT id FROM categories WHERE slug = 'gathiya'), 'Handcrafted Gujarati gathiya with the perfect texture — crispy on the outside, melt-in-mouth inside.', 130.00, TRUE, TRUE, '250g', 'Besan, Edible Oil, Salt, Baking Soda, Ajwain'),
  ('Tikha Gathiya Special', 'tikha-gathiya-special', (SELECT id FROM categories WHERE slug = 'tikha-gathiya'), 'For those who love it spicy! Our tikha gathiya packs a punch with carefully balanced heat.', 140.00, TRUE, TRUE, '250g', 'Besan, Edible Oil, Red Chilli, Salt, Black Pepper, Ajwain'),
  ('Ratlami Sev Premium', 'ratlami-sev-premium', (SELECT id FROM categories WHERE slug = 'ratlami-sev'), 'Aromatic Ratlami sev with cloves, pepper, and the finest spices from Madhya Pradesh.', 160.00, TRUE, TRUE, '250g', 'Besan, Edible Oil, Cloves, Black Pepper, Cumin, Salt'),
  ('Bhavnagari Gathiya', 'bhavnagari-gathiya-classic', (SELECT id FROM categories WHERE slug = 'bhavnagari-gathiya'), 'Thick, crunchy, and utterly satisfying. Our Bhavnagari gathiya is made in the authentic Saurashtra style.', 150.00, TRUE, FALSE, '250g', 'Besan, Edible Oil, Salt, Baking Soda, Papad Khar'),
  ('Roasted Chana Dal', 'roasted-chana-dal', (SELECT id FROM categories WHERE slug = 'chana-dal'), 'Lightly salted and perfectly roasted chana dal. A healthy snacking option loved by all ages.', 100.00, TRUE, FALSE, '250g', 'Chana Dal, Salt, Turmeric'),
  ('Royal Mixture', 'royal-mixture', (SELECT id FROM categories WHERE slug = 'mixture'), 'A premium mix of thin sev, peanuts, chana dal, and aromatic spices. Perfect for gatherings.', 180.00, TRUE, TRUE, '250g', 'Besan, Peanuts, Chana Dal, Edible Oil, Curry Leaves, Green Chilli, Salt'),
  ('Festival Farsan Box', 'festival-farsan-box', (SELECT id FROM categories WHERE slug = 'farsan'), 'Curated assortment of our finest farsan — perfect for festivals, gifts, and celebrations.', 350.00, TRUE, TRUE, '500g', 'Assorted Besan Preparations, Dry Fruits, Edible Oil, Spices')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- Seed Data: Testimonials
-- ============================================

INSERT INTO testimonials (customer_name, location, rating, review, is_featured) VALUES
  ('Rajesh Patel', 'Rajkot', 5, 'Best namkeen in Rajkot! The spicy sev is absolutely addictive. Been ordering from Priti Graha Udyog for over 10 years now.', TRUE),
  ('Meena Shah', 'Ahmedabad', 5, 'We order their festival farsan box every Diwali. The quality is consistently excellent and the taste reminds me of my grandmother''s recipes.', TRUE),
  ('Vikram Joshi', 'Mumbai', 5, 'Discovered them through a friend and now I''m a regular customer. Their Ratlami sev is the best I''ve ever had — authentic and fresh!', TRUE),
  ('Priya Desai', 'Surat', 4, 'Love their gathiya and mixture. Fresh, crunchy, and made with quality ingredients. Highly recommend to everyone!', TRUE),
  ('Amit Kumar', 'Jamnagar', 5, 'The Bhavnagari gathiya takes me back to my childhood. Truly authentic taste. Thank you Priti Graha Udyog!', TRUE),
  ('Sunita Sharma', 'Rajkot', 5, 'Best quality namkeen with no compromise on ingredients. My whole family loves their products. The tikha gathiya is our favorite!', TRUE)
ON CONFLICT DO NOTHING;
