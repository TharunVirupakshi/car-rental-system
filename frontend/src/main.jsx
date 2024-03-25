import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
 BrowserRouter
} from "react-router-dom";
import { AdminAuthProvider } from './middleware/AdminAuthContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
        <AdminAuthProvider>
        <App />
        </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
