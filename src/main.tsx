import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryProvider } from './lib/query-provider.tsx'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './scss/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </QueryProvider>
  </React.StrictMode>,
)
