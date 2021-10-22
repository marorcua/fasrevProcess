import './App.css'
import Navigation from './layout/Navigation/Navigation'
import Routes from './routes/Routes'
import Footer from './layout/Footer/Footer'

function App() {
  return (
    (
      <>
        <Navigation />

        <main className='background-gray'>

          <Routes />
        </main>
        <Footer />
      </>
    )
  )
}

export default App
