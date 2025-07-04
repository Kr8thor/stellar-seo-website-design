module.exports = {
  // Lovable configuration for Marden SEO website
  projectName: "Marden SEO Website",
  framework: "react",
  buildCommand: "npm run build",
  devCommand: "npm run dev",
  
  // Ignore patterns for Lovable sync
  ignore: [
    "dist/**",
    "node_modules/**",
    ".git/**",
    "*.log",
    "*.zip",
    "*.md",
    "*.txt",
    "*.sh",
    "*.ps1",
    "*.yml",
    "*.yaml",
    ".github/**",
    ".cpanel.yml",
    "build-*",
    "deploy-*",
    "force-*",
    "validate-*",
    "mardenseo-*",
    "stellar-*",
    "sitemap-fix-deploy/**",
    "docs/**",
    "lib/**",
    "supabase/**"
  ],
  
  // Lovable-specific settings
  lovable: {
    // Enable direct edit mode
    directEdit: true,
    
    // Sync only source files
    syncPaths: [
      "src/**",
      "public/**",
      "package.json",
      "vite.config.ts",
      "tailwind.config.ts",
      "tsconfig.json",
      "tsconfig.app.json",
      "tsconfig.node.json",
      "components.json",
      "postcss.config.js",
      "eslint.config.js",
      "index.html"
    ],
    
    // Prevent sync conflicts
    conflictResolution: "lovable-wins",
    
    // Branch settings
    branch: "main",
    
    // Auto-sync settings
    autoSync: true,
    syncInterval: 30000, // 30 seconds
    
    // Development settings
    dev: {
      port: 8080,
      host: "::",
      open: false
    }
  }
};
