import { StrictMode } from 'react'
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './pages/App'
import NoMatch from './pages/no_match'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/album/:id", element: <h1>Test</h1> },
  { path: "*", element: <NoMatch /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
