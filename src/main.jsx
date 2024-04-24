import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './flags.css'
import { PrimeReactProvider } from 'primereact/api'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
  </React.StrictMode>
  </BrowserRouter>,
)
