import ReactDom from 'react-dom/client'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link, Routes, useMatch, useParams} from 'react-router-dom'
import './styles/App.css'
import kappaleService from './services/kappaleet'
import loginService from './services/login'
import Notification from './components/Notification'


const Menu = () => (
  <aside>
    <Link to="/"> Kategoriat </Link>
  </aside>
)


const Sivupalkki = ({kategoriat, kappaleet}) => (
  <div>
    <aside>
      <Menu />
      {kategoriat.map((kategoria) => 
      <li key={kategoria}>
        <Link to={`/${kategoria}`}>{kategoria}</Link>
      </li>
      )}
    </aside>
    <Hakemisto kappaleet={kappaleet} kategoriat={kategoriat}/>
    <Kirjautuminen />
  </div>
)

const Kirjautuminen = () => (
  <aside>
    <Link to="/Kirjautuminen">Kirjautuminen</Link>
  </aside>
)

const KirjautumisArticle = ({ handleLogin, handleUsernameChange, handlePasswordChange, user, errorMessage}) => {
  return (
    <article>
      <Notification message={errorMessage}/>
      {!user && <form onSubmit={handleLogin}>
        <div>
          Käyttäjänimi
          <input
            type="text"
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Salasana
          <input
            type="password"
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>}
      {user && <div> Kirjautunut käyttäjällä {user.username} </div>}
    </article>
  )}

const Kappaleet = ({ kappaleet }) => (
  <article>
    <KappaleLinkit kappaleet={kappaleet}/>
    {kappaleet.map((kappale) => (
      <div key={kappale.kappaleId}>
        <h2 key={kappale.nimi}>{kappale.nimi}</h2>
        <pre key={kappale.sanat}>{kappale.sanat}</pre>
      </div> ))}
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


const Hakemisto = () => (
  <aside>
    <Link to={'/Hakemisto'}>Hakemisto</Link>
  </aside>
)

const KappaleArticle = ({ kappale }) => ( 
  <article>
    <h2>{kappale.nimi}</h2>
    <pre>{kappale.sanat}</pre>
  </article>
) 


const HakemistoArticle = ({ kappaleet, kategoriat }) => (
  <article>
    {kategoriat.map((kategoria) => {
      const filteredKappaleet = kappaleet.filter((kappale) => kappale.kategoria === kategoria)
      return (
        <div key={kategoria}>
          <h2>{kategoria}</h2>
          {filteredKappaleet.map((kappale) =>
          <h3 key={kappale.kappaleId}>
            <Link key={kappale.id} to={`/${kappale.kategoria}/${kappale.nimi}`}>
              {kappale.kappaleId}... {kappale.nimi}</Link>
          </h3>
          )}
        </div>
      )})}
  </article>
)


const App = () => {
  const [kappaleet, setKappaleet] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    kappaleService
      .getAll()
      .then(initialKappaleet => {
        setKappaleet(initialKappaleet)})
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: newUsername, password: newPassword
      })
      setUser(user)
      setUsername(newUsername)
      setPassword(newPassword)
      console.log(user)
      console.log('kirjaudutaan käyttäjällä,', newUsername, newPassword)
    } catch(exception) {
      setErrorMessage('Virheellinen käyttäjätunnus')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    setNewUsername('')
    setNewPassword('')

  }
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const kategoriat = kappaleet.reduce((acc, cur) => {
    if (!acc.includes(cur.kategoria)){
      acc.push(cur.kategoria)
    }
    return acc
  }, [])


  return (
    <>
      <header className="topBar" id="header1"><img id="kuva1" src="../oty_6.png"/> LAULUKALU </header>
      <div className="container">
        <Sivupalkki kategoriat={kategoriat} kappaleet={kappaleet}/>
        <Routes>
          <Route path="/" element={<Sivupalkki kategoriat={kategoriat} kappaleet={kappaleet}/>}/>
          {kategoriat.map((kategoria) => (
            <Route key={kategoria} path={`/${kategoria}`} element={
              <Kappaleet kappaleet={kappaleet.filter(kappale => kappale.kategoria === kategoria)} />}/>
          ))}
          <Route path="/Hakemisto" 
            element={<HakemistoArticle kappaleet={kappaleet} kategoriat={kategoriat}/>}
          />
          {kappaleet.map((kappale) =>
          <Route key={kappale.kappaleId} path={`/${kappale.kategoria}/${kappale.nimi}`} 
            element={<KappaleArticle kappale={kappale}/>}
          />)}
          <Route path="/Kirjautuminen" element={<KirjautumisArticle handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} user={user} errorMessage={errorMessage}/>} />
        </Routes>

      </div>
    </>
  )}





export default function RoutedApp() { 
  return <Router><App /></Router>
}
