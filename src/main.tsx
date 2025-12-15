import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('[DEBUG] main.tsx: Starting app initialization');

// Dynamic import to catch any module loading errors
import('@app/index').then((module) => {
  console.log('[DEBUG] main.tsx: App module loaded successfully');
  const App = module.default;
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('[DEBUG] main.tsx: Root element not found');
    throw new Error('Root element not found');
  }

  console.log('[DEBUG] main.tsx: Rendering app');
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('[DEBUG] main.tsx: App rendered');
}).catch((error) => {
  console.error('[DEBUG] main.tsx: Failed to load App module:', error);
  // Display error on page
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `<div style="padding: 20px; color: red;"><h1>Error loading application</h1><pre>${error.message}\n${error.stack}</pre></div>`;
  }
});



