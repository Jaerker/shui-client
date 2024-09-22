import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Pages/App.tsx'
import './index.css'
import { StoreContext } from './Stores/store.ts'
import { store } from './Stores/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>    
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>,
)
