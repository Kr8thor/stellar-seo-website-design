
-- Fix the search path warnings for the vector similarity functions
-- This addresses the security warnings about functions not having explicit search paths

-- Update match_crawled_pages function with explicit search path
CREATE OR REPLACE FUNCTION public.match_crawled_pages(query_embedding vector, match_count integer DEFAULT 10, filter jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(id bigint, url character varying, chunk_number integer, content text, metadata jsonb, similarity double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
#variable_conflict use_column
begin
  return query
  select
    id,
    url,
    chunk_number,
    content,
    metadata,
    1 - (crawled_pages.embedding <=> query_embedding) as similarity
  from crawled_pages
  where metadata @> filter
  order by crawled_pages.embedding <=> query_embedding
  limit match_count;
end;
$function$;

-- Update match_documents function with explicit search path
CREATE OR REPLACE FUNCTION public.match_documents(query_embedding vector, match_count integer DEFAULT NULL::integer, filter jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(id bigint, content text, metadata jsonb, similarity double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$function$;
