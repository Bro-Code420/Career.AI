'use client'

import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  X,
  ChevronRight,
  User,
  Building2,
  Sparkles
} from 'lucide-react'

export default function ComparisonPage() {
  const currentAnalysis = useQuery(api.analysis.getLatestAnalysis)
  const jobRole = useQuery(api.onboarding.getJobRole)
  const userSkillsData = useQuery(api.onboarding.getUserSkills)

  if (currentAnalysis === undefined || jobRole === undefined || userSkillsData === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading comparison...</p>
        </div>
      </div>
    )
  }

  if (!currentAnalysis || !jobRole || !userSkillsData) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Analysis Data</h2>
        <p className="text-muted-foreground mb-8">
          Please complete your analysis to see how you compare to industry standards.
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

  const userSkills = userSkillsData.skills
  const allRequiredSkills = [...(jobRole.coreSkills || []), ...(jobRole.bonusSkills || [])]

  // Create comparison data
  const comparisonData = allRequiredSkills.map(skill => {
    const userHas = userSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    const isCore = jobRole.coreSkills?.includes(skill)
    return {
      skill,
      userHas,
      industryRequired: true,
      isCore,
    }
  })

  // Add user skills that are not in required skills
  userSkills.forEach(skill => {
    if (!allRequiredSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      comparisonData.push({
        skill,
        userHas: true,
        industryRequired: false,
        isCore: false,
      })
    }
  })

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">You vs Industry Skill Comparison</h1>
        <p className="text-muted-foreground mt-1">
          See how your skills stack up against industry requirements
        </p>
      </div>

      {/* Legend */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success/20 border border-success" />
              <span className="text-muted-foreground">You have this skill</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive" />
              <span className="text-muted-foreground">Missing skill</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Core</Badge>
              <span className="text-muted-foreground">Required for role</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Bonus</Badge>
              <span className="text-muted-foreground">Nice to have</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Skill Comparison</CardTitle>
          <CardDescription>
            Comparing your skills against {currentAnalysis.roleSnapshot.title} requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Skill</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      You
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Industry
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Type</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr
                    key={item.skill}
                    className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-muted/20' : ''
                      }`}
                  >
                    <td className="py-3 px-4">
                      <span className={`font-medium ${item.userHas ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                        {item.skill}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.userHas ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/20">
                          <Check className="w-4 h-4 text-success" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.industryRequired ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Optional</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.isCore ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Core
                        </Badge>
                      ) : item.industryRequired ? (
                        <Badge variant="outline">Bonus</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Extra</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success mb-1">
              {currentAnalysis.matchedSkills.length}
            </div>
            <p className="text-sm text-muted-foreground">Skills Matched</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-destructive mb-1">
              {currentAnalysis.missingSkills.length}
            </div>
            <p className="text-sm text-muted-foreground">Skills Missing</p>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {currentAnalysis.readinessScore}%
            </div>
            <p className="text-sm text-muted-foreground">Match Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
        <Link href="/dashboard/explain">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            See Score Breakdown
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
