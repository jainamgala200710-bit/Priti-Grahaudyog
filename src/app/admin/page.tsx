'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Package,
  MessageSquare,
  Bell,
  Tags,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { formatDate, truncate } from '@/lib/utils'

// Hardcoded stats
const stats = [
  {
    label: 'Total Products',
    value: '9',
    change: '+2 this month',
    icon: Package,
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-500/10',
    textColor: 'text-blue-400',
  },
  {
    label: 'Total Enquiries',
    value: '24',
    change: '+5 this week',
    icon: MessageSquare,
    gradient: 'from-green-500 to-green-600',
    bgLight: 'bg-green-500/10',
    textColor: 'text-green-400',
  },
  {
    label: 'New Enquiries',
    value: '3',
    change: 'Needs attention',
    icon: Bell,
    gradient: 'from-saffron to-saffron-600',
    bgLight: 'bg-saffron/10',
    textColor: 'text-saffron',
  },
  {
    label: 'Categories',
    value: '9',
    change: 'All active',
    icon: Tags,
    gradient: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-500/10',
    textColor: 'text-purple-400',
  },
]

// Hardcoded recent enquiries
const recentEnquiries = [
  {
    id: '1',
    customer_name: 'Rajesh Patel',
    phone: '+91 98765 43210',
    product_name: 'Spicy Sev',
    message: 'I would like to order 5kg of Spicy Sev for a family function.',
    status: 'new' as const,
    created_at: '2026-06-04T10:30:00Z',
  },
  {
    id: '2',
    customer_name: 'Priya Sharma',
    phone: '+91 87654 32109',
    product_name: 'Bhavnagari Gathiya',
    message: 'Can you deliver to Ahmedabad? Need bulk order for Diwali.',
    status: 'contacted' as const,
    created_at: '2026-06-03T14:15:00Z',
  },
  {
    id: '3',
    customer_name: 'Amit Shah',
    phone: '+91 76543 21098',
    product_name: 'Mixture',
    message: 'What is the price for 10kg mixture order?',
    status: 'new' as const,
    created_at: '2026-06-03T09:45:00Z',
  },
  {
    id: '4',
    customer_name: 'Neha Desai',
    phone: '+91 65432 10987',
    product_name: 'Ratlami Sev',
    message: 'Do you have sugar-free options available?',
    status: 'resolved' as const,
    created_at: '2026-06-02T16:20:00Z',
  },
  {
    id: '5',
    customer_name: 'Vikram Joshi',
    phone: '+91 54321 09876',
    product_name: 'Chana Dal',
    message: 'Interested in wholesale partnership. Please call back.',
    status: 'new' as const,
    created_at: '2026-06-01T11:00:00Z',
  },
]

const statusColors: Record<string, string> = {
  new: 'bg-saffron/20 text-saffron border-saffron/30',
  contacted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-dark-800 rounded-xl" />
          ))}
        </div>
        <div className="h-96 bg-dark-800 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-dark-800 border-dark-700 hover:border-dark-600 transition-colors"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-dark-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className={`w-3 h-3 ${stat.textColor}`} />
                      <p className={`text-xs ${stat.textColor}`}>{stat.change}</p>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgLight}`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Enquiries Table */}
        <Card className="xl:col-span-2 bg-dark-800 border-dark-700">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-white text-lg">Recent Enquiries</CardTitle>
            <Link href="/admin/enquiries">
              <Button variant="ghost" size="sm" className="text-saffron hover:text-saffron hover:bg-saffron/10">
                View All
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-dark-700 hover:bg-transparent">
                  <TableHead className="text-dark-400">Customer</TableHead>
                  <TableHead className="text-dark-400">Product</TableHead>
                  <TableHead className="text-dark-400 hidden md:table-cell">Message</TableHead>
                  <TableHead className="text-dark-400">Status</TableHead>
                  <TableHead className="text-dark-400 hidden sm:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id} className="border-dark-700 hover:bg-dark-700/50">
                    <TableCell className="text-white font-medium">{enquiry.customer_name}</TableCell>
                    <TableCell className="text-dark-300">{enquiry.product_name}</TableCell>
                    <TableCell className="text-dark-400 hidden md:table-cell max-w-[200px]">
                      {truncate(enquiry.message, 40)}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[enquiry.status]}`}>
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-dark-400 text-xs hidden sm:table-cell">
                      {formatDate(enquiry.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-dark-800 border-dark-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/products" className="block">
              <Button className="w-full justify-start gap-3 h-12 gradient-saffron text-white border-0 hover:opacity-90 transition-opacity">
                <Plus className="w-5 h-5" />
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/enquiries" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 border-dark-600 text-dark-300 hover:text-white hover:bg-dark-700 hover:border-dark-500"
              >
                <MessageSquare className="w-5 h-5" />
                View Enquiries
                <Badge variant="secondary" className="ml-auto bg-saffron/20 text-saffron border-0 text-[10px]">
                  3 New
                </Badge>
              </Button>
            </Link>
            <Link href="/admin/categories" className="block">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 border-dark-600 text-dark-300 hover:text-white hover:bg-dark-700 hover:border-dark-500"
              >
                <Tags className="w-5 h-5" />
                Manage Categories
              </Button>
            </Link>

            {/* Summary Card */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-saffron/10 to-deep-red/10 border border-saffron/20">
              <h3 className="text-white font-semibold text-sm mb-2">Store Overview</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-dark-300">
                  <span>Active Products</span>
                  <span className="text-white font-medium">8 / 9</span>
                </div>
                <div className="flex justify-between text-dark-300">
                  <span>Featured Products</span>
                  <span className="text-white font-medium">4</span>
                </div>
                <div className="flex justify-between text-dark-300">
                  <span>Pending Enquiries</span>
                  <span className="text-saffron font-medium">3</span>
                </div>
                <div className="flex justify-between text-dark-300">
                  <span>Resolved This Week</span>
                  <span className="text-green-400 font-medium">7</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
