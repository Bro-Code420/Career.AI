"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  Target,
  BarChart3,
  Route,
  Sparkles,
  ChevronRight,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Authenticated>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            </Authenticated>
            <Unauthenticated>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            </Unauthenticated>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Career Analysis</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Discover Your <span className="text-primary">Career Readiness</span> with AI
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Analyze your skills against any job role, identify gaps, and get a personalized
              30-day learning roadmap to land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { value: '50+', label: 'Job Roles' },
              { value: '200+', label: 'Skills Tracked' },
              { value: '30-Day', label: 'Roadmaps' },
              { value: '100%', label: 'Free to Use' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Level Up
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your skills, compares them to industry standards,
              and creates a personalized path to career success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: 'Skill Gap Analysis',
                description: 'Identify exactly which skills you need to develop for your target role.',
              },
              {
                icon: BarChart3,
                title: 'Readiness Score',
                description: 'Get a clear score showing how ready you are for your dream job.',
              },
              {
                icon: Route,
                title: '30-Day Roadmap',
                description: 'Follow a personalized learning path with curated courses and resources.',
              },
              {
                icon: Zap,
                title: 'Instant Analysis',
                description: 'Get your results in seconds with our fast AI-powered analysis.',
              },
              {
                icon: Shield,
                title: 'Industry Standards',
                description: 'Compare your skills against real industry requirements.',
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor your improvement with analysis history and insights.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get from skill assessment to personalized roadmap in just 4 simple steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Select Your Target Role',
                description: 'Choose your desired job domain and experience level (intern, junior, mid, or senior).',
              },
              {
                step: '02',
                title: 'Input Your Skills',
                description: 'Tell us about your current skills and experience. Upload a resume or select from our skill library.',
              },
              {
                step: '03',
                title: 'Get AI Analysis',
                description: 'Our AI compares your skills against industry requirements and calculates your readiness score.',
              },
              {
                step: '04',
                title: 'Follow Your Roadmap',
                description: 'Receive a personalized 30-day learning plan with courses and YouTube tutorials.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <span className="text-primary font-bold">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="w-0.5 h-16 bg-border mx-auto mt-2" />
                  )}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of professionals who have used CareerAI to identify
              their skill gaps and create a clear path to success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Analysis
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">CareerAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI Career Readiness Analyzer - Built with Next.js and shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
