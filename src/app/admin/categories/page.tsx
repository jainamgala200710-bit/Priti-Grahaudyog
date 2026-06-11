'use client';

import { useState, useMemo } from 'react';
import {
  Tags,
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  FileEdit,
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
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';

interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: '1',
    name: 'Spicy Sev',
    slug: 'spicy-sev',
    description: 'Crispy sev heavily spiced with our special house-blend chili and pepper powders.',
    productCount: 3,
  },
  {
    id: '2',
    name: 'Black Salt Sev',
    slug: 'black-salt-sev',
    description: 'Tangy and crunchy sev seasoned with pure black salt (kala namak) for digestion and taste.',
    productCount: 1,
  },
  {
    id: '3',
    name: 'Gathiya',
    slug: 'gathiya',
    description: 'Thick, fluffy, soft traditional Gujarati farsan made of chickpea flour and carom seeds.',
    productCount: 1,
  },
  {
    id: '4',
    name: 'Tikha Gathiya',
    slug: 'tikha-gathiya',
    description: 'Crunchy spicy gathiya infused with pure red chili powder.',
    productCount: 1,
  },
  {
    id: '5',
    name: 'Ratlami Sev',
    slug: 'ratlami-sev',
    description: 'Clove-spiced highly aromatic crispy sev, a regional Saurashtrian teatime favorite.',
    productCount: 1,
  },
  {
    id: '6',
    name: 'Bhavnagari Gathiya',
    slug: 'bhavnagari-gathiya',
    description: 'Extremely soft and mildly flavored gathiya rings from Bhavnagar traditions.',
    productCount: 1,
  },
  {
    id: '7',
    name: 'Chana Dal',
    slug: 'chana-dal',
    description: 'Deep fried crunchy split Bengal gram lentils seasoned with dry mango powder.',
    productCount: 1,
  },
  {
    id: '8',
    name: 'Mixture',
    slug: 'mixture',
    description: 'Curated mix of various namkeens like cornflakes, peanuts, cashews and sev.',
    productCount: 1,
  },
  {
    id: '9',
    name: 'Farsan',
    slug: 'farsan',
    description: 'Assorted mix of snacks and crispy flat papdi with mild spices.',
    productCount: 1,
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');

  // Dialog and form states
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<AdminCategory | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Filter categories
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [categories, searchQuery]);

  const handleOpenAddForm = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDescription('');
    setOpenFormDialog(true);
  };

  const handleOpenEditForm = (category: AdminCategory) => {
    setEditingCategory(category);
    setFormName(category.name);
    setFormDescription(category.description);
    setOpenFormDialog(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    const slug = slugify(formName);

    if (editingCategory) {
      // Edit
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formName, slug, description: formDescription }
            : c
        )
      );
      toast.success('Category updated successfully!');
    } else {
      // Add
      const newCategory: AdminCategory = {
        id: String(Date.now()),
        name: formName,
        slug,
        description: formDescription,
        productCount: 0,
      };
      setCategories((prev) => [...prev, newCategory]);
      toast.success('Category added successfully!');
    }
    setOpenFormDialog(false);
  };

  const handleOpenDelete = (category: AdminCategory) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (!categoryToDelete) return;
    setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
    toast.success(`Category "${categoryToDelete.name}" deleted successfully.`);
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight">
            Manage Categories
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure the categories used to group snacks on the store.
          </p>
        </div>
        <Button onClick={handleOpenAddForm} className="gradient-saffron text-white border-0 gap-2 rounded-lg px-4 shrink-0 shadow-md">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search control */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-dark-800/20 border border-dark-700/50 p-4 rounded-xl">
        <div className="relative col-span-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-dark-700"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="border border-dark-700/50 rounded-xl overflow-hidden bg-dark-900/10">
        <Table>
          <TableHeader className="bg-dark-900/30">
            <TableRow className="border-dark-700">
              <TableHead className="w-[200px] text-muted-foreground">Category Name</TableHead>
              <TableHead className="text-muted-foreground">URL Slug</TableHead>
              <TableHead className="text-muted-foreground">Description</TableHead>
              <TableHead className="text-muted-foreground">Product Count</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow className="border-dark-700 hover:bg-transparent">
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Tags className="h-10 w-10 text-muted-foreground/40" />
                    <span>No categories found.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="border-dark-700 hover:bg-dark-800/20">
                  <TableCell className="font-semibold text-foreground">{category.name}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-dark-800 border border-dark-700 px-2 py-0.5 rounded text-saffron-400">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {category.description || <span className="italic text-xs">No description set</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">
                      {category.productCount} {category.productCount === 1 ? 'Product' : 'Products'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => handleOpenEditForm(category)}
                        className="text-blue-400 hover:text-blue-500 hover:bg-blue-500/10"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => handleOpenDelete(category)}
                        className="text-destructive hover:text-destructive-500 hover:bg-destructive/10"
                        disabled={category.productCount > 0} // Prevent deleting non-empty categories
                        title={category.productCount > 0 ? 'Cannot delete category containing products' : ''}
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

      {/* Add / Edit Category Dialog */}
      <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
        <DialogContent className="max-w-[450px] border-dark-700/60 bg-dark-900/95 backdrop-blur-md rounded-xl text-foreground">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-heading)] text-xl font-bold flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-saffron" />
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Categories help organize namkeens and gathiyas on the customer product portal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCategory} className="space-y-4 pt-2">
            {/* Category Name */}
            <div className="space-y-1.5">
              <Label htmlFor="category-name" className="text-sm font-semibold">Category Name</Label>
              <Input
                id="category-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Traditional Spicy Mixtures"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="category-description" className="text-sm font-semibold">Description</Label>
              <Textarea
                id="category-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Write a brief tagline/description for this snack category..."
                rows={4}
              />
            </div>

            <DialogFooter className="pt-4 border-t border-dark-700/40">
              <Button type="button" variant="outline" onClick={() => setOpenFormDialog(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button type="submit" className="gradient-saffron text-white border-0 rounded-lg px-6">
                Save Category
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="max-w-[400px] border-dark-700/60 bg-dark-900/95 backdrop-blur-md rounded-xl text-foreground">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-heading)] text-lg font-bold flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Category?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              Are you sure you want to delete category <strong>"{categoryToDelete?.name}"</strong>? This action cannot be undone.
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
