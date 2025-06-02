
import React from 'react';
import { useWordPress } from '@/providers/WordPressProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const CMSStatus = ({ showDetails = false }) => {
  const { 
    isConnected, 
    usingCMS, 
    error, 
    loading, 
    totalPosts,
    refreshData 
  } = useWordPress();

  if (!showDetails && isConnected) {
    return null; // Don't show anything if connected and details not requested
  }

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="flex items-center gap-2">
        {isConnected ? (
          <>
            <CheckCircle className="h-5 w-5 text-green-500" />
            <Badge variant="default" className="bg-green-100 text-green-800">
              CMS Connected
            </Badge>
            <span className="text-sm text-muted-foreground">
              {totalPosts} posts loaded from cms.mardenseo.com
            </span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              Using Fallback Data
            </Badge>
          </>
        )}
        
        {loading && (
          <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Error Details */}
      {error && showDetails && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>Unable to connect to cms.mardenseo.com. Using cached/fallback content.</p>
              {error.message && (
                <p className="text-sm text-muted-foreground">
                  Error: {error.message}
                </p>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                className="mt-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Connection Details for Admins */}
      {showDetails && isConnected && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">CMS Connection Active</p>
              <p className="text-sm text-muted-foreground">
                Successfully connected to cms.mardenseo.com GraphQL endpoint
              </p>
              <p className="text-sm text-muted-foreground">
                Loaded {totalPosts} posts with real-time updates
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CMSStatus;
