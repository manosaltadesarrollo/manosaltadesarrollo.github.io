import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/Routes'

function App ()  {
  return(
    <BrowserRouter basename='/manosaltadesarrollo'>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
