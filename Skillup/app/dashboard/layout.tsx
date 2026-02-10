'use client'

import React from "react"
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sparkles,
  LayoutDashboard,
  GitCompare,
  Brain,
  Target,
  Route,
  History,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/comparison', label: 'You vs Industry', icon: GitCompare },
  { href: '/dashboard/explain', label: 'Why This Score?', icon: Brain },
  { href: '/dashboard/gaps', label: 'Skill Gaps', icon: Target },
  { href: '/dashboard/roadmap', label: '30-Day Roadmap', icon: Route },
  { href: '/dashboard/history', label: 'Analysis History', icon: History },
  { href: '/dashboard/summary', label: 'Summary', icon: FileText },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const currentAnalysis = useQuery(api.analysis.getLatestAnalysis)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login')
    }
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-sidebar-primary" />
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">CareerAI</span>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent overflow-hidden">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.fullName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm font-medium text-sidebar-foreground">
                      {user.firstName?.[0] || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.fullName || user.primaryEmailAddress?.emailAddress || 'User'}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {currentAnalysis === undefined ? (
                    'Loading...'
                  ) : currentAnalysis ? (
                    currentAnalysis.roleSnapshot.title
                  ) : (
                    'Not analyzed'
                  )}
                </p>
              </div>
            </div>
            <SignOutButton redirectUrl="/">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
