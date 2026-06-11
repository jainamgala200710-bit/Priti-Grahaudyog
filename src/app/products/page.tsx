'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';

// Redirect legacy /products page to homepage category selection
export default function ProductsPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = `Our Products | ${BUSINESS.name}`;
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to categories...</p>
    </div>
  );
}
