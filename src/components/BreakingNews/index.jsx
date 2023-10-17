'use client'

import { useQueryClient } from '@tanstack/react-query';

export default function BreakingNews() {
  const queryClient = useQueryClient();
  const pagesConfig = queryClient.getQueryData(['pages_config']);

  if (!pagesConfig) return <div>Breaking News is not ready</div>
  
  return (
    <div>
      Breaking News Container is Ready
    </div>
  )
}