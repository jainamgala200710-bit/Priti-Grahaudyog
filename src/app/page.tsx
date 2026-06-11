'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  MessageCircle,
  Package,
  X,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Clock,
  PackageCheck,
  Truck,
  Scale,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CategorySelector } from '@/components/home/CategorySelector';
import { getProductWhatsAppLink, openBothWhatsApp, BUSINESS } from '@/lib/constants';
import { formatPrice, truncate } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useCart } from '@/components/providers/CartProvider';
import { toast } from 'sonner';

// ── Weight options for Sweet & Namkeen ──────────────────────────────────
const WEIGHT_OPTIONS = ['250g', '500g', '1000g'] as const;

// ── All products with superCategory mapping ─────────────────────────────
const ALL_PRODUCTS: (Product & { superCategory: string; subCategory?: string; hasWeightSelector?: boolean; hasPieceSelector?: boolean; pieceOptions?: string[]; specialTag?: string; variantOptions?: { label: string; price: number }[]; weightOptions?: string[] })[] = [
  // ─── SWEET ────────────────────────────────────────────────────────────
  {
    id: 's1', name: 'God Papdi', slug: 'god-papdi', category_id: 's',
    description: 'Flaky, melt-in-mouth papdi drenched in pure ghee syrup with cardamom. A traditional Gujarati sweet loved across generations.',
    price: 600, image: '/images/god-papdi.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Wheat Flour, Ghee, Sugar, Cardamom', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 's', name: 'Sweet', slug: 'sweet', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'sweet', hasWeightSelector: true,
    variantOptions: [
      { label: 'Regular', price: 600 },
      { label: 'With Dry Fruits', price: 750 },
    ],
  },
  {
    id: 's2', name: 'Finiya Ladoo', slug: 'finiya-ladoo', category_id: 's',
    description: 'Delicate vermicelli ladoos made with roasted fine seviyan, pure ghee, and sugar. Light, aromatic, and irresistibly sweet.',
    price: 700, image: '/images/finiya-ladoo.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Vermicelli, Ghee, Sugar, Cardamom, Dry Fruits', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 's', name: 'Sweet', slug: 'sweet', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'sweet', hasWeightSelector: true,
    variantOptions: [
      { label: 'Regular', price: 700 },
      { label: 'With Dry Fruits', price: 850 },
    ],
  },
  {
    id: 's3', name: 'Mohanthal', slug: 'mohanthal', category_id: 's',
    description: 'Traditional Gujarati mohanthal — a rich, fudgy besan barfi loaded with dry fruits and saffron. The ultimate festive delicacy.',
    price: 600, image: '/images/mohanthal.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Besan, Ghee, Sugar Syrup, Saffron, Almonds, Pistachios', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 's', name: 'Sweet', slug: 'sweet', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'sweet', hasWeightSelector: true,
  },
  {
    id: 's4', name: 'Godiya Ladoo', slug: 'godiya-ladoo', category_id: 's',
    description: 'Classic Gujarati godiya ladoo made with jaggery, ghee, and wheat flour. A wholesome, naturally sweet treat for all ages.',
    price: 950, image: '/images/godiya-ladoo.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Wheat Flour, Jaggery, Ghee, Dry Fruits', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 's', name: 'Sweet', slug: 'sweet', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'sweet', hasWeightSelector: true,
    variantOptions: [
      { label: 'Regular', price: 950 },
      { label: 'With Dry Fruits', price: 1100 },
    ],
  },
  {
    id: 's5', name: 'Nachni Ladoo', slug: 'nachni-ladoo', category_id: 's',
    description: 'Nutritious ragi (finger millet) ladoos with jaggery and ghee. A healthy, protein-rich sweet perfect for daily energy.',
    price: 950, image: '/images/nachni-ladoo.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Ragi Flour, Jaggery, Ghee, Sesame, Dry Fruits', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 's', name: 'Sweet', slug: 'sweet', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'sweet', hasWeightSelector: true,
    variantOptions: [
      { label: 'Regular', price: 950 },
      { label: 'With Dry Fruits', price: 1100 },
    ],
  },
  {
    id: 's6', name: 'Dry Fruit Sugar Free Ladoo', slug: 'dry-fruit-sugar-free-ladoo', category_id: 's',
    description: 'Premium sugar-free ladoos packed with dates, almonds, cashews, pistachios, and seeds. A guilt-free, nutrient-dense treat.',
    price: 1200, image: '/images/dry-fruit-sugar-free-ladoo.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Dates, Almonds, Cashews, Pistachios, Seeds, Ghee, Cardamom', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 's', name: 'Sweet', slug: 'sweet', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'sweet', hasWeightSelector: true,
  },

  // ─── NAMKEEN ──────────────────────────────────────────────────────────
  {
    id: 'n1', name: 'Makai Chivda', slug: 'makai-chivda', category_id: 'n',
    description: 'Crispy corn flake chivda tempered with curry leaves, peanuts, and aromatic spices. A light and crunchy everyday snack.',
    price: null, image: '/images/makai-chivda.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Corn Flakes, Peanuts, Curry Leaves, Spices, Oil', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n2', name: 'Roasted Poha Chivda', slug: 'roasted-poha-chivda', category_id: 'n',
    description: 'Healthy roasted poha chivda with peanuts, cashews, and subtle spices. Low oil, maximum flavour — guilt-free snacking.',
    price: null, image: '/images/roasted-poha-chivda.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Flattened Rice, Peanuts, Cashews, Curry Leaves, Turmeric, Oil', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n3', name: 'Fried Poha Chivda', slug: 'fried-poha-chivda', category_id: 'n',
    description: 'Classic deep-fried poha chivda with golden crunch. Loaded with peanuts, raisins, and perfectly balanced spices.',
    price: null, image: '/images/fried-poha-chivda.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Flattened Rice, Peanuts, Raisins, Cashews, Spices, Oil', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n4', name: 'Dry Fruit Makhana Bhel', slug: 'dry-fruit-makhana-bhel', category_id: 'n',
    description: 'A premium healthy mix of roasted makhana, almonds, cashews, and tangy spices. The perfect superfood snack.',
    price: null, image: '/images/dry-fruit-makhana-bhel.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Makhana, Almonds, Cashews, Peanuts, Spices, Ghee', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n5', name: 'Curry Pata Puri', slug: 'curry-pata-puri', category_id: 'n',
    description: 'Crispy miniature puris infused with aromatic curry leaves and mild spices. A unique and addictive tea-time snack.',
    price: null, image: '/images/curry-pata-puri.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Wheat Flour, Curry Leaves, Spices, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n6', name: 'Methi Puri', slug: 'methi-puri', category_id: 'n',
    description: 'Deliciously crispy-flaky flat puris seasoned with fresh fenugreek leaves and black pepper. The ideal evening tea partner.',
    price: null, image: '/images/methi-puri-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Wheat Flour, Semolina, Fresh Fenugreek, Spices, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n7', name: 'Sev Puri', slug: 'sev-puri', category_id: 'n',
    description: 'Crispy and delicious flat puris, perfectly styled and ready to prepare mouth-watering street-style Sev Puri at home.',
    price: null, image: '/images/sev-puri-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Whole Wheat Flour, Spices, Ajwain, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n8', name: 'Wheat Jeera Puri', slug: 'wheat-jeera-puri', category_id: 'n',
    description: 'Aromatic whole wheat puris with roasted cumin seeds. The earthy jeera flavour elevates simple flour into a gourmet snack.',
    price: null, image: '/images/sev-puri.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Whole Wheat Flour, Cumin Seeds, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n9', name: 'Maida Puri', slug: 'maida-puri', category_id: 'n',
    description: 'Flaky, golden deep-fried flour puris with a delicate, melt-in-mouth texture. Lightly seasoned with ajwain seeds.',
    price: null, image: '/images/maida-puri.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Maida (Refined Flour), Ajwain, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n10', name: 'Masala Puri', slug: 'masala-puri', category_id: 'n',
    description: 'Boldly spiced crispy puris with a blend of red chilli, turmeric, and chaat masala. Packed with fiery flavour.',
    price: null, image: '/images/masala-puri.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Wheat Flour, Red Chilli, Turmeric, Chaat Masala, Oil', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n11', name: 'Rice Flour Chakli', slug: 'rice-flour-chakli', category_id: 'n',
    description: 'Crispy, golden spiral snack made with premium rice flour and select spices. A traditional festive favourite with a perfect crunch.',
    price: null, image: '/images/chakri.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Rice Flour, Gram Flour, Sesame Seeds, Spices, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n12', name: 'Gathiya', slug: 'gathiya', category_id: 'n',
    description: 'Traditional Gujarati gathiya made fresh daily. Thick, crunchy strands of besan goodness with perfect seasoning.',
    price: null, image: '/images/gathiya-fresh.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Besan, Ajwain, Salt, Oil', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n13', name: 'Tikha Sev', slug: 'tikha-sev', category_id: 'n',
    description: 'Spicy thin sev made with finest besan and a fiery blend of red chilli and pepper. A crunchy, addictive classic.',
    price: null, image: '/images/spicy-sev.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Besan, Red Chilli, Pepper, Spices, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n14', name: 'Sada Sev', slug: 'sada-sev', category_id: 'n',
    description: 'Classic plain sev with a mild, clean besan flavour. Versatile — enjoy on its own or use as a topping for chaats and snacks.',
    price: null, image: '/images/sada-sev.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Besan, Salt, Turmeric, Oil', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n16', name: 'Mithi Puri', slug: 'mithi-puri', category_id: 'n',
    description: 'Sweet and crispy miniature puris with a hint of jaggery and cardamom. A delightful mix of sweet and savoury.',
    price: null, image: '/images/mithi-puri.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Wheat Flour, Jaggery, Cardamom, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  {
    id: 'n17', name: 'Matki Puri', slug: 'matki-puri', category_id: 'n',
    description: 'Exquisite matki (moth bean) flour puris, hand-rolled and crisped to perfection. Premium taste with rich traditional spices.',
    price: null, image: '/images/matki-puri.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Matki Flour, Gram Flour, Red Chili, Spices, Oil, Salt', created_at: '2025-01-01', updated_at: '2025-01-01',
    categories: { id: 'n', name: 'Namkeen', slug: 'namkeen', description: null, image: null, display_order: 1, created_at: '2025-01-01' },
    superCategory: 'namkeen', hasWeightSelector: true,
  },
  // ─── PARTY ORDERS & CATERING ──────────────────────────────────────────
  {
    id: 'p27', name: 'Paneer Butter Masala', slug: 'paneer-butter-masala-party', category_id: 'p',
    description: 'Classic rich and creamy Punjabi dish featuring tender paneer cubes cooked in a mildly sweet, buttery tomato gravy.',
    price: 800, image: '/images/paneer-tikka-masala.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Paneer, Butter, Cashews, Cream, Tomatoes, Mild Spices', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'punjabi-sabji', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'All-Time Fav',
    variantOptions: [
      { label: 'Regular', price: 800 },
      { label: 'Jain', price: 850 },
    ],
  },
  {
    id: 'p28', name: 'Paneer Chilly Milly', slug: 'paneer-chilly-milly-party', category_id: 'p',
    description: 'A flavorful fusion starter/curry of paneer cubes tossed in a spicy, tangy sauce with bell peppers and green chillies.',
    price: 800, image: '/images/paneer-tikka-masala.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Paneer, Capsicum, Green Chilli, Onion, Ginger, Sauces, Spices', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'punjabi-sabji', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Spicy Fusion',
    variantOptions: [
      { label: 'Regular', price: 800 },
      { label: 'Jain', price: 850 },
    ],
  },
  {
    id: 'p29', name: 'Paneer Lababdar', slug: 'paneer-lababdar-party', category_id: 'p',
    description: 'Delectable, rich paneer curry prepared with onions, tomatoes, cashews, and a unique blend of aromatic herbs and grated paneer.',
    price: 800, image: '/images/paneer-tikka-masala.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Paneer, Grated Paneer, Cashews, Cream, Tomatoes, Spices, Herbs', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'punjabi-sabji', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Premium Special',
    variantOptions: [
      { label: 'Regular', price: 800 },
      { label: 'Jain', price: 850 },
    ],
  },
  {
    id: 'p30', name: 'Veg Kolhapuri', slug: 'veg-kolhapuri-party', category_id: 'p',
    description: 'A fiery, spicy, and robust mixed vegetable curry cooked with a special Kolhapuri masala paste of dry coconut and sesame seeds.',
    price: 800, image: '/images/veg-kolhapuri.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Mixed Vegetables, Dry Coconut, Sesame Seeds, Kolhapuri Masala, Oil', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'punjabi-sabji', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Spicy Delight',
    variantOptions: [
      { label: 'Regular', price: 800 },
      { label: 'Jain', price: 850 },
    ],
  },
  {
    id: 'p3', name: 'Idli Chutney', slug: 'idli-chutney-party', category_id: 'p',
    description: 'Soft, fluffy steamed rice idlis served with freshly ground coconut chutney and tangy tomato chutney.',
    price: 100, image: '/images/idli-chutney-catering.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Rice, Urad Dal, Coconut, Spices, Tamarind', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'south-indian', hasPieceSelector: true,
    pieceOptions: ['5 Plates (15 pcs)', '10 Plates (30 pcs)', '20 Plates (60 pcs)'], specialTag: 'South Special',
    variantOptions: [
      { label: 'Regular', price: 100 },
      { label: 'Jain', price: 100 },
    ],
  },
  {
    id: 'p4', name: 'Medu Vada', slug: 'medu-vada-party', category_id: 'p',
    description: 'Crispy and golden-brown deep-fried lentil donuts. Crunchy on the outside, soft on the inside. Served with chutney.',
    price: 110, image: '/images/medu-vada-catering.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Urad Dal, Green Chillies, Ginger, Curry Leaves, Oil', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'south-indian', hasPieceSelector: true,
    pieceOptions: ['5 Plates (20 pcs)', '10 Plates (40 pcs)', '20 Plates (80 pcs)'], specialTag: 'Traditional',
    variantOptions: [
      { label: 'Regular', price: 110 },
      { label: 'Jain', price: 110 },
    ],
  },
  {
    id: 'p5', name: 'Ragda Pattice', slug: 'ragda-pattice-party', category_id: 'p',
    description: 'Classic Mumbai street food! Golden potato patties (pattice) served with a spiced white peas gravy (ragda) and sweet & tangy chutneys.',
    price: 150, image: '/images/ragda-pattice-catering.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Potatoes, White Peas, Spices, Tamarind, Mint, Coriander, Sev', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'chaat-snacks', hasPieceSelector: true,
    pieceOptions: ['5 Plates (15 pcs)', '10 Plates (30 pcs)', '20 Plates (60 pcs)'], specialTag: 'Chaat Special',
    variantOptions: [
      { label: 'Regular', price: 150 },
      { label: 'Jain', price: 180 },
    ],
  },
  {
    id: 'p7', name: 'Dahi Vada', slug: 'dahi-vada-party', category_id: 'p',
    description: 'Soft lentil dumplings soaked in sweet yogurt, drizzled with tangy tamarind chutney, spicy green chutney, and roasted cumin powder.',
    price: 150, image: '/images/medu-vada-catering.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Urad Dal, Yogurt, Spices, Tamarind, Mint, Pomegranate', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'chaat-snacks', hasPieceSelector: true,
    pieceOptions: ['5 Plates (10 pcs)', '10 Plates (20 pcs)', '20 Plates (40 pcs)'], specialTag: 'Party Favourite',
    variantOptions: [
      { label: 'Regular', price: 150 },
      { label: 'Jain', price: 150 },
    ],
  },
  {
    id: 'p8', name: 'Chilly Milly Idli', slug: 'chilly-milly-idli-party', category_id: 'p',
    description: 'Tangy and spicy fusion dish of mini idlis tossed with colorful bell peppers, green chillies, and custom sauces. A modern starter.',
    price: 600, image: '/images/chilly-milly-idli.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Rice Idli, Capsicum, Green Chilli, Soy Sauce, Chilli Sauce, Spices', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'special-items', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Fusion Starter',
    variantOptions: [
      { label: 'Regular', price: 600 },
      { label: 'Jain', price: 600 },
    ],
  },
  {
    id: 'p9', name: 'Sabudana Khichdi', slug: 'sabudana-khichdi-party', category_id: 'p',
    description: 'Light and non-sticky sabudana khichdi loaded with roasted peanuts, cumin, green chillies, and fresh coriander. Fully customizable.',
    price: 550, image: '/images/sabudana-khichdi.jpg', is_available: true, is_featured: false, weight: null,
    ingredients: 'Tapioca Pearls, Peanuts, Green Chilli, Cumin, Ghee, Coriander', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'special-items', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Fast Friendly',
    variantOptions: [
      { label: 'Regular', price: 550 },
      { label: 'Jain', price: 550 },
    ],
  },
  {
    id: 'p10', name: 'Pav Bhaji', slug: 'pav-bhaji-party', category_id: 'p',
    description: 'Spiced and buttery mashed vegetable gravy served with hot, soft butter-toasted Pav, chopped onions, and lemon. Traditional Mumbai style.',
    price: 250, image: '/images/pav-bhaji-catering.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Mixed Vegetables, Potatoes, Butter, Pav Bhaji Masala, Pav, Onions, Lemon', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'pav-bhaji-misal', hasPieceSelector: true,
    pieceOptions: ['5 Plates (15 Pav)', '10 Plates (30 Pav)', '20 Plates (60 Pav)'], specialTag: 'Mumbai Icon',
    variantOptions: [
      { label: 'Regular', price: 250 },
      { label: 'Jain', price: 280 },
    ],
  },
  {
    id: 'p12', name: 'Vatana Misal Pav', slug: 'vatana-misal-pav-party', category_id: 'p',
    description: 'Spicy and flavorful white peas misal gravy topped with crunchy farsan mix, served with soft Pav, lemon, and chopped onions.',
    price: 150, image: '/images/misal-pav.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'White Peas, Spices, Farsan, Pav, Onion, Lemon, Oil', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'pav-bhaji-misal', hasPieceSelector: true,
    pieceOptions: ['5 Plates (15 Pav)', '10 Plates (30 Pav)', '20 Plates (60 Pav)'], specialTag: 'Spicy Treat',
  },
  {
    id: 'p13', name: 'Dal Khichdi', slug: 'dal-khichdi-party', category_id: 'p',
    description: 'Wholesome and comforting rice and yellow lentil khichdi tempered with ghee, cumin, and garlic. Simple yet satisfying.',
    price: 600, image: '/images/veg-pulao-catering.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Rice, Toor Dal, Ghee, Garlic, Spices, Turmeric', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Comfort Food',
    variantOptions: [
      { label: 'Regular', price: 600 },
      { label: 'Jain', price: 600 },
    ],
  },
  {
    id: 'p14', name: 'Veg Pulao', slug: 'veg-pulao-party', category_id: 'p',
    description: 'Aromatic Basmati rice pulao loaded with fresh seasonal vegetables, cooked with exotic cardamoms, cloves, and bay leaves.',
    price: 600, image: '/images/veg-pulao-fresh.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Basmati Rice, Seasonal Vegetables, Ghee, Whole Spices, Cashews', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Classic Choice',
    variantOptions: [
      { label: 'Regular', price: 600 },
      { label: 'Jain', price: 600 },
    ],
  },
  {
    id: 'p15', name: 'White Pulao', slug: 'white-pulao-party', category_id: 'p',
    description: 'Delicately flavored white pulao cooked in rich vegetable broth, flavored with mild spices and garnished with fried cashews.',
    price: 600, image: '/images/veg-pulao-catering.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Basmati Rice, Green Peas, Cashews, Ghee, Cardamom, Cloves', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Mild & Rich',
    variantOptions: [
      { label: 'Regular', price: 600 },
      { label: 'Jain', price: 600 },
    ],
  },
  {
    id: 'p16', name: 'Tawa Pulao', slug: 'tawa-pulao-party', category_id: 'p',
    description: 'Street-style spicy tawa pulao cooked on a large iron pan with a blend of pav bhaji masala, butter, and crunchy vegetables.',
    price: 800, image: '/images/tawa-pulao-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Basmati Rice, Potatoes, Peas, Capsicum, Butter, Pav Bhaji Masala', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Street Style',
    variantOptions: [
      { label: 'Regular', price: 800 },
      { label: 'Jain', price: 800 },
    ],
  },
  {
    id: 'p17', name: 'Veg Biryani', slug: 'veg-biryani-party', category_id: 'p',
    description: 'Layers of perfectly cooked long-grain Basmati rice and rich vegetable gravy infused with saffron, rose water, and mint.',
    price: 800, image: '/images/veg-biryani-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Basmati Rice, Vegetables, Curd, Biryani Masala, Saffron, Ghee', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Party Spec',
    variantOptions: [
      { label: 'Regular', price: 800 },
      { label: 'Jain', price: 800 },
    ],
  },
  {
    id: 'p18', name: 'Dum Biryani', slug: 'dum-biryani-party', category_id: 'p',
    description: 'Slow-cooked (dum) traditional vegetable biryani baked inside a sealed clay container to seal in all the rich aromas and spices.',
    price: 850, image: '/images/veg-pulao-catering.png', is_available: true, is_featured: true, weight: null,
    ingredients: 'Basmati Rice, Mixed Vegetables, Fried Onions, Saffron, Ghee, Mint, Dum Masala', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Premium Dum',
    variantOptions: [
      { label: 'Regular', price: 850 },
      { label: 'Jain', price: 850 },
    ],
  },
  {
    id: 'p19', name: 'Jeera Rice', slug: 'jeera-rice-party', category_id: 'p',
    description: 'Fluffy long-grain Basmati rice tossed in hot ghee with roasted cumin seeds and fresh coriander. Ideal with Dal Fry.',
    price: 500, image: '/images/jeera-rice-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Basmati Rice, Cumin Seeds, Ghee, Salt, Coriander', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'rice-khichdi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Aromatic',
    variantOptions: [
      { label: 'Regular', price: 500 },
      { label: 'Jain', price: 500 },
    ],
  },
  {
    id: 'p20', name: 'Dal Fry', slug: 'dal-fry-party', category_id: 'p',
    description: 'Spiced yellow lentils tempered with ghee, cumin seeds, mustard seeds, garlic, red chillies, and fresh tomatoes.',
    price: 500, image: '/images/dal-fry-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Toor Dal, Ghee, Garlic, Onions, Tomatoes, Red Chilli, Spices', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'dal-kadhi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Classic Dal',
    variantOptions: [
      { label: 'Regular', price: 500 },
      { label: 'Jain', price: 500 },
    ],
  },
  {
    id: 'p21', name: 'Kadhi', slug: 'kadhi-party', category_id: 'p',
    description: 'Creamy and tangy yogurt-based Gujarati kadhi simmered with gram flour, spiced with ginger-green chillies and sweet cinnamon.',
    price: 300, image: '/images/kadhi-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Yogurt, Gram Flour, Green Chilli, Ginger, Sweetener, Spices', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'dal-kadhi', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Gujarati style',
    variantOptions: [
      { label: 'Regular', price: 300 },
      { label: 'Jain', price: 300 },
    ],
  },
  {
    id: 'p22', name: 'Poha', slug: 'poha-party', category_id: 'p',
    description: 'Light and fluffy flattened rice cooked with turmeric, mustard seeds, curry leaves, and green peas. Garnished with fresh coconut and sev.',
    price: 300, image: '/images/poha-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Flattened Rice, Mustard Seeds, Green Pea, Turmeric, Lemon, Coriander', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'breakfast', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Breakfast Icon',
    variantOptions: [
      { label: 'Regular', price: 300 },
      { label: 'Jain', price: 300 },
    ],
  },
  {
    id: 'p23', name: 'Upma', slug: 'upma-party', category_id: 'p',
    description: 'Traditional semolina porridge prepared with roasted mustard seeds, black lentils (urad dal), carrots, peas, and green chillies.',
    price: 300, image: '/images/upma-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Semolina, Ghee, Mustard Seeds, Cashews, Vegetables, Green Chillies', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'breakfast', hasWeightSelector: true,
    weightOptions: ['1kg', '2kg', '3kg', '5kg'], specialTag: 'Morning Fresh',
    variantOptions: [
      { label: 'Regular', price: 300 },
      { label: 'Jain', price: 300 },
    ],
  },
  {
    id: 'p24', name: 'Thepla', slug: 'thepla-party', category_id: 'p',
    description: 'Soft, spiced Indian flatbreads made with whole wheat flour, fresh fenugreek leaves (methi), and traditional spices.',
    price: 12, image: '/images/thepla-fresh.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Whole Wheat Flour, Fenugreek Leaves, Spices, Yogurt, Oil', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'breads', hasPieceSelector: true,
    pieceOptions: ['20 Pieces', '40 Pieces', '60 Pieces'], specialTag: 'Traditional',
  },
  {
    id: 'p25', name: 'Chapati', slug: 'chapati-party', category_id: 'p',
    description: 'Fresh, soft and thin whole wheat flatbreads cooked on a traditional tawa, lightly smeared with pure ghee.',
    price: 15, image: '/images/ghee-chapati.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Whole Wheat Flour, Water, Ghee, Salt', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'breads', hasPieceSelector: true,
    pieceOptions: ['10 Pieces', '20 Pieces', '40 Pieces'], specialTag: 'Daily Fresh',
  },
  {
    id: 'p26', name: 'Paratha', slug: 'paratha-party', category_id: 'p',
    description: 'Layered and flaky flatbreads roasted with ghee or butter, serving as a perfect accompaniment to Punjabi curries.',
    price: 20, image: '/images/paratha-fresh-v2.png', is_available: true, is_featured: false, weight: null,
    ingredients: 'Whole Wheat Flour, Ghee, Water, Salt', created_at: '2026-06-08', updated_at: '2026-06-08',
    categories: { id: 'p', name: 'Party Orders & Catering', slug: 'party-menu', description: null, image: null, display_order: 3, created_at: '2026-06-08' },
    superCategory: 'party-menu', subCategory: 'breads', hasPieceSelector: true,
    pieceOptions: ['10 Pieces', '20 Pieces', '40 Pieces'], specialTag: 'Flaky Delight',
  },
].map(p => {
  let price = p.price;
  if (price === null) {
    if (p.superCategory === 'namkeen') {
      if (p.slug === 'matki-puri' || p.slug === 'dry-fruit-makhana-bhel') {
        price = 600;
      } else {
        price = 550;
      }
    } else {
      price = 150;
    }
  }
  return { ...p, price };
});

// ── Category metadata ──────────────────────────────────────────────────
const CATEGORY_META: Record<string, { title: string; subtitle: string; gradient: string; emoji: string }> = {
  sweet: {
    title: 'Sweets',
    subtitle: 'Traditional Indian mithai crafted with pure ghee, dry fruits, and love',
    gradient: 'from-amber-500/90 via-orange-400/80 to-rose-400/70',
    emoji: '🍯',
  },
  namkeen: {
    title: 'Namkeen',
    subtitle: 'Crispy, crunchy, and irresistibly spiced traditional Gujarati snacks',
    gradient: 'from-saffron/90 via-deep-red/70 to-amber-500/80',
    emoji: '🌶️',
  },
  'party-menu': {
    title: 'Party Orders & Catering',
    subtitle: 'Premium bulk catering services and customizable party menus for all occasions',
    gradient: 'from-saffron/90 via-orange-500/80 to-deep-red/70',
    emoji: '🎉',
  },
};

const GRADIENT_COLORS = [
  'from-saffron-100 to-saffron-200',
  'from-deep-red-50 to-saffron-100',
  'from-amber-100 to-orange-200',
  'from-orange-100 to-red-100',
  'from-yellow-100 to-amber-200',
  'from-saffron-50 to-amber-100',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
};

// ── Party Menu Notice Cards ─────────────────────────────────────────────
function PartyMenuNotices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Advance Order Notice */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 dark:border-amber-800/40 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-200 text-sm mb-1">Advance Order Required</h3>
            <p className="text-amber-800/80 dark:text-amber-300/80 text-xs leading-relaxed">
              Orders must be placed <strong>2 days in advance.</strong>
            </p>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-amber-200/20 dark:bg-amber-800/10" />
      </div>

      {/* Dehydrated Packing Notice */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20 dark:border-emerald-800/40 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
            <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm mb-1">Dehydrated Packing</h3>
            <p className="text-emerald-800/80 dark:text-emerald-300/80 text-xs leading-relaxed">
              All items can be dehydrated and packed for travel/storage at <strong>₹380 per kg</strong> (dehydrated orders must be placed <strong>5 days in advance</strong>).
            </p>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-emerald-200/20 dark:bg-emerald-800/10" />
      </div>

      {/* Vacuum Packing Notice */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 dark:border-blue-800/40 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <PackageCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 text-sm mb-1">Vacuum Packing Available</h3>
            <p className="text-blue-800/80 dark:text-blue-300/80 text-xs leading-relaxed">
              Thepla, Roti, Chapati &amp; Paratha can be vacuum packed at <strong>₹40 per pack of 10 pieces.</strong>
            </p>
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blue-200/20 dark:bg-blue-800/10" />
      </div>
    </div>
  );
}

// ── Quantity Weight Selector ────────────────────────────────────────────
function WeightSelector({
  selectedWeight,
  onChange,
  options = WEIGHT_OPTIONS,
}: {
  selectedWeight: string;
  onChange: (w: string) => void;
  options?: readonly string[] | string[];
}) {
  return (
    <div className="flex gap-1.5 mb-3">
      {options.map((w) => {
        const label = w === '1000g' ? '1 kg' : w;
        const isActive = selectedWeight === w;
        return (
          <button
            key={w}
            onClick={() => onChange(w)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-saffron to-saffron-600 text-white border-saffron shadow-sm'
                : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-saffron/40 hover:text-saffron'
            }`}
          >
            <Scale className="h-3 w-3 inline-block mr-1 -mt-0.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── Product Card Component ──────────────────────────────────────────────
// ── Piece Selector for Breads ──────────────────────────────────────────
function PieceSelector({
  options,
  selectedOption,
  onChange,
}: {
  options: string[];
  selectedOption: string;
  onChange: (opt: string) => void;
}) {
  return (
    <div className="flex gap-1.5 mb-3">
      {options.map((opt) => {
        const isActive = selectedOption === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-saffron to-saffron-600 text-white border-saffron shadow-sm'
                : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-saffron/40 hover:text-saffron'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ── Variant Selector for Sweets (Regular / With Dry Fruits) ────────────
function VariantSelector({
  options,
  selectedVariant,
  onChange,
}: {
  options: { label: string; price: number }[];
  selectedVariant: string;
  onChange: (label: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 mb-3">
      {options.map((opt) => {
        const isActive = selectedVariant === opt.label;
        return (
          <button
            key={opt.label}
            onClick={() => onChange(opt.label)}
            className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-saffron to-saffron-600 text-white border-saffron shadow-sm'
                : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-saffron/40 hover:text-saffron'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-white' : 'border-muted-foreground/50'}`}>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              {opt.label}
            </span>
            <span className="font-bold">₹{opt.price}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Product Card Component ──────────────────────────────────────────────
function ProductCard({
  product,
  index,
  addToCart,
}: {
  product: (typeof ALL_PRODUCTS)[number];
  index: number;
  addToCart: (product: Product, quantity?: number, selectedWeight?: string) => void;
}) {
  const defaultSelectorValue = product.hasPieceSelector
    ? (product.pieceOptions?.[0] || '20 Pieces')
    : (product.hasWeightSelector && product.weightOptions ? product.weightOptions[0] : (product.superCategory === 'sweet' ? '500g' : '250g'));
  const [selectedWeight, setSelectedWeight] = useState<string>(defaultSelectorValue);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variantOptions?.[0]?.label || ''
  );
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isDehydrated, setIsDehydrated] = useState(false);
  const [isVacuumPacked, setIsVacuumPacked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const weightOptions = product.weightOptions || (product.superCategory === 'sweet'
    ? ['500g', '1000g']
    : ['250g', '500g', '1000g']);

  // Sync state when product selector type changes
  useEffect(() => {
    setSelectedWeight(defaultSelectorValue);
    setSelectedVariant(product.variantOptions?.[0]?.label || '');
    setIsDehydrated(false);
    setIsVacuumPacked(false);
  }, [product.id, product.hasPieceSelector, defaultSelectorValue, product.variantOptions]);

  // Get variant-aware price (variant price = per kg, then scale by weight)
  const currentPrice = useMemo(() => {
    let basePrice = product.price || 150;
    if (product.variantOptions && selectedVariant) {
      const variant = product.variantOptions.find((v) => v.label === selectedVariant);
      if (variant) basePrice = variant.price;
    }

    let itemPrice = basePrice;
    // Support bulk quantity options (e.g. "5 Plates", "2 kg")
    const quantityMatch = selectedWeight.match(/^(\d+)\s*(?:Plates|Pieces|kg)/i);
    if (quantityMatch) {
      const qty = parseInt(quantityMatch[1], 10);
      if (!isNaN(qty)) {
        itemPrice = basePrice * qty;
      }
    } else if (product.hasWeightSelector) {
      // Scale by weight if weight selector is active
      if (selectedWeight === '250g') itemPrice = Math.round(basePrice / 4);
      else if (selectedWeight === '500g') itemPrice = Math.round(basePrice / 2);
      else if (selectedWeight === '1000g') itemPrice = basePrice;
    }

    // Add dehydration cost: ₹380 per kg if selected
    if (isDehydrated) {
      let kgs = 0;
      if (selectedWeight.includes('kg')) {
        const kgMatch = selectedWeight.match(/^(\d+)\s*kg/i);
        if (kgMatch) kgs = parseInt(kgMatch[1], 10);
      } else if (selectedWeight === '1000g' || selectedWeight === '1 kg') {
        kgs = 1;
      } else if (selectedWeight === '500g') {
        kgs = 0.5;
      } else if (selectedWeight === '250g') {
        kgs = 0.25;
      }
      if (kgs > 0) {
        itemPrice += Math.round(380 * kgs);
      }
    }

    // Add vacuum packaging cost: ₹40 per pack of 10 pieces if selected
    if (isVacuumPacked) {
      let pieces = 0;
      const pieceMatch = selectedWeight.match(/^(\d+)\s*Pieces/i);
      if (pieceMatch) {
        pieces = parseInt(pieceMatch[1], 10);
      }
      if (pieces > 0) {
        const packs = Math.ceil(pieces / 10);
        itemPrice += packs * 40;
      }
    }

    return itemPrice;
  }, [product, selectedWeight, selectedVariant, isDehydrated, isVacuumPacked]);

  const whatsAppWeight = (product.hasWeightSelector || product.hasPieceSelector)
    ? selectedWeight === '1000g' ? '1 kg' : selectedWeight
    : undefined;

  const variantStr = product.variantOptions && selectedVariant ? ` — ${selectedVariant}` : '';
  const dehydrateStr = isDehydrated ? ' (Dehydrated)' : '';
  const vacuumStr = isVacuumPacked ? ' (Vacuum Packed)' : '';
  const whatsAppMessage = (product.hasWeightSelector || product.hasPieceSelector)
    ? `Hi! I'm interested in ordering "${product.name}${variantStr}${dehydrateStr}${vacuumStr}" (${whatsAppWeight}) at ₹${currentPrice}. Please share availability and order details.`
    : `Hi! I'm interested in ordering "${product.name}${variantStr}${dehydrateStr}${vacuumStr}" at ₹${currentPrice}. Please share availability and order details.`;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group glass rounded-2xl overflow-hidden card-hover border border-saffron-100/50 flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={index < 4}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${GRADIENT_COLORS[index % GRADIENT_COLORS.length]} flex items-center justify-center`}>
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-saffron-600/40 mb-2" />
              <span className="text-saffron-700/60 text-sm font-medium px-2 block">
                {product.name}
              </span>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-saffron to-deep-red text-white border-none gap-1">
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}

        {/* Speciality tag */}
        {product.specialTag && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-purple-600/90 text-white border-none text-[10px] uppercase font-bold tracking-wider">
              {product.specialTag}
            </Badge>
          </div>
        )}

        {/* Weight badge (for party menu items without selectors) */}
        {!product.hasWeightSelector && !product.hasPieceSelector && product.weight && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="bg-white/90 text-dark-700 border-none">
              {product.weight}
            </Badge>
          </div>
        )}


      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground mb-1 group-hover:text-saffron transition-colors">
          {product.name}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 flex-1">
          {truncate(product.description || '', 90)}
        </p>

        {/* Price display */}
        {currentPrice && (
          <div className="mb-3 flex items-baseline flex-wrap gap-1">
            {product.superCategory === 'party-menu' && (
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mr-1">
                Starting from
              </span>
            )}
            <span className="text-xl font-bold gradient-text">
              {formatPrice(currentPrice)}
            </span>
            {product.hasPieceSelector && !product.slug.includes('-party') && (
              <span className="text-xs text-muted-foreground ml-1.5 font-medium">
                (₹{product.price} / pc)
              </span>
            )}
          </div>
        )}

        {/* Variant Selector is now shown in modal after Add to Cart click */}

        {/* Weight Selector (for Sweet & Namkeen) */}
        {product.hasWeightSelector && (
          <WeightSelector
            selectedWeight={selectedWeight}
            onChange={setSelectedWeight}
            options={weightOptions}
          />
        )}

        {/* Piece Selector (for Breads) */}
        {product.hasPieceSelector && product.pieceOptions && (
          <PieceSelector
            options={product.pieceOptions}
            selectedOption={selectedWeight}
            onChange={setSelectedWeight}
          />
        )}

        {/* Vacuum Option (for Breads & Accompaniments) */}
        {product.subCategory === 'breads' && (
          <div className="mt-1 mb-3 p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-1.5 text-left">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-blue-800 dark:text-blue-300">
              <input
                type="checkbox"
                checked={isVacuumPacked}
                onChange={(e) => setIsVacuumPacked(e.target.checked)}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer accent-blue-600"
              />
              <span>Request Vacuum Packaging (+₹40/10pcs)</span>
            </label>
            <div className="text-[10px] text-blue-700 dark:text-blue-400 font-medium leading-relaxed">
              ℹ️ Vacuum packaging of <strong>10 pieces in 1 packet</strong>.
            </div>
          </div>
        )}

        {/* Dehydrated Option (for Party Orders) */}
        {product.superCategory === 'party-menu' && product.subCategory !== 'south-indian' && product.subCategory !== 'chaat-snacks' && product.subCategory !== 'breads' && (
          <div className="mt-1 mb-3 p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1.5 text-left">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <input
                type="checkbox"
                checked={isDehydrated}
                onChange={(e) => setIsDehydrated(e.target.checked)}
                className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer accent-emerald-600"
              />
              <span>Request Dehydrated Packaging (+₹380/kg)</span>
            </label>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">
              ⚠️ Dehydrated orders require <strong>1kg minimum</strong> and must be placed <strong>5 days in advance</strong>.
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          {product.superCategory === 'party-menu' && (
            <div className="flex items-center justify-between bg-muted/40 border border-border/50 rounded-xl p-1.5 mb-1">
              <span className="text-xs font-semibold text-muted-foreground ml-1.5">Catering Packs</span>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-7 h-7 rounded-lg hover:bg-background cursor-pointer"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-7 h-7 rounded-lg hover:bg-background cursor-pointer"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          )}
          <Button
            id={`add-to-cart-${product.slug}`}
            disabled={isAddingToCart}
            onClick={() => {
              if (product.variantOptions && product.variantOptions.length > 0) {
                setShowVariantModal(true);
              } else if (!isAddingToCart) {
                setIsAddingToCart(true);
                setTimeout(() => {
                  let displayName = product.name;
                  if (isDehydrated) {
                    displayName = `${displayName} (Dehydrated)`;
                  }
                  if (isVacuumPacked) {
                    displayName = `${displayName} (Vacuum Packed)`;
                  }

                  const cartProduct = {
                    ...product,
                    price: currentPrice,
                    name: displayName
                  };

                  const weight = (product.hasWeightSelector || product.hasPieceSelector) ? selectedWeight : undefined;
                  addToCart(cartProduct, quantity, weight);
                  setQuantity(1);
                  setIsDehydrated(false);
                  setIsVacuumPacked(false);
                  setIsAddingToCart(false);
                }, 500);
              }
            }}
            className="w-full bg-gradient-to-r from-saffron to-saffron-600 text-white hover:from-saffron-600 hover:to-saffron-700 rounded-xl h-9 cursor-pointer font-medium disabled:opacity-70"
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            id={`whatsapp-btn-${product.slug}`}
            variant="outline"
            className="w-full border-green-500 text-green-600 hover:bg-green-50 rounded-xl h-9 text-xs cursor-pointer"
            onClick={() => openBothWhatsApp(whatsAppMessage)}
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1" />
            Order on WhatsApp
          </Button>
        </div>
      </div>

      {/* ── Variant Selection Modal (appears after Add to Cart) ── */}
      <AnimatePresence>
        {showVariantModal && product.variantOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowVariantModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl border border-saffron-100/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select any 1 option
                  </p>
                </div>
                <button
                  onClick={() => setShowVariantModal(false)}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Variant options */}
              <div className="p-4 space-y-2">
                {product.variantOptions.map((opt) => {
                  const isActive = selectedVariant === opt.label;
                  // Calculate weight-adjusted price for display
                  let displayPrice = opt.price;
                  const quantityMatch = selectedWeight.match(/^(\d+)\s*(?:Plates|Pieces|kg)/i);
                  if (quantityMatch) {
                    const qty = parseInt(quantityMatch[1], 10);
                    if (!isNaN(qty)) {
                      displayPrice = opt.price * qty;
                    }
                  } else if (product.hasWeightSelector) {
                    if (selectedWeight === '250g') displayPrice = Math.round(opt.price / 4);
                    else if (selectedWeight === '500g') displayPrice = Math.round(opt.price / 2);
                  }

                  // Add dehydration cost: ₹380 per kg if selected
                  if (isDehydrated) {
                    let kgs = 0;
                    if (selectedWeight.includes('kg')) {
                      const kgMatch = selectedWeight.match(/^(\d+)\s*kg/i);
                      if (kgMatch) kgs = parseInt(kgMatch[1], 10);
                    } else if (selectedWeight === '1000g' || selectedWeight === '1 kg') {
                      kgs = 1;
                    } else if (selectedWeight === '500g') {
                      kgs = 0.5;
                    } else if (selectedWeight === '250g') {
                      kgs = 0.25;
                    }
                    if (kgs > 0) {
                      displayPrice += Math.round(380 * kgs);
                    }
                  }

                  // Add vacuum packaging cost: ₹40 per pack of 10 pieces if selected
                  if (isVacuumPacked) {
                    let pieces = 0;
                    const pieceMatch = selectedWeight.match(/^(\d+)\s*Pieces/i);
                    if (pieceMatch) {
                      pieces = parseInt(pieceMatch[1], 10);
                    }
                    if (pieces > 0) {
                      const packs = Math.ceil(pieces / 10);
                      displayPrice += packs * 40;
                    }
                  }
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedVariant(opt.label)}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        isActive
                           ? 'bg-gradient-to-r from-saffron/10 to-saffron-50 border-saffron text-foreground shadow-sm'
                          : 'bg-muted/30 text-muted-foreground border-border/50 hover:border-saffron/40'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-saffron' : 'border-muted-foreground/40'}`}>
                          {isActive && <span className="w-2 h-2 rounded-full bg-saffron" />}
                        </span>
                        {opt.label}
                      </span>
                      <span className={`font-bold ${isActive ? 'text-saffron' : ''}`}>₹{displayPrice}</span>
                    </button>
                  );
                })}
              </div>

              {/* Confirm button */}
              <div className="p-4 pt-0">
                <Button
                  onClick={() => {
                    let displayName = product.name;
                    if (selectedVariant) {
                      displayName = `${product.name} (${selectedVariant})`;
                    }
                    if (isDehydrated) {
                      displayName = `${displayName} (Dehydrated)`;
                    }
                    if (isVacuumPacked) {
                      displayName = `${displayName} (Vacuum Packed)`;
                    }

                    const cartProduct = {
                      ...product,
                      price: currentPrice,
                      name: displayName
                    };
                    const weight = (product.hasWeightSelector || product.hasPieceSelector) ? selectedWeight : undefined;
                    addToCart(cartProduct, quantity, weight);
                    setQuantity(1);
                    setIsDehydrated(false);
                    setIsVacuumPacked(false);
                    setShowVariantModal(false);
                  }}
                  className="w-full bg-gradient-to-r from-saffron to-saffron-600 text-white hover:from-saffron-600 hover:to-saffron-700 rounded-xl h-11 cursor-pointer font-semibold text-sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add {product.name} — ₹{currentPrice}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Quality Assurance Banner Component ──────────────────────────────────
function QualityAssuranceBanner() {
  return (
    <section className="relative py-12 bg-gradient-to-r from-cream-100 via-saffron-50/40 to-cream-100 dark:from-dark-900 dark:via-saffron-950/10 dark:to-dark-900 border-y border-saffron-100/30 overflow-hidden">
      <div className="absolute inset-0 pattern-overlay opacity-[0.02]" />
      {/* Decorative floating elements */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-saffron-100/40 dark:bg-saffron-900/10 blur-md hidden sm:block animate-float" />
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-16 h-16 rounded-full bg-orange-100/40 dark:bg-orange-900/10 blur-lg hidden sm:block animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-saffron-100 dark:bg-saffron-900/30 text-saffron mb-2">
            <Sparkles className="h-6 w-6 animate-pulse-glow" />
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            100% Premium Quality Assurance
          </h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium max-w-3xl mx-auto italic">
            &ldquo;All our products are prepared using pure Desi Ghee and premium Refined Sunflower Oil. Every item is freshly cooked with high-quality ingredients to ensure authentic homemade taste, superior quality, and a shelf life of 10 days.&rdquo;
          </p>
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 pt-2 text-[10px] md:text-xs font-semibold text-saffron uppercase tracking-widest">
            <span className="flex items-center gap-1">✨ Pure Desi Ghee</span>
            <span className="flex items-center gap-1">🌿 Premium Sunflower Oil</span>
            <span className="flex items-center gap-1">🏡 Authentic Homemade</span>
            <span className="flex items-center gap-1">⏳ Shelf Life: 10 Days</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Party Menu Important Notice Card ────────────────────────────────────
function PartyMenuImportantNotice() {
  return (
    <div className="w-full mb-8 overflow-hidden rounded-2xl border border-deep-red-200/60 bg-gradient-to-r from-deep-red-50 to-orange-50 dark:from-deep-red-950/20 dark:to-orange-950/10 p-6 shadow-md relative animate-fade-in">
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
        <Truck className="h-28 w-28 text-deep-red" />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-deep-red-100 dark:bg-deep-red-950/50 flex items-center justify-center text-deep-red dark:text-deep-red-400">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-heading)] font-bold text-base md:text-lg text-deep-red dark:text-deep-red-400">
              Important Party Menu Shipping Policy
            </h4>
            <div className="mt-2 space-y-1.5 text-xs md:text-sm text-foreground/80 font-medium">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-red shrink-0" />
                Party Menu is available for serving within Mumbai only.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-red shrink-0" />
                No home delivery available for Party Menu orders.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-deep-red shrink-0" />
                Pickup and Wefast delivery options only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// ── Main Page Component ─────────────────────────────────────────────────
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('sweet');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const meta = CATEGORY_META[activeCategory];

  // Sync category selector selection
  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    setTimeout(() => {
      const el = document.getElementById('products-display-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Mount logic for query parameters (?category=sweet etc.)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && ['sweet', 'namkeen', 'party-menu'].includes(cat)) {
      setActiveCategory(cat);
      setTimeout(() => {
        const el = document.getElementById('products-display-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS
      .filter((p) => p.superCategory === activeCategory)
      .filter((p) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        );
      });
  }, [activeCategory, searchQuery]);

  const partyMenuGroups = useMemo(() => {
    if (activeCategory !== 'party-menu') return null;
    const items = filteredProducts;
    return {
      sabji: {
        title: 'Punjabi Sabji Specials',
        emoji: '🍲',
        description: 'Rich, buttery, and aromatic North Indian gravies prepared fresh for your bulk catering requirements.',
        items: items.filter(p => p.subCategory === 'punjabi-sabji'),
      },
      breads: {
        title: 'Breads & Accompaniments',
        emoji: '🫓',
        description: 'Freshly prepared traditional Indian flatbreads, chapatis, and layered parathas.',
        items: items.filter(p => p.subCategory === 'breads'),
      },
      southChaat: {
        title: 'South Indian & Street Chaat',
        emoji: '🍛',
        description: 'Authentic South Indian steamed/fried starters and tangy, delicious traditional street-style chaats.',
        items: items.filter(p => p.subCategory === 'south-indian' || p.subCategory === 'chaat-snacks'),
      },
      pavBhaji: {
        title: 'Pav Bhaji & Misal Pav',
        emoji: '🍞',
        description: 'Legendary Mumbai street food stars, ideal for party plates and family gatherings.',
        items: items.filter(p => p.subCategory === 'pav-bhaji-misal'),
      },
      riceBiryani: {
        title: 'Basmati Rice & Khichdi Specials',
        emoji: '🍚',
        description: 'Premium fragrant Basmati rice pulavs, dum-cooked traditional biryanis, and comforting warm khichdis.',
        items: items.filter(p => p.subCategory === 'rice-khichdi'),
      },
      otherSpecial: {
        title: 'Dal, Kadhi & Breakfast Starters',
        emoji: '🍳',
        description: 'Wholesome breakfast items, slow-cooked dals, tangy kadhi, and fusion starters.',
        items: items.filter(p => p.subCategory === 'breakfast' || p.subCategory === 'dal-kadhi' || p.subCategory === 'special-items'),
      },
    };
  }, [activeCategory, filteredProducts]);



  return (
    <div className="flex flex-col min-h-screen">
      {/* Floating Homemade Watermark/Badge */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-xs font-bold uppercase tracking-wider"
        >
          <span className="text-base">🏡</span>
          100% Homemade Quality
        </motion.div>
      </div>

      {/* ── Category Cards Banner ─────────────────────────────────── */}
      <CategorySelector onSelectCategory={handleSelectCategory} />

      {/* ── Quality Assurance Banner ─────────────────────────────────── */}
      <QualityAssuranceBanner />

      {/* ── Products Display Area ─────────────────────────────────── */}
      <section
        id="products-display-section"
        className="relative py-16 md:py-24 bg-background scroll-mt-20 border-t border-border/40"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Section heading & Category selector tabs */}
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Explore Our Collection
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-8">
              Pick a category below or search for your favorite treats to order directly
            </p>

            {/* Custom Premium Category Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-muted/60 dark:bg-zinc-800/40 border border-border/50 max-w-full overflow-x-auto gap-1">
              {Object.entries(CATEGORY_META).map(([key, cat]) => {
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    id={`tab-btn-${key}`}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-saffron to-saffron-600 text-white shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Search bar */}
          <div className="glass rounded-2xl p-4 md:p-6 shadow-md mb-10 flex flex-col md:flex-row gap-4 items-center border border-border/30">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="combined-search"
                type="text"
                placeholder={`Search products in ${meta?.title || 'this category'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base rounded-xl border-saffron-200/50 focus-visible:border-saffron focus-visible:ring-saffron/30"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="shrink-0 text-sm font-semibold text-muted-foreground w-full md:w-auto text-center md:text-left px-2">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>

          {/* Grid display */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              activeCategory === 'party-menu' && !searchQuery && partyMenuGroups ? (
                <motion.div
                  key="party-menu-grouped"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  {/* Party Orders Banner */}
                  <div className="w-full mb-8 overflow-hidden rounded-2xl border border-saffron-200/60 bg-gradient-to-r from-saffron-50 to-orange-50 dark:from-zinc-900/60 dark:to-orange-950/10 p-5 shadow-sm relative text-center">
                    <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                      <Badge className="bg-saffron text-white border-none mb-1 text-[10px] uppercase font-extrabold tracking-widest animate-pulse">
                        Catering Live
                      </Badge>
                      <h4 className="font-[family-name:var(--font-heading)] font-bold text-lg md:text-xl text-saffron-800 dark:text-saffron-300">
                        Party Orders Available | Freshly Prepared | Bulk Catering Services
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium">
                        Delivering delicious, hot bulk food across Mumbai for corporate events, parties, and celebrations.
                      </p>
                    </div>
                  </div>

                  {Object.entries(partyMenuGroups).map(([groupKey, group]) => {
                    if (group.items.length === 0) return null;
                    return (
                      <div key={groupKey} className="space-y-6">
                        <div className="border-b border-saffron-100/50 pb-4">
                          <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold flex items-center gap-2 text-foreground">
                            <span className="text-3xl">{group.emoji}</span>
                            {group.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1 font-medium">
                            {group.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {group.items.map((product, index) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              index={index}
                              addToCart={addToCart}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}


                </motion.div>
              ) : (
                <motion.div
                  key={`${activeCategory}__list`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      addToCart={addToCart}
                    />
                  ))}
                </motion.div>
              )
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-saffron-50 dark:bg-zinc-800 flex items-center justify-center mb-5 text-saffron">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground max-w-sm text-sm mb-6">
                  We couldn&apos;t find any products matching &quot;{searchQuery}&quot; in this category.
                </p>
                <Button
                  id="reset-search-btn"
                  onClick={() => setSearchQuery('')}
                  className="bg-gradient-to-r from-saffron to-deep-red text-white rounded-xl"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
