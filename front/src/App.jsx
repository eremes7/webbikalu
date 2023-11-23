import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/App.css'
import kappaleService from './services/kappaleet'
import AppRoutes from './routes/AppRoutes'
import Sivupalkki from './components/Sivupalkki'
import Header from './components/Header'

const App = () => {
  const [kappaleet, setKappaleet] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    kappaleService
      .getAll()
      .then(initialKappaleet => {
        setKappaleet(initialKappaleet)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWebKaluAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      kappaleService.setToken(user.token)
    }
  }, [])

  const kategoriat = kappaleet.reduce((acc, cur) => {
    if (!acc.includes(cur.kategoria)) {
      acc.push(cur.kategoria)
    }
    return acc
  }, [])

  return (
    <>
        <Header kappaleetLukumäärä={kappaleet.length}/>
      <div className="container">
        <Sivupalkki
          user={user} 
          kategoriat={kategoriat} />

        <AppRoutes
          kappaleet={kappaleet}
          kategoriat={kategoriat}
          user={user}
          setUser={setUser}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage} />
      </div>
    </>
  )
}

export default function RoutedApp() {
  return <Router><App /></Router>
}
