import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routes/Routes'
import './styles/index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
