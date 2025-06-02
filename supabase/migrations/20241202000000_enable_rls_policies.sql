
-- Enable Row Level Security on existing tables
-- This provides basic protection for the database tables

-- Enable RLS on documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for documents (content is public)
CREATE POLICY "Allow public read access to documents" ON public.documents
  FOR SELECT
  USING (true);

-- Enable RLS on crawled_pages table  
ALTER TABLE public.crawled_pages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for crawled pages (public content)
CREATE POLICY "Allow public read access to crawled_pages" ON public.crawled_pages
  FOR SELECT
  USING (true);

-- Enable RLS on supervised_knowledge table
ALTER TABLE public.supervised_knowledge ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for supervised knowledge (public content)
CREATE POLICY "Allow public read access to supervised_knowledge" ON public.supervised_knowledge
  FOR SELECT
  USING (true);

-- Enable RLS on n8n_chat_histories table (more restrictive for chat data)
ALTER TABLE public.n8n_chat_histories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access only for the session owner
CREATE POLICY "Allow access to own chat history" ON public.n8n_chat_histories
  FOR ALL
  USING (
    -- Allow access if user owns the session or if it's a public demo session
    session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
    OR session_id LIKE 'demo_%'
  );

-- Grant necessary permissions for public access to content tables
GRANT SELECT ON public.documents TO anon, authenticated;
GRANT SELECT ON public.crawled_pages TO anon, authenticated;
GRANT SELECT ON public.supervised_knowledge TO anon, authenticated;

-- More restrictive permissions for chat histories
GRANT SELECT, INSERT, UPDATE ON public.n8n_chat_histories TO authenticated;
GRANT SELECT ON public.n8n_chat_histories TO anon;

-- Add helpful comments
COMMENT ON POLICY "Allow public read access to documents" ON public.documents 
IS 'Allows public read access to documents table for content display';

COMMENT ON POLICY "Allow public read access to crawled_pages" ON public.crawled_pages 
IS 'Allows public read access to crawled pages for content display';

COMMENT ON POLICY "Allow public read access to supervised_knowledge" ON public.supervised_knowledge 
IS 'Allows public read access to supervised knowledge for content display';

COMMENT ON POLICY "Allow access to own chat history" ON public.n8n_chat_histories 
IS 'Restricts chat history access to session owners or demo sessions';
