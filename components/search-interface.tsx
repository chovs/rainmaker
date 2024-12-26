'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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

interface SearchInterfaceProps {
  initialQuery?: string
}

export default function SearchInterface({ initialQuery = '' }: SearchInterfaceProps) {
  const [query, setQuery] = useState(initialQuery)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchTime, setSearchTime] = useState<number | null>(null)

  const searchCases = useCallback((searchQuery: string) => {
    const startTime = performance.now()
    
    // Simulate instant search with mock data
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
    ].filter(result => 
      result.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.content.some(line => line.text.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    setResults(mockResults)
    setSearchTime(performance.now() - startTime)
  }, [])

  // Perform search on mount if initial query exists
  useEffect(() => {
    if (initialQuery) {
      searchCases(initialQuery)
    }
  }, [initialQuery, searchCases])

  // Perform search on query change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.length > 0) {
        searchCases(query)
      } else {
        setResults([])
        setSearchTime(null)
      }
    }, 10) // Very short debounce for instant feel

    return () => clearTimeout(debounceTimer)
  }, [query, searchCases])

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
    <div className="flex h-full">
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
              autoFocus
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button className="p-1 hover:bg-accent rounded-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
                  <path d="M8 2H12M8 8H14M8 14H10M4 2V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-1 hover:bg-accent rounded-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
                  <path d="M11 2V7M11 14V11M11 11V7M11 11H14M11 7H14M2 9V14M2 2V5M2 5V9M2 5H5M2 9H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-1 hover:bg-accent rounded-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
                  <path d="M13 3L8 13L3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-auto p-4">
          {query && (
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
              <span>{results.length > 0 ? `${results.length.toLocaleString()} results found` : 'No results found'}</span>
              {searchTime !== null && (
                <span className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-yellow-500">
                    <path d="M13 3L8 13L3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Search completed in {searchTime.toFixed(2)} ms
                </span>
              )}
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

