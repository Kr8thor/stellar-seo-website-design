/**
 * Bundle size monitoring and performance budget utilities
 */

interface BundleMetrics {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  fontSize: number;
  chunkCount: number;
}

interface PerformanceBudget {
  maxTotalSize: number; // in bytes
  maxJsSize: number;
  maxCssSize: number;
  maxImageSize: number;
  maxChunkCount: number;
}

// Default performance budget (based on best practices)
const DEFAULT_BUDGET: PerformanceBudget = {
  maxTotalSize: 1024 * 1024 * 2, // 2MB total
  maxJsSize: 1024 * 512, // 512KB JS
  maxCssSize: 1024 * 100, // 100KB CSS
  maxImageSize: 1024 * 1024, // 1MB images
  maxChunkCount: 10 // Max 10 chunks
};

/**
 * Analyze current bundle performance
 */
export const analyzeBundlePerformance = (): Promise<BundleMetrics> => {
  return new Promise((resolve) => {
    if (!('performance' in window) || !('getEntriesByType' in performance)) {
      resolve({
        totalSize: 0,
        jsSize: 0,
        cssSize: 0,
        imageSize: 0,
        fontSize: 0,
        chunkCount: 0
      });
      return;
    }

    // Get all resource entries
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;
    let fontSize = 0;
    let chunkCount = 0;

    resources.forEach((resource) => {
      const size = resource.transferSize || resource.decodedBodySize || 0;
      const url = resource.name;

      if (url.includes('.js')) {
        jsSize += size;
        if (url.includes('chunk') || url.includes('vendor')) {
          chunkCount++;
        }
      } else if (url.includes('.css')) {
        cssSize += size;
      } else if (/\.(png|jpg|jpeg|gif|svg|webp|avif)/.test(url)) {
        imageSize += size;
      } else if (/\.(woff|woff2|ttf|otf)/.test(url)) {
        fontSize += size;
      }
    });

    const totalSize = jsSize + cssSize + imageSize + fontSize;

    resolve({
      totalSize,
      jsSize,
      cssSize,
      imageSize,
      fontSize,
      chunkCount
    });
  });
};

/**
 * Check if bundle meets performance budget
 */
export const checkPerformanceBudget = async (budget: PerformanceBudget = DEFAULT_BUDGET): Promise<{
  withinBudget: boolean;
  violations: string[];
  metrics: BundleMetrics;
}> => {
  const metrics = await analyzeBundlePerformance();
  const violations: string[] = [];

  if (metrics.totalSize > budget.maxTotalSize) {
    violations.push(`Total bundle size (${formatBytes(metrics.totalSize)}) exceeds budget (${formatBytes(budget.maxTotalSize)})`);
  }

  if (metrics.jsSize > budget.maxJsSize) {
    violations.push(`JavaScript size (${formatBytes(metrics.jsSize)}) exceeds budget (${formatBytes(budget.maxJsSize)})`);
  }

  if (metrics.cssSize > budget.maxCssSize) {
    violations.push(`CSS size (${formatBytes(metrics.cssSize)}) exceeds budget (${formatBytes(budget.maxCssSize)})`);
  }

  if (metrics.imageSize > budget.maxImageSize) {
    violations.push(`Image size (${formatBytes(metrics.imageSize)}) exceeds budget (${formatBytes(budget.maxImageSize)})`);
  }

  if (metrics.chunkCount > budget.maxChunkCount) {
    violations.push(`Chunk count (${metrics.chunkCount}) exceeds budget (${budget.maxChunkCount})`);
  }

  return {
    withinBudget: violations.length === 0,
    violations,
    metrics
  };
};

/**
 * Monitor bundle size and report violations
 */
export const monitorBundleSize = (budget?: PerformanceBudget) => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', async () => {
    // Wait a bit for all resources to load
    setTimeout(async () => {
      const result = await checkPerformanceBudget(budget);
      
      if (process.env.NODE_ENV === 'development') {
        console.group('📦 Bundle Performance Analysis');
        console.log('Metrics:', result.metrics);
        console.log('Within Budget:', result.withinBudget);
        if (result.violations.length > 0) {
          console.warn('Budget Violations:', result.violations);
        }
        console.groupEnd();
      }

      // In production, send to analytics
      if (process.env.NODE_ENV === 'production' && typeof gtag !== 'undefined') {
        gtag('event', 'bundle_analysis', {
          bundle_size: result.metrics.totalSize,
          js_size: result.metrics.jsSize,
          css_size: result.metrics.cssSize,
          within_budget: result.withinBudget,
          violations_count: result.violations.length
        });
      }

      // If violations exist, warn in development
      if (result.violations.length > 0 && process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Performance Budget Violations Detected!');
        result.violations.forEach(violation => console.warn(`- ${violation}`));
      }
    }, 2000);
  });
};

/**
 * Format bytes to human readable format
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Get bundle recommendations based on analysis
 */
export const getBundleRecommendations = async (): Promise<string[]> => {
  const metrics = await analyzeBundlePerformance();
  const recommendations: string[] = [];

  if (metrics.jsSize > 512 * 1024) {
    recommendations.push('Consider implementing more aggressive code splitting');
    recommendations.push('Review and remove unused dependencies');
  }

  if (metrics.cssSize > 100 * 1024) {
    recommendations.push('Consider using CSS-in-JS or purging unused CSS');
  }

  if (metrics.imageSize > 1024 * 1024) {
    recommendations.push('Optimize images: convert to WebP/AVIF format');
    recommendations.push('Implement proper image lazy loading');
  }

  if (metrics.chunkCount > 10) {
    recommendations.push('Consider consolidating smaller chunks');
  }

  if (metrics.totalSize > 2 * 1024 * 1024) {
    recommendations.push('Overall bundle size is large - consider performance audit');
  }

  return recommendations;
};