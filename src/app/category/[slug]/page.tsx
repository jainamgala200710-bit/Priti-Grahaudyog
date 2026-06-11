'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CategoryRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      router.replace(`/?category=${slug}`);
    } else {
      router.replace('/');
    }
  }, [router, slug]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-saffron mb-4"></div>
      <p className="text-muted-foreground text-sm">Loading delicacies...</p>
    </div>
  );
}
