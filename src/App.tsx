import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
