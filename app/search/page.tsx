import { Suspense } from 'react'
import SearchPage from './search-page'
import { Scale } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-14 items-center px-4 justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-6 w-6" />
            <span className="font-semibold">rainmaker</span>
          </Link>
          <Link 
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Suspense fallback={<SearchLoading />}>
          <SearchPage />
        </Suspense>
      </main>
    </div>
  )
}

function SearchLoading() {
  return (
    <div className="flex h-full">
      <div className="w-64 border-r bg-background p-4">
        <div className="h-full animate-pulse space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded"></div>
          <div className="h-[200px] bg-muted rounded"></div>
          <div className="h-8 w-3/4 bg-muted rounded"></div>
          <div className="h-[200px] bg-muted rounded"></div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="h-10 w-full bg-muted rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  )
}

