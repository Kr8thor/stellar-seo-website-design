import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Blog post skeleton loader
export const BlogPostSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-6">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </CardContent>
  </Card>
);

// Service card skeleton loader
export const ServiceCardSkeleton = () => (
  <Card className="p-6">
    <div className="flex items-center mb-4">
      <Skeleton className="h-12 w-12 rounded-full mr-4" />
      <Skeleton className="h-6 w-32" />
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-4" />
    <Skeleton className="h-10 w-24" />
  </Card>
);

// Portfolio item skeleton loader
export const PortfolioItemSkeleton = () => (
  <div className="group cursor-pointer">
    <div className="overflow-hidden rounded-lg">
      <Skeleton className="h-64 w-full" />
    </div>
    <div className="mt-4">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

// Page header skeleton loader
export const PageHeaderSkeleton = () => (
  <div className="text-center mb-12">
    <Skeleton className="h-12 w-96 mx-auto mb-4" />
    <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
    <Skeleton className="h-6 w-1/2 mx-auto" />
  </div>
);

// Navigation skeleton loader
export const NavigationSkeleton = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md shadow-sm">
    <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-6 w-32" />
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </nav>
      <Skeleton className="h-10 w-10 md:hidden" />
    </div>
  </header>
);

// Table skeleton loader
export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-4 gap-4 p-4 border-b">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 w-full" />
        ))}
      </div>
    ))}
  </div>
);

// Generic content skeleton loader
export const ContentSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="space-y-2 mt-6">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

// Loading spinner with text
export const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
    <p className="text-muted-foreground">{text}</p>
  </div>
);

// Full page loading skeleton
export const FullPageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <NavigationSkeleton />
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <PageHeaderSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);