import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Routes, } from 'react-router-dom'
import './styles/App.css'
import kappaleService from './services/kappaleet'
import loginService from './services/login'
import Main from './components/Main'
import LisääKappale from './components/Lisääkappale'
import Kirjautuminen from './components/Kirjautuminen'
import Sivupalkki from './components/Sivupalkki'
import Hakemisto from './components/Hakemisto'

const Kappaleet = ({ kappaleet }) => (
  <article>
    <KappaleLinkit kappaleet={kappaleet} />
    {kappaleet.map((kappale) => (
      <div key={kappale.kappaleId}>
        <h2 key={kappale.nimi}>{kappale.nimi}</h2>
        <pre key={kappale.sanat}>{kappale.sanat}</pre>
      </div>))}
  </article>
)

const KappaleLinkit = ({ kappaleet }) => (
  <article>
    {kappaleet.map((kappale) => (
      <h3 key={kappale.sanat}>
        <Link key={kappale.nimi} to={`/${kappale.kategoria}/${kappale.nimi}`}>{kappale.kappaleId}... {kappale.nimi}</Link>
      </h3>
    ))}
  </article>
)


const KappaleArticle = ({ kappale }) => (
  <article>
    <h2>{kappale.nimi}</h2>
    {kappale.alkuperäinen && <h4>({kappale.alkuperäinen})</h4>}
    <pre>{kappale.sanat}</pre>
  </article>
)


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


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username, password: password
      })
      window.localStorage.setItem(
        'loggedWebKaluAppUser', JSON.stringify(user)
      )
      kappaleService.setToken(user.token)
      setUser(user)
      setUsername(username)
      setPassword(password)
    } catch (exception) {
      setErrorMessage('Virheellinen käyttäjätunnus')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleNimiChange = (event) => {
    setNimi(event.target.value)
  }
  const handleKategoriaChange = (event) => {
    setAddKategoria(event.target.value)
  }
  const handleNumeroChange = (event) => {
    setNumero(event.target.value)
  }
  const handleAlkuperäinenChange = (event) => {
    setAlkuperäinen(event.target.value)
  }
  const handleSanatChange = (uudetSanat) => {
    setSanat(uudetSanat)
  }
  const handleLisääKappale = (event) => {
    event.preventDefault()
    const uusiKappale = {
      nimi: nimi,
      kategoria: addKategoria,
      kappaleId: Number(numero),
      alkuperäinen: alkuperäinen,
      sanat: sanat
    }

    setKappaleet(kappaleet.concat(uusiKappale))

  }


  const kategoriat = kappaleet.reduce((acc, cur) => {
    if (!acc.includes(cur.kategoria)) {
      acc.push(cur.kategoria)
    }
    return acc
  }, [])


  return (
    <>
      <header id="header1"><img id="kuva1" src="../oty_6.png" /> LAULUKALU ---------- {kappaleet.length}/369   laulua</header>
      <div className="container">
        <Sivupalkki user={user} kategoriat={kategoriat} kappaleet={kappaleet} />
        <Routes>
          <Route path="/" element={<Main />} />
          {kategoriat.map((kategoria) => (
            <Route key={kategoria} path={`/${kategoria}`} element={
              <Kappaleet kappaleet={kappaleet.filter(kappale => kappale.kategoria === kategoria)} />} />
          ))}
          <Route path="/Hakemisto"
            element={<Hakemisto kappaleet={kappaleet} kategoriat={kategoriat} />}
          />
          {kappaleet.map((kappale) =>
            <Route key={kappale.kappaleId} path={`/${kappale.kategoria}/${kappale.nimi}`}
              element={<KappaleArticle kappale={kappale} />}
            />)}
          <Route path="/Kirjautuminen" element={<Kirjautuminen handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} user={user} errorMessage={errorMessage} />} />
          {user && <Route path="/LisääKappale" element={<LisääKappale handleLisääKappale={handleLisääKappale} handleNumeroChange={handleNumeroChange} handleKategoriaChange={handleKategoriaChange} handleNimiChange={handleNimiChange} handleAlkuperäinenChange={handleAlkuperäinenChange} handleSanatChange={handleSanatChange} />} />}
        </Routes>
      </div>
    </>
  )
}





export default function RoutedApp() {
  return <Router><App /></Router>
}
