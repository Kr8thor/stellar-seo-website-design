
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.22.0";
import { Resend } from "npm:resend@1.0.0";

// Initialize Resend with API key from environment variable
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Contact form submission interface
interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  website: string;
  service: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const contactData: ContactSubmission = await req.json();
    const { name, email, phone, website, service, message } = contactData;

    if (!name || !email || !website || !service || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending contact email from", email);

    // Format the email with proper HTML structure
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      
      <h3>Contact Information:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Website:</strong> ${website}</p>
      
      <h3>Service Request:</h3>
      <p><strong>Service:</strong> ${service}</p>
      
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Contact Form <contact@mardenseo.com>",
      to: ["hello@mardenseo.com"],
      subject: `New Contact Form: ${service} inquiry from ${name}`,
      html: emailContent,
      reply_to: email,
    });

    if (error) {
      console.error("Email sending error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully:", data);
    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
