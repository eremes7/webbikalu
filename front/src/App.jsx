import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import './styles/App.css'
import kappaleService from './services/kappaleet'
import loginService from './services/login'
import AppRoutes from './routes/AppRoutes'
import Sivupalkki from './components/Sivupalkki'
import Header from './components/Header'
import Handlers from './components/Handlers'

const App = () => {
  const [kappaleet, setKappaleet] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [numero, setNumero] = useState('')
  const [addKategoria, setAddKategoria] = useState('')
  const [nimi, setNimi] = useState('')
  const [alkuperäinen, setAlkuperäinen] = useState('')
  const [sanat, setSanat] = useState('')

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
        <Sivupalkki user={user} kategoriat={kategoriat} kappaleet={kappaleet} />
        <AppRoutes
          kappaleet={kappaleet}
          kategoriat={kategoriat}
          user={user}
          handlers={Handlers}
          errorMessage={errorMessage} />
      </div>
    </>
  )
}

export default function RoutedApp() {
  return <Router><App /></Router>
}
