'use client';

import { useState, useMemo } from 'react';
import {
  MessageSquare,
  Search,
  MessageCircle,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { formatDate, truncate } from '@/lib/utils';
import { BUSINESS } from '@/lib/constants';
import { toast } from 'sonner';

interface AdminEnquiry {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  product_name: string | null;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}

const INITIAL_ENQUIRIES: AdminEnquiry[] = [
  {
    id: '1',
    customer_name: 'Rajesh Patel',
    phone: '+91 98765 43210',
    email: 'rajesh@gmail.com',
    product_name: 'Spicy Sev',
    message: 'I would like to order 5kg of Spicy Sev for a family function in Ghatkopar, Mumbai. What is the bulk pricing and delivery timeline?',
    status: 'new',
    created_at: '2026-06-04T10:30:00Z',
  },
  {
    id: '2',
    customer_name: 'Priya Sharma',
    phone: '+91 87654 32109',
    email: 'priya.sharma@yahoo.com',
    product_name: 'Bhavnagari Gathiya',
    message: 'Do you ship to Ahmedabad? I want to order 2kg of Bhavnagari Gathiya and 1kg of Cornflake Mixture.',
    status: 'contacted',
    created_at: '2026-06-03T15:45:00Z',
  },
  {
    id: '3',
    customer_name: 'Amit Shah',
    phone: '+91 76543 21098',
    email: null,
    product_name: 'Ratlami Sev',
    message: 'Looking for distributor opportunities in Vadodara. Please contact me with wholesale terms.',
    status: 'resolved',
    created_at: '2026-06-02T09:15:00Z',
  },
  {
    id: '4',
    customer_name: 'Anjali Gadhvi',
    phone: '+91 95432 10987',
    email: 'anjali.g@outlook.com',
    product_name: 'Mixture',
    message: 'Can I get custom 100g packets of Sweet and Sour Mixture for a party return gift? Order size is 150 packets.',
    status: 'new',
    created_at: '2026-06-04T08:20:00Z',
  },
  {
    id: '5',
    customer_name: 'Hiren Trivedi',
    phone: '+91 91234 56789',
    email: 'hiren.t@gmail.com',
    product_name: 'Tikha Gathiya',
    message: 'Please send pricing catalog for all products. I need to ship to the United States via a courier agent.',
    status: 'contacted',
    created_at: '2026-05-30T11:00:00Z',
  },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(INITIAL_ENQUIRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(null);

  // Status Badge components
  const StatusBadge = ({ status }: { status: AdminEnquiry['status'] }) => {
    switch (status) {
      case 'new':
        return (
          <Badge className="bg-saffron/10 text-saffron border border-saffron/30 font-medium">
            New
          </Badge>
        );
      case 'contacted':
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 font-medium">
            Contacted
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-green-500/10 text-green-500 border border-green-500/30 font-medium">
            Resolved
          </Badge>
        );
    }
  };

  // Status change handler
  const handleStatusChange = (enquiryId: string, newStatus: AdminEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === enquiryId ? { ...enq, status: newStatus } : enq))
    );
    // Update selected enquiry dialog state as well
    if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success('Status updated successfully!');
  };

  // Delete enquiry
  const handleDeleteEnquiry = (enquiryId: string) => {
    setEnquiries((prev) => prev.filter((enq) => enq.id !== enquiryId));
    toast.success('Enquiry record deleted.');
    setSelectedEnquiry(null);
  };

  // WhatsApp reply link generator
  const getReplyWhatsAppLink = (enquiry: AdminEnquiry) => {
    const rawPhone = enquiry.phone.replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('91') ? rawPhone : `91${rawPhone}`;
    const text = `Hi ${enquiry.customer_name}! This is from Priti's Gruh Udyog. We received your enquiry about "${enquiry.product_name || 'Namkeen'}". Let us discuss the details.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Filtered list
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const matchesSearch =
        enq.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (enq.product_name && enq.product_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        enq.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || enq.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [enquiries, searchQuery, activeTab]);

  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight">
            Customer Enquiries
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review product requests, bulk questions, and feedback from the contact forms.
          </p>
        </div>
      </div>

      {/* Tabs / Filter Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-dark-800/20 border border-dark-700/50 p-3 rounded-xl">
          <TabsList className="bg-dark-900/40 border border-dark-700">
            <TabsTrigger value="all" className="data-active:bg-saffron data-active:text-white">All</TabsTrigger>
            <TabsTrigger value="new" className="data-active:bg-saffron data-active:text-white">New</TabsTrigger>
            <TabsTrigger value="contacted" className="data-active:bg-saffron data-active:text-white">Contacted</TabsTrigger>
            <TabsTrigger value="resolved" className="data-active:bg-saffron data-active:text-white">Resolved</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50 border-dark-700 w-full"
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="border border-dark-700/50 rounded-xl overflow-hidden bg-dark-900/10">
            <Table>
              <TableHeader className="bg-dark-900/30">
                <TableRow className="border-dark-700">
                  <TableHead className="text-muted-foreground">Customer Name</TableHead>
                  <TableHead className="text-muted-foreground">Phone</TableHead>
                  <TableHead className="text-muted-foreground">Requested Product</TableHead>
                  <TableHead className="text-muted-foreground">Message</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow className="border-dark-700 hover:bg-transparent">
                    <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MessageSquare className="h-10 w-10 text-muted-foreground/40" />
                        <span>No customer enquiries in this category.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id} className="border-dark-700 hover:bg-dark-800/20">
                      <TableCell className="font-semibold text-foreground">{enquiry.customer_name}</TableCell>
                      <TableCell className="text-muted-foreground">{enquiry.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-saffron/30 text-saffron font-medium">
                          {enquiry.product_name || 'General enquiry'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {truncate(enquiry.message, 45)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDate(enquiry.created_at)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={enquiry.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="text-blue-400 hover:text-blue-500 hover:bg-blue-500/10"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span className="sr-only">View Details</span>
                          </Button>
                          <a
                            href={getReplyWhatsAppLink(enquiry)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              className="text-green-500 hover:text-green-600 hover:bg-green-600/10"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span className="sr-only">WhatsApp Reply</span>
                            </Button>
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Enquiry Details Modal Dialog */}
      <Dialog open={selectedEnquiry !== null} onOpenChange={() => setSelectedEnquiry(null)}>
        {selectedEnquiry && (
          <DialogContent className="max-w-[500px] border-dark-700/60 bg-dark-900/95 backdrop-blur-md rounded-xl text-foreground">
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-heading)] text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-saffron" />
                Enquiry Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Received on {formatDate(selectedEnquiry.created_at)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-3 text-sm">
              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-4 bg-dark-800/20 border border-dark-700/40 p-4 rounded-lg">
                <div>
                  <span className="text-xs text-muted-foreground block font-medium uppercase">Customer Name</span>
                  <span className="font-semibold text-foreground block text-base mt-0.5">
                    {selectedEnquiry.customer_name}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block font-medium uppercase">Phone Number</span>
                  <span className="font-semibold text-foreground block text-base mt-0.5">
                    {selectedEnquiry.phone}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-dark-700/30">
                  <span className="text-xs text-muted-foreground block font-medium uppercase">Email Address</span>
                  <span className="text-foreground block mt-0.5">
                    {selectedEnquiry.email || <span className="italic text-xs text-muted-foreground">No email provided</span>}
                  </span>
                </div>
              </div>

              {/* Product */}
              <div>
                <span className="text-xs text-muted-foreground block font-medium uppercase mb-1">Requested Product</span>
                <Badge variant="outline" className="border-saffron/30 bg-saffron/5 text-saffron font-bold text-sm px-3 py-1">
                  {selectedEnquiry.product_name || 'General Query / Bulk Orders'}
                </Badge>
              </div>

              {/* Message */}
              <div>
                <span className="text-xs text-muted-foreground block font-medium uppercase mb-1">Enquiry Message</span>
                <p className="bg-dark-800/30 border border-dark-700/40 p-3 rounded-lg text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </p>
              </div>

              {/* Status Update Controls */}
              <div className="pt-4 border-t border-dark-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block font-medium uppercase mb-1.5">Update Status</span>
                  <Select
                    value={selectedEnquiry.status}
                    onValueChange={(val) => handleStatusChange(selectedEnquiry.id, val as AdminEnquiry['status'])}
                  >
                    <SelectTrigger className="w-40 border-dark-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 self-end">
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                    className="text-destructive hover:text-destructive-500 hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <a
                    href={getReplyWhatsAppLink(selectedEnquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gradient-saffron text-white border-0 gap-2 rounded-lg px-4 shadow-sm">
                      <MessageCircle className="h-4 w-4" />
                      Reply on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
