import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.tsx';

export async function render(url = '/') {
  try {
    // Render the app to string
    const html = ReactDOMServer.renderToString(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    );

    return { html };
  } catch (error) {
    console.error('SSR render error:', error);
    return { html: '<div>Loading...</div>' };
  }
}
