'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { LogOut, Menu, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoginPage) {
        setLoading(false)
        setAuthenticated(false)
        return
      }

      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/admin/login')
          return
        }

        setAuthenticated(true)
      } catch {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router, isLoginPage])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    router.push('/admin/login')
    router.refresh()
  }

  // Login page: render without admin shell
  if (isLoginPage) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-dark-900 antialiased">
          <Toaster position="top-right" richColors />
          {children}
        </body>
      </html>
    )
  }

  // Loading state
  if (loading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-dark-900 antialiased">
          <div className="min-h-screen flex items-center justify-center bg-dark-900">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-saffron" />
              <p className="text-dark-400 text-sm">Loading admin panel...</p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  if (!authenticated) {
    return null
  }

  // Page title from pathname
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard'
    if (pathname.startsWith('/admin/products')) return 'Products'
    if (pathname.startsWith('/admin/categories')) return 'Categories'
    if (pathname.startsWith('/admin/enquiries')) return 'Enquiries'
    return 'Admin'
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <Toaster position="top-right" richColors />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[250px] bg-dark-900 border-dark-700">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <AdminSidebar collapsed={false} onCollapse={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-dark-800/50 border-b border-dark-700 flex items-center justify-between px-4 lg:px-6 shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-dark-400 hover:text-white"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white font-semibold text-lg">
                {getPageTitle()}
              </h1>
              <p className="text-dark-500 text-xs hidden sm:block">
                Priti&apos;s Gruh Udyog — Admin Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-dark-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-dark-400 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
