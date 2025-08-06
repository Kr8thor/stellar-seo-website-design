import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.tsx';

export function render(url = '/') {
  try {
    // Create a context for react-helmet-async
    const helmetContext = {};
    
    // Render the React app to a string using ReactDOMServer
    const html = ReactDOMServer.renderToString(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(
          StaticRouter,
          { location: url },
          React.createElement(App, { helmetContext })
        )
      )
    );

    // Return the rendered HTML string
    return { html };
  } catch (error) {
    console.error('SSR render error:', error);
    // Return a fallback in case of error
    return { html: '<div>Loading...</div>' };
  }
}