'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  Tags,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface AdminSidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
]

export function AdminSidebar({ collapsed, onCollapse }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'h-screen bg-dark-900 border-r border-dark-700 flex flex-col transition-all duration-300 relative',
        collapsed ? 'w-[68px]' : 'w-[250px]'
      )}
    >
      {/* Brand Header */}
      <div className={cn(
        'h-16 flex items-center border-b border-dark-700 px-4',
        collapsed ? 'justify-center' : 'gap-3'
      )}>
        <div className="w-9 h-9 rounded-lg gradient-saffron flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">PG</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white font-semibold text-sm truncate leading-tight">
              Priti&apos;s Gruh Udyog
            </h1>
            <p className="text-dark-500 text-[10px] truncate leading-tight">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-dark-700 border border-dark-600 rounded-full flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-600 transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative',
                collapsed && 'justify-center px-2',
                active
                  ? 'bg-saffron/10 text-saffron'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800'
              )}
              title={collapsed ? item.label : undefined}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-saffron rounded-r-full" />
              )}
              <Icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-dark-700">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            'w-full text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors',
            collapsed ? 'justify-center px-2' : 'justify-start gap-3 px-3'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
