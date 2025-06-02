
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// Input sanitization function to prevent XSS
function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags and decode HTML entities
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim();
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting check (simple in-memory store for demo)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per window
  
  const userRecord = rateLimitStore.get(ip);
  
  if (!userRecord || now > userRecord.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userRecord.count >= maxRequests) {
    return false;
  }
  
  userRecord.count++;
  return true;
}

serve(async (req) => {
  // Security headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'",
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate request method
    if (req.method !== 'POST') {
      console.log(`Invalid method: ${req.method}`);
      return new Response(
        JSON.stringify({ 
          error: 'Method not allowed',
          code: 'METHOD_NOT_ALLOWED'
        }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if RESEND_API_KEY is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Email service not configured',
          code: 'SERVICE_UNAVAILABLE'
        }),
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json()
    } catch (error) {
      console.log('Invalid JSON in request body:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request body',
          code: 'INVALID_JSON'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { name, email, message } = body

    // Input validation with detailed logging
    const validationErrors = [];
    
    if (!name || typeof name !== 'string') {
      validationErrors.push('Name is required');
    } else if (name.length > 100) {
      validationErrors.push('Name must be less than 100 characters');
    }
    
    if (!email || typeof email !== 'string') {
      validationErrors.push('Email is required');
    } else if (!isValidEmail(email)) {
      validationErrors.push('Valid email is required');
    }
    
    if (!message || typeof message !== 'string') {
      validationErrors.push('Message is required');
    } else if (message.length > 5000) {
      validationErrors.push('Message must be less than 5000 characters');
    }

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validationErrors,
          code: 'VALIDATION_ERROR'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    console.log(`Processing contact form submission from: ${sanitizedEmail}`);

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@mardenseo.com>',
        to: ['leoc.tfa@gmail.com'],
        subject: `New Contact Form Submission from ${sanitizedName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background-color: #f8f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${sanitizedName}</p>
              <p><strong>Email:</strong> ${sanitizedEmail}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #8b5cf6;">
                ${sanitizedMessage.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This email was sent from the contact form on mardenseo.com</p>
              <p>Timestamp: ${new Date().toISOString()}</p>
              <p>Client IP: ${clientIP}</p>
            </div>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Resend API error:', res.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email',
          code: 'EMAIL_SERVICE_ERROR'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const emailResponse = await res.json();
    console.log('Email sent successfully:', emailResponse.id);

    return new Response(
      JSON.stringify({ 
        message: 'Email sent successfully',
        id: emailResponse.id,
        code: 'SUCCESS'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
