import './App.css'
import Navigation from './layout/Navigation/Navigation'
import Routes from './routes/Routes'
import Footer from './layout/Footer/Footer'
import { useState } from 'react'

function App() {
  const [loggedUser, setLoggedUser] = useState('')

  const storeUser = loggedUser => setLoggedUser({ ...loggedUser })

  return (
    (
      <>
        <Navigation storeUser={user => storeUser(user)} loggedUser={loggedUser} />
        <main className='background-gray'>
          <Routes storeUser={user => storeUser(user)} loggedUser={loggedUser} />
        </main>
        <Footer />
      </>
    )
  )
}

export default App
