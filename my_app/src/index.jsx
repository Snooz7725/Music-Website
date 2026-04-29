import { StrictMode } from 'react'
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './pages/App'
import NoMatch from './pages/no_match'
import Album from './pages/album'
import LikedSongs from './pages/liked'
import CreatorProfile from './pages/creator_profile'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/album/:id", element: <Album /> },
  { path: "*", element: <NoMatch /> },
  { path: "/liked-songs", element: <LikedSongs /> },
  { path: "/profile/:id", element: <CreatorProfile /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
