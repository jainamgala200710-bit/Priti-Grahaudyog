'use client';

import { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  FileEdit,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: string;
  description: string;
  ingredients: string;
  is_available: boolean;
  is_featured: boolean;
}

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: '1',
    name: 'Spicy Sev',
    category: 'Spicy Sev',
    price: 180,
    weight: '250g',
    description: 'Our signature spicy sev made with finest besan and a secret blend of aromatic spices. Perfectly crispy with a fiery kick.',
    ingredients: 'Besan, Spices, Oil, Salt',
    is_available: true,
    is_featured: true,
  },
  {
    id: '2',
    name: 'Black Salt Sev',
    category: 'Black Salt Sev',
    price: 160,
    weight: '250g',
    description: 'Delicious sev seasoned with premium black salt for a unique tangy flavour. Light, crunchy and utterly addictive.',
    ingredients: 'Besan, Black Salt, Spices, Oil, Salt',
    is_available: true,
    is_featured: true,
  },
  {
    id: '3',
    name: 'Gathiya',
    category: 'Gathiya',
    price: 140,
    weight: '250g',
    description: 'Traditional thick and soft Gathiya. A teatime essential prepared with pure double-refined groundnut oil.',
    ingredients: 'Besan, Carom Seeds (Ajwain), Papad Khar, Oil, Salt',
    is_available: true,
    is_featured: false,
  },
  {
    id: '4',
    name: 'Tikha Gathiya',
    category: 'Tikha Gathiya',
    price: 160,
    weight: '250g',
    description: 'Crispy thick gathiya spiced with pure red chili powder and black pepper. Perfect traditional specialty farsan.',
    ingredients: 'Besan, Red Chili, Pepper, Oil, Salt',
    is_available: true,
    is_featured: true,
  },
  {
    id: '5',
    name: 'Ratlami Sev',
    category: 'Ratlami Sev',
    price: 170,
    weight: '250g',
    description: 'A spicy and clove-flavored traditional sev from Ratlam. Highly aromatic and perfect for quick chat mixtures.',
    ingredients: 'Besan, Cloves, Spices, Oil, Salt',
    is_available: true,
    is_featured: true,
  },
  {
    id: '6',
    name: 'Bhavnagari Gathiya',
    category: 'Bhavnagari Gathiya',
    price: 150,
    weight: '250g',
    description: 'Lighter, fluffy and mildly spiced Gathiya originating from Bhavnagar. Exquisite softness and pure quality.',
    ingredients: 'Besan, Spices, Oil, Salt',
    is_available: true,
    is_featured: false,
  },
  {
    id: '7',
    name: 'Chana Dal',
    category: 'Chana Dal',
    price: 130,
    weight: '200g',
    description: 'Fried yellow split lentils seasoned with tangy amchur, black pepper, and dry mango powders. Crispy snacks.',
    ingredients: 'Split Bengal Gram, Tangy Spices, Oil, Salt',
    is_available: true,
    is_featured: false,
  },
  {
    id: '8',
    name: 'Cornflake Mixture',
    category: 'Mixture',
    price: 160,
    weight: '250g',
    description: 'A sweet, sour and spicy crunchy mixture containing cornflakes, roasted peanuts, chana dal and sev.',
    ingredients: 'Cornflakes, Peanuts, Raisins, Besan, Tangy Spices, Oil, Salt',
    is_available: true,
    is_featured: false,
  },
  {
    id: '9',
    name: 'Traditional Farsan Mixture',
    category: 'Farsan',
    price: 150,
    weight: '250g',
    description: 'An assortment of sev, boondi, gathiya, and flat papdi mixed together in pure groundnut oil and seasoned with regional red spices.',
    ingredients: 'Besan, Peanuts, Lentils, Spices, Oil, Salt',
    is_available: true,
    is_featured: false,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Dialog and form states
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formWeight, setFormWeight] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formIngredients, setFormIngredients] = useState('');
  const [formIsAvailable, setFormIsAvailable] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory(PRODUCT_CATEGORIES[0]);
    setFormPrice(150);
    setFormWeight('250g');
    setFormDescription('');
    setFormIngredients('');
    setFormIsAvailable(true);
    setFormIsFeatured(false);
    setOpenFormDialog(true);
  };

  const handleOpenEditForm = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price);
    setFormWeight(product.weight);
    setFormDescription(product.description);
    setFormIngredients(product.ingredients);
    setFormIsAvailable(product.is_available);
    setFormIsFeatured(product.is_featured);
    setOpenFormDialog(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error('Please enter a product name');
      return;
    }

    if (editingProduct) {
      // Edit mode
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                category: formCategory,
                price: Number(formPrice),
                weight: formWeight,
                description: formDescription,
                ingredients: formIngredients,
                is_available: formIsAvailable,
                is_featured: formIsFeatured,
              }
            : p
        )
      );
      toast.success('Product updated successfully!');
    } else {
      // Add mode
      const newProduct: AdminProduct = {
        id: String(Date.now()),
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        weight: formWeight,
        description: formDescription,
        ingredients: formIngredients,
        is_available: formIsAvailable,
        is_featured: formIsFeatured,
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success('Product added successfully!');
    }
    setOpenFormDialog(false);
  };

  const handleOpenDelete = (product: AdminProduct) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (!productToDelete) return;
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    toast.success(`Product "${productToDelete.name}" deleted successfully.`);
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight">
            Manage Products
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add, update, or remove namkeen varieties on the storefront.
          </p>
        </div>
        <Button onClick={handleOpenAddForm} className="gradient-saffron text-white border-0 gap-2 rounded-lg px-4 shrink-0 shadow-md">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-dark-800/20 border border-dark-700/50 p-4 rounded-xl">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-dark-700"
          />
        </div>

        {/* Category select */}
        <div>
          <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val || 'all')}>
            <SelectTrigger className="w-full bg-background/50 border-dark-700">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Table */}
      <div className="border border-dark-700/50 rounded-xl overflow-hidden bg-dark-900/10">
        <Table>
          <TableHeader className="bg-dark-900/30">
            <TableRow className="border-dark-700">
              <TableHead className="w-[200px] text-muted-foreground">Product Name</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground">Price</TableHead>
              <TableHead className="text-muted-foreground">Weight</TableHead>
              <TableHead className="text-muted-foreground">Availability</TableHead>
              <TableHead className="text-muted-foreground">Featured</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow className="border-dark-700 hover:bg-transparent">
                <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Package className="h-10 w-10 text-muted-foreground/40" />
                    <span>No products found matching filters.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-dark-700 hover:bg-dark-800/20">
                  <TableCell className="font-semibold text-foreground">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron font-medium">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-muted-foreground">{product.weight}</TableCell>
                  <TableCell>
                    {product.is_available ? (
                      <Badge className="bg-green-500/10 text-green-500 border border-green-500/30 font-medium">
                        Available
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive border border-destructive/30 font-medium">
                        Out of Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.is_featured ? (
                      <Badge className="bg-saffron/10 text-saffron border border-saffron/30 font-medium">
                        Featured
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => handleOpenEditForm(product)}
                        className="text-blue-400 hover:text-blue-500 hover:bg-blue-500/10"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => handleOpenDelete(product)}
                        className="text-destructive hover:text-destructive-500 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Form Modal Dialog */}
      <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
        <DialogContent className="max-w-[500px] border-dark-700/60 bg-dark-900/95 backdrop-blur-md rounded-xl text-foreground">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-heading)] text-xl font-bold flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-saffron" />
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingProduct
                ? 'Update the product parameters. Changes reflect instantly.'
                : 'Create a new traditional snack listing on the website.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProduct} className="space-y-4 pt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-semibold">Product Name</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Spicy Tikha Sev"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
              <Select value={formCategory} onValueChange={(val) => setFormCategory(val || '')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price & Weight Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-sm font-semibold">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  min={1}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="weight" className="text-sm font-semibold">Weight Pack</Label>
                <Input
                  id="weight"
                  value={formWeight}
                  onChange={(e) => setFormWeight(e.target.value)}
                  placeholder="e.g. 250g or 500g"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Tell customers about crunchiness, taste profile, spice levels..."
                rows={3}
              />
            </div>

            {/* Ingredients */}
            <div className="space-y-1.5">
              <Label htmlFor="ingredients" className="text-sm font-semibold">Ingredients</Label>
              <Input
                id="ingredients"
                value={formIngredients}
                onChange={(e) => setFormIngredients(e.target.value)}
                placeholder="e.g. Besan, Red Chili, Ajwain, Oil"
              />
            </div>

            {/* Checkbox states */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formIsAvailable}
                  onChange={(e) => setFormIsAvailable(e.target.checked)}
                  className="rounded border-dark-700 h-4 w-4 accent-saffron"
                />
                In Stock
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input
                  type="checkbox"
                  checked={formIsFeatured}
                  onChange={(e) => setFormIsFeatured(e.target.checked)}
                  className="rounded border-dark-700 h-4 w-4 accent-saffron"
                />
                Featured Product
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-dark-700/40">
              <Button type="button" variant="outline" onClick={() => setOpenFormDialog(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button type="submit" className="gradient-saffron text-white border-0 rounded-lg px-6">
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="max-w-[400px] border-dark-700/60 bg-dark-900/95 backdrop-blur-md rounded-xl text-foreground">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-heading)] text-lg font-bold flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Product?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              Are you sure you want to delete product <strong>"{productToDelete?.name}"</strong>? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/80 text-white rounded-lg px-6">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
