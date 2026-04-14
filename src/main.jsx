
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import FavoritesProvider from "./context/FavoritesContext";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <FavoritesProvider>
    <App />
  </FavoritesProvider>
  </BrowserRouter>
   
 
)
