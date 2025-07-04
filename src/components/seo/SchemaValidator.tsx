/**
 * Schema Validation and Testing Component
 * Helps validate structured data implementation across the site
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Copy, ExternalLink } from 'lucide-react';

interface SchemaValidationResult {
  type: string;
  valid: boolean;
  errors?: string[];
  warnings?: string[];
  data?: any;
}

const SchemaValidator: React.FC = () => {
  const [validationResults, setValidationResults] = useState<SchemaValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const validatePageSchemas = () => {
    setIsValidating(true);
    const results: SchemaValidationResult[] = [];

    // Find all JSON-LD scripts on the page
    const scriptTags = document.querySelectorAll('script[type="application/ld+json"]');
    
    scriptTags.forEach((script, index) => {
      try {
        const jsonData = JSON.parse(script.textContent || '{}');
        const schemaType = jsonData['@type'] || 'Unknown';
        
        // Basic validation
        const isValid = validateSchema(jsonData);
        
        results.push({
          type: schemaType,
          valid: isValid.valid,
          errors: isValid.errors,
          warnings: isValid.warnings,
          data: jsonData
        });
      } catch (error) {
        results.push({
          type: 'Invalid JSON',
          valid: false,
          errors: [`Script ${index + 1}: ${error.message}`]
        });
      }
    });

    setValidationResults(results);
    setIsValidating(false);
  };

  const validateSchema = (schema: any): { valid: boolean; errors: string[]; warnings: string[] } => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required fields
    if (!schema['@context']) {
      errors.push('Missing @context property');
    }
    if (!schema['@type']) {
      errors.push('Missing @type property');
    }

    // Type-specific validation
    switch (schema['@type']) {
      case 'Organization':
        if (!schema.name) errors.push('Organization missing name');
        if (!schema.url) errors.push('Organization missing url');
        if (!schema.description) warnings.push('Organization missing description');
        break;
        
      case 'Service':
        if (!schema.name) errors.push('Service missing name');
        if (!schema.provider) errors.push('Service missing provider');
        if (!schema.description) warnings.push('Service missing description');
        break;
        
      case 'Article':
        if (!schema.headline) errors.push('Article missing headline');
        if (!schema.author) errors.push('Article missing author');
        if (!schema.datePublished) errors.push('Article missing datePublished');
        break;
        
      case 'FAQPage':
        if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
          errors.push('FAQPage missing mainEntity array');
        } else if (schema.mainEntity.length === 0) {
          warnings.push('FAQPage has no questions');
        }
        break;
        
      case 'HowTo':
        if (!schema.name) errors.push('HowTo missing name');
        if (!schema.step || !Array.isArray(schema.step)) {
          errors.push('HowTo missing step array');
        }
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };

  const copySchemaToClipboard = (schema: any) => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
  };

  const testInGoogleTool = (schema: any) => {
    const encodedSchema = encodeURIComponent(JSON.stringify(schema, null, 2));
    window.open(`https://search.google.com/test/rich-results?code=${encodedSchema}`, '_blank');
  };

  useEffect(() => {
    // Auto-validate on component mount
    validatePageSchemas();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Schema Markup Validator
            </CardTitle>
            <Button 
              onClick={validatePageSchemas}
              disabled={isValidating}
              size="sm"
            >
              {isValidating ? 'Validating...' : 'Re-validate'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            This tool validates the structured data (schema markup) on the current page.
            Found {validationResults.length} schema objects.
          </div>
          
          <div className="space-y-4">
            {validationResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">{result.type}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copySchemaToClipboard(result.data)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testInGoogleTool(result.data)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Test
                    </Button>
                  </div>
                </div>
                
                {result.errors && result.errors.length > 0 && (
                  <div className="text-red-600 text-sm mb-2">
                    <strong>Errors:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {result.errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.warnings && result.warnings.length > 0 && (
                  <div className="text-yellow-600 text-sm">
                    <strong>Warnings:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {result.warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.valid && (!result.warnings || result.warnings.length === 0) && (
                  <div className="text-green-600 text-sm">
                    ✅ Schema is valid and complete
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {validationResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No structured data found on this page.
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Schema Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open('https://search.google.com/test/rich-results', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Google Rich Results Test
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open('https://validator.schema.org/', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Schema.org Validator
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open('https://search.google.com/search-console', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Google Search Console
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open('https://developers.google.com/search/docs/appearance/structured-data', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Google Schema Docs
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <strong>Testing Recommendations:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Test each page individually with Google's Rich Results Test</li>
              <li>Check Google Search Console for structured data errors</li>
              <li>Monitor search results for rich snippet appearances</li>
              <li>Validate schema changes after updates</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemaValidator;