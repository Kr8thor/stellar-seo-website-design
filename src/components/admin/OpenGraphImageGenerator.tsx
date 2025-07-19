
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Image as ImageIcon, Loader2 } from 'lucide-react';

const OpenGraphImageGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Requesting OpenGraph image generation...');
      }
      
      const { data, error } = await supabase.functions.invoke('generate-og-image', {
        body: { type: 'homepage' }
      });

      if (error) {
        throw error;
      }

      if (data?.imageData) {
        setGeneratedImage(data.imageData);
        toast({
          title: "Success!",
          description: "OpenGraph image generated successfully. You can now download it.",
        });
      } else {
        throw new Error('No image data received');
      }

    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate OpenGraph image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'opengraph-homepage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "OpenGraph image has been downloaded. Replace the existing opengraph-image.png in your public folder.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          OpenGraph Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">This will generate a professional OpenGraph image (1200x630px) featuring:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>"Strategic SEO Solutions for Digital Success" as the main headline</li>
            <li>"Elevate your online presence with data-driven strategies..." as subtitle</li>
            <li>Marden SEO branding with purple-pink gradient colors</li>
            <li>Professional layout optimized for social media sharing</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={generateImage} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" />
                Generate OpenGraph Image
              </>
            )}
          </Button>

          {generatedImage && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <img 
                  src={generatedImage} 
                  alt="Generated OpenGraph Image" 
                  className="w-full rounded border"
                />
              </div>
              
              <Button 
                onClick={downloadImage}
                variant="outline"
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>

              <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-900 mb-1">Next Steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                  <li>Download the generated image</li>
                  <li>Replace the existing <code className="bg-blue-100 px-1 rounded">public/opengraph-image.png</code> file</li>
                  <li>The SEO system will automatically use the new image for social media sharing</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenGraphImageGenerator;
