#!/usr/bin/env python3
"""
Simple SPA Server for Marden SEO React App
Handles client-side routing by serving index.html for all routes
"""

import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='dist-spa-temp', **kwargs)
    
    def do_GET(self):
        # Get the requested path
        path = self.translate_path(self.path)
        
        # If it's a file that exists, serve it normally
        if os.path.exists(path) and os.path.isfile(path):
            super().do_GET()
        # If it's a directory or non-existent path, serve index.html
        else:
            self.path = '/index.html'
            super().do_GET()

def run_server(port=8090):
    server_address = ('', port)
    httpd = HTTPServer(server_address, SPAHandler)
    
    print(f"🚀 Marden SEO React App running at http://localhost:{port}/")
    print("✅ SPA routing enabled - page refresh will work on all routes")
    print("Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
        sys.exit(0)

if __name__ == '__main__':
    run_server()
