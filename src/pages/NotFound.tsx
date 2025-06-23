
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSEO, seoConfigs } from '@/hooks/useSEO';

const NotFound = () => {
  // Add SEO for this page (with noIndex)
  useSEO(seoConfigs.notFound);
  
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-6xl mb-6">404</h1>
        <p className="text-2xl font-medium mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Homepage
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
