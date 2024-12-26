'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TextSelection, CaseSensitive, Regex } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  jurisdiction: string
  path: string
  matches: number
  content: {
    line: number
    text: string
  }[]
}

export default function SearchInterface() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])

  // Simulate fast search results
  useEffect(() => {
    if (query.length > 0) {
      // This would be replaced with actual API call
      const mockResults: SearchResult[] = [
        {
          jurisdiction: 'United States',
          path: 'supreme-court/civil-rights/brown-v-board.cc',
          matches: 100,
          content: [
            { line: 55, text: 'Equal Protection Clause of the Fourteenth Amendment...' },
            { line: 56, text: 'separate educational facilities are inherently unequal' }
          ]
        },
        {
          jurisdiction: 'European Union',
          path: 'eu-court-justice/data-protection/schrems-v-facebook.js',
          matches: 100,
          content: [
            { line: 63, text: 'Transfer of personal data to third countries...' },
            { line: 64, text: 'Adequacy of protection provided by Safe Harbor principles' }
          ]
        }
      ]
      setResults(mockResults)
    } else {
      setResults([])
    }
  }, [query])

  const caseTypes = [
    { name: 'Criminal Law', count: '3M' },
    { name: 'Civil Litigation', count: '500k' },
    { name: 'Corporate Law', count: '500k' },
    { name: 'Family Law', count: '400k' },
    { name: 'Immigration', count: '400k' },
    { name: 'Property Law', count: '400k' },
    { name: 'Employment Law', count: '300k' },
    { name: 'IP Law', count: '300k' }
  ]

  const jurisdictions = [
    { name: 'United States', count: '2M' },
    { name: 'European Union', count: '1M' },
    { name: 'United Kingdom', count: '1M' },
    { name: 'Canada', count: '1M' },
    { name: 'Australia', count: '1M' },
    { name: 'India', count: '1M' },
    { name: 'China', count: '1M' }
  ]

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-background p-4 flex flex-col gap-6">
        {/* Case Type Filter */}
        <div>
          <h2 className="font-semibold mb-2">Case Type</h2>
          <Input 
            placeholder="Filter types..." 
            className="mb-2"
          />
          <ScrollArea className="h-[200px]">
            {caseTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`flex justify-between items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm ${
                  selectedType === type.name ? 'bg-accent' : ''
                }`}
              >
                <span>{type.name}</span>
                <span className="text-muted-foreground">{type.count}</span>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Jurisdiction Filter */}
        <div>
          <h2 className="font-semibold mb-2">Jurisdiction</h2>
          <Input 
            placeholder="Filter jurisdictions..." 
            className="mb-2"
          />
          <ScrollArea className="h-[200px]">
            {jurisdictions.map((jurisdiction) => (
              <button
                key={jurisdiction.name}
                onClick={() => setSelectedJurisdiction(jurisdiction.name)}
                className={`flex justify-between items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm ${
                  selectedJurisdiction === jurisdiction.name ? 'bg-accent' : ''
                }`}
              >
                <span>{jurisdiction.name}</span>
                <span className="text-muted-foreground">{jurisdiction.count}</span>
              </button>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Header */}
        <div className="border-b p-4">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search legal cases..."
              className="pr-24"
            />
            <div className="absolute right-2 top-2 flex gap-1">
              <Button variant="ghost" size="icon">
                <TextSelection className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <CaseSensitive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Regex className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-auto p-4">
          {query && (
            <div className="text-sm text-muted-foreground mb-4">
              {results.length > 0 ? `${results.length.toLocaleString()} results found` : 'No results found'}
            </div>
          )}
          
          {results.map((result, i) => (
            <div key={i} className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500">{result.jurisdiction}</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-mono text-sm">{result.path}</span>
                <Badge variant="secondary" className="ml-auto">
                  {result.matches}+ matches
                </Badge>
              </div>
              
              {result.content.map((line, j) => (
                <div key={j} className="font-mono text-sm mb-1">
                  <span className="text-muted-foreground mr-4">{line.line}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

