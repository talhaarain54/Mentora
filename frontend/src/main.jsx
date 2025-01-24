import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MenteeProvider } from './contexts/MenteeContext.jsx'
import { MentorProvider } from './contexts/MentorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenteeProvider>
      <MentorProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MentorProvider>
    </MenteeProvider>
  </StrictMode>,
)
