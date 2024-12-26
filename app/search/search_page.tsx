'use client'

import { useSearchParams } from 'next/navigation'
import SearchInterface from '@/components/search-interface'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  return <SearchInterface initialQuery={initialQuery} />
}

