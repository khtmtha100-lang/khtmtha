import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // THIS LINE IS CRITICAL

// عند انقطاع الإنترنت: عدم إغراق الكونسول بأخطاء Supabase/شبكة (مثل refresh_token)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', function (e) {
    const msg = e.reason?.message ?? String(e.reason ?? '')
    if (!navigator.onLine && (msg === 'Failed to fetch' || msg.includes('fetch'))) {
      e.preventDefault()
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)