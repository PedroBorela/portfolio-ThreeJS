import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ui/ErrorBoundary.jsx'
import AppFallback from './components/ui/AppFallback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary name="App" fallback={<AppFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
