
# WordPress Headless CMS Setup Guide

This guide outlines how to configure your WordPress site as a headless CMS for your React application.

## 1. Required Plugins

Install and activate the following WordPress plugins:

- **WPGraphQL**: Exposes your WordPress data through a GraphQL API
- **ACF to WPGraphQL**: Adds Advanced Custom Fields support to GraphQL API (if using ACF)
- **WPGraphQL CORS**: Configures CORS for the GraphQL endpoint
- **Advanced Custom Fields Pro**: For extending content types (recommended, not free)

## 2. Content Modeling

### Post Types

Our frontend uses the following structure that needs to be mirrored in WordPress:

| Frontend Field | WordPress Field | Notes |
|---------------|-----------------|-------|
| `id` | `slug` or `id` | We'll use slug as the primary identifier |
| `title` | `title` | Standard post title |
| `category` | `categories` | We'll use the first category name |
| `date` | `date` | Post publication date |
| `readTime` | Custom field | Create an ACF text field `read_time` or calculate on frontend |
| `image` | `featuredImage` | Featured image |
| `author` | `author` | Post author |
| `excerpt` | `excerpt` | Post excerpt |
| `content` | `content` | Post content |

### Featured Posts

To implement featured posts, create a "Featured" tag in WordPress and assign it to posts you want to feature.

## 3. Advanced Custom Fields Setup

Create the following custom fields:

1. **Field Group Name**: "Blog Post Details"
   - Field: "Read Time"
   - Type: Text
   - Instructions: "Estimated reading time (e.g., '5 min read')"
   - Required: No

## 4. GraphQL Schema Customization

The default WPGraphQL schema will work for most needs, but you may want to:

1. Add read_time field to GraphQL schema by adding this to your `functions.php`:

```php
add_action('graphql_register_types', function() {
  register_graphql_field('Post', 'readTime', [
    'type' => 'String',
    'description' => 'Estimated reading time',
    'resolve' => function($post) {
      return get_field('read_time', $post->ID);
    }
  ]);
});
```

2. Limit exposed data by adding this to `functions.php`:

```php
add_filter('graphql_connection_query_args', function($query_args, $source, $args, $context, $info) {
  // Only allow published posts to be queried
  $query_args['post_status'] = 'publish';
  return $query_args;
}, 10, 5);
```

## 5. Environment Configuration

Set these environment variables in your React app:

```
VITE_WORDPRESS_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql
VITE_USE_WORDPRESS=true
```

## 6. Content Migration Guide

1. Create categories in WordPress matching those used in the frontend:
   - SEO Tips
   - Technical SEO
   - Content Strategy
   - Local SEO
   - E-commerce SEO
   - SEO Strategy
   - SEO Trends

2. Migrate each blog post:
   - Create a new post in WordPress
   - Copy the title, content, excerpt
   - Set the appropriate category
   - Add the featured image (upload to WordPress media library)
   - Set the "Read Time" custom field
   - Publish the post

3. For the featured post:
   - Create the post as normal
   - Add the "Featured" tag

## 7. Testing & Validation

1. Test GraphQL queries using the GraphiQL interface (available at /graphql if you installed WPGraphQL)
2. Validate that all required fields are being returned
3. Set `VITE_USE_WORDPRESS=true` and verify your app displays WordPress content correctly

## 8. Performance Optimization

1. Install a caching plugin like WP Super Cache or WP Rocket
2. Consider using a CDN for media files
3. Keep the Apollo cache configuration optimized in your React app
