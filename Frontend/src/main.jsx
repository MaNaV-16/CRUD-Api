import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import login from './page/login.jsx'
import register from './page/register.jsx'
import product from './page/product.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <product />
    <App />
    <login />
    <register />
  </StrictMode>,
)
