import React, { createContext, useContext, ReactNode } from 'react';
import { ClarityAnalytics } from '@/components/Analytics/ClarityAnalytics';
import { GA4Enhanced } from '@/components/Analytics/GA4Enhanced';

interface AnalyticsContextType {
  isEnabled: boolean;
  clarityId?: string;
  gaId?: string;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  isEnabled: true,
  clarityId: import.meta.env.VITE_CLARITY_ID,
  gaId: import.meta.env.VITE_GA_ID
});

interface AnalyticsProviderProps {
  children: ReactNode;
  clarityId?: string;
  gaId?: string;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  clarityId = import.meta.env.VITE_CLARITY_ID,
  gaId = import.meta.env.VITE_GA_ID
}) => {
  const isEnabled = !!(clarityId || gaId);

  return (
    <AnalyticsContext.Provider value={{ isEnabled, clarityId, gaId }}>
      {isEnabled && (
        <>
          {clarityId && <ClarityAnalytics />}
          {gaId && <GA4Enhanced />}
        </>
      )}
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => useContext(AnalyticsContext);
