'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
        toast.error('Login failed', { description: error.message })
      } else {
        toast.success('Welcome back!', { description: 'Redirecting to dashboard...' })
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-deep-red/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-saffron/3 blur-[100px]" />
      </div>

      <Card className="w-full max-w-md mx-4 border-dark-700 bg-dark-800/80 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4 pb-2">
          {/* Brand Logo */}
          <div className="mx-auto w-16 h-16 rounded-2xl gradient-saffron flex items-center justify-center shadow-lg shadow-saffron/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-[family-name:var(--font-heading)] text-white">
              Priti&apos;s Gruh Udyog
            </CardTitle>
            <CardDescription className="text-dark-400 mt-1">
              Admin Dashboard — Sign in to manage your store
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-dark-300 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@pritigruhudyog.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-dark-900/50 border-dark-600 text-white placeholder:text-dark-500 focus:border-saffron focus:ring-saffron/20 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-dark-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark-900/50 border-dark-600 text-white placeholder:text-dark-500 focus:border-saffron focus:ring-saffron/20 h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 gradient-saffron text-white font-semibold hover:opacity-90 transition-opacity border-0"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <p className="text-center text-dark-500 text-xs mt-6">
            Protected admin area. Unauthorized access is prohibited.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
