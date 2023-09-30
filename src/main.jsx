import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.css'
import Router from './components/Rout/Router'
import AuthProvider from './Providers/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
