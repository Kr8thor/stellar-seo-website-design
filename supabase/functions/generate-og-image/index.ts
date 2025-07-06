
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating OpenGraph image for homepage');

    const prompt = `Create a professional OpenGraph social media image (1200x630 pixels) with the following specifications:

Main headline: "Strategic SEO Solutions for Digital Success" in large, bold typography
Subtitle: "Elevate your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions"
Brand: "Marden SEO" in smaller text

Design requirements:
- Clean white background with subtle gradient overlay
- Purple to pink gradient accent elements (#7c3aed to #ec4899)
- Professional, modern typography hierarchy
- Minimalist design suitable for social media
- High contrast text for readability
- Include subtle SEO-themed visual elements like search icons or analytics charts
- Professional business aesthetic
- Ensure text is readable at small sizes on social media platforms

Style: Clean, professional, modern business branding, suitable for LinkedIn and Facebook sharing`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        size: '1792x1024', // Closest to 1200x630 aspect ratio
        quality: 'high',
        output_format: 'png',
        n: 1
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Image generated successfully');

    // The response contains base64 image data
    const imageData = data.data[0].b64_json;

    return new Response(JSON.stringify({ 
      success: true, 
      imageData: `data:image/png;base64,${imageData}`,
      message: 'OpenGraph image generated successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate OpenGraph image', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
