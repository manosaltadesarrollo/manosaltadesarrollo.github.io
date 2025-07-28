import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/Routes'

function App ()  {
  return(
    <BrowserRouter basename='/webmanosalta'>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
