import { StrictMode } from 'react'
import { createRoot } from "react-dom/client"
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render( // Sets the react root in the browser DOM
  // A strict config that catches non-standard situations and likely errors
  <StrictMode>
    <App />
  </StrictMode>
)
