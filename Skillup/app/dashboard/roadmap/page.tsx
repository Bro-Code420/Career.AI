'use client'

import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Route,
  ChevronRight,
  Calendar,
  BookOpen,
  Play,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react'

export default function RoadmapPage() {
  const currentAnalysis = useQuery(api.analysis.getLatestAnalysis)
  const roadmapData = useQuery(api.roadmap.getLatestRoadmap)

  if (currentAnalysis === undefined || roadmapData === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading your roadmap...</p>
        </div>
      </div>
    )
  }

  if (!currentAnalysis || !roadmapData) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Roadmap Found</h2>
        <p className="text-muted-foreground mb-8">
          Complete your analysis first to generate a personalized 30-day learning path.
        </p>
        <Link href="/onboarding/role">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Start Analysis
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    )
  }

  const roadmap = roadmapData.weeks

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Route className="w-8 h-8 text-primary" />
          30-Day Learning Roadmap
        </h1>
        <p className="text-muted-foreground mt-1">
          Your personalized path to becoming {currentAnalysis.roleSnapshot.title}
        </p>
      </div>

      {/* Overview */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{roadmap.length}</div>
              <p className="text-sm text-muted-foreground">Weeks</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {currentAnalysis.missingSkills.length}
              </div>
              <p className="text-sm text-muted-foreground">Skills to Learn</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {roadmap.reduce((sum, w) => sum + w.courses.length, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Courses</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {roadmap.reduce((sum, w) => sum + (w.youtubePlaylists?.length || 0), 0)}
              </div>
              <p className="text-sm text-muted-foreground">Video Playlists</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Tabs */}
      <Tabs defaultValue="week-1">
        <TabsList className="grid w-full grid-cols-4">
          {roadmap.map((week) => (
            <TabsTrigger key={week.weekNumber} value={`week-${week.weekNumber}`}>
              Week {week.weekNumber}
            </TabsTrigger>
          ))}
        </TabsList>

        {roadmap.map((week) => (
          <TabsContent key={week.weekNumber} value={`week-${week.weekNumber}`} className="mt-6 space-y-6">
            {/* Week Header */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Week {week.weekNumber}: {week.focusSkill}</CardTitle>
                    <CardDescription>
                      Days {(week.weekNumber - 1) * 7 + 1} - {week.weekNumber * 7}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Courses */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {week.courses.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Review materials from previous weeks
                  </p>
                ) : (
                  <div className="space-y-3">
                    {week.courses.map((course, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.platform}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={course.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Play className="w-5 h-5 text-destructive" />
                  YouTube Playlists
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!week.youtubePlaylists || week.youtubePlaylists.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Practice with projects and exercises
                  </p>
                ) : (
                  <div className="space-y-3">
                    {week.youtubePlaylists.map((playlist, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <Play className="w-6 h-6 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">{playlist.title}</h4>
                          <p className="text-sm text-muted-foreground">{playlist.channel}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {playlist.videos} videos
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Timeline Overview */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">30-Day Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {roadmap.map((week, index) => (
                <div key={week.weekNumber} className="relative pl-10">
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${index === 0 ? 'bg-primary border-primary' : 'bg-background border-border'
                    }`} />
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Week {week.weekNumber}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Days {(week.weekNumber - 1) * 7 + 1}-{week.weekNumber * 7}
                      </span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">{week.focusSkill}</h4>
                    <p className="text-sm text-muted-foreground">
                      {week.focusSkill !== 'Review & Practice'
                        ? `Deep dive into ${week.focusSkill} and related ecosystems.`
                        : 'Consolidate your knowledge and build a portfolio project.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/dashboard/gaps">
          <Button variant="outline">Back to Skill Gaps</Button>
        </Link>
        <Link href="/dashboard">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Back to Overview
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
