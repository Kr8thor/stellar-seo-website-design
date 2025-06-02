/**
 * Security monitoring and logging utilities
 */

interface SecurityEvent {
  type: 'form_submission' | 'rate_limit' | 'validation_error' | 'auth_attempt' | 'security_violation';
  details: string;
  timestamp: number;
  userAgent?: string;
  ip?: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private maxEvents = 100; // Keep last 100 events

  /**
   * Log a security event
   */
  logEvent(type: SecurityEvent['type'], details: string, metadata?: Partial<SecurityEvent>): void {
    const event: SecurityEvent = {
      type,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ...metadata
    };

    this.events.push(event);
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console for monitoring
    console.log(`[SECURITY] ${type}: ${details}`, event);

    // In production, you might send this to a monitoring service
    this.sendToMonitoringService(event);
  }

  /**
   * Log form submission attempt
   */
  logFormSubmission(formType: string, success: boolean, errorDetails?: string): void {
    this.logEvent(
      'form_submission',
      `${formType} form ${success ? 'successful' : 'failed'}${errorDetails ? `: ${errorDetails}` : ''}`
    );
  }

  /**
   * Log rate limit violation
   */
  logRateLimit(action: string, limit: number): void {
    this.logEvent('rate_limit', `Rate limit exceeded for ${action} (limit: ${limit})`);
  }

  /**
   * Log validation error
   */
  logValidationError(field: string, error: string): void {
    this.logEvent('validation_error', `Validation failed for ${field}: ${error}`);
  }

  /**
   * Get recent security events
   */
  getRecentEvents(): SecurityEvent[] {
    return [...this.events].reverse(); // Most recent first
  }

  /**
   * Clear all events
   */
  clearEvents(): void {
    this.events = [];
  }

  /**
   * Send event to monitoring service (placeholder)
   */
  private sendToMonitoringService(event: SecurityEvent): void {
    // In production, implement actual monitoring service integration
    // For now, just store in sessionStorage for debugging
    try {
      const stored = sessionStorage.getItem('security_events') || '[]';
      const events = JSON.parse(stored);
      events.push(event);
      
      // Keep only last 50 events in sessionStorage
      const recentEvents = events.slice(-50);
      sessionStorage.setItem('security_events', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Failed to store security event:', error);
    }
  }
}

export const securityMonitor = new SecurityMonitor();
