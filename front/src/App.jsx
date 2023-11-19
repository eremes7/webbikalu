import ReactDom from 'react-dom/client'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link, Routes, useMatch, useParams} from 'react-router-dom'
import './styles/App.css'
import kappaleService from './services/kappaleet'
import loginService from './services/login'
import Notification from './components/Notification'


const Menu = () => (
  <aside>
    <Link to="/"> Etusivu </Link>
  </aside>
)


const LisääKappaleLink = () => (
  <aside>
    <Link to="/LisääKappale"> Lisää kappale </Link>
  </aside>
)

const Sivupalkki = ({kategoriat, kappaleet, user}) => (
  <div>
    <aside>
      <Menu />
      <Hakemisto kappaleet={kappaleet} kategoriat={kategoriat}/>
      {kategoriat.map((kategoria) => 
      <li key={kategoria}>
        <Link to={`/${kategoria}`}>{kategoria}</Link>
      </li>
      )}
    </aside>
    <Kirjautuminen />
    {user && <LisääKappaleLink />}
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
      {user && <> <div> Kirjautunut käyttäjällä {user.username} </div><button onClick={() => window.localStorage.clear()}>Kirjaudu ulos</button></>}
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

const LisääKappale = () => (
  <article>
    <div>
      <h2>öaslkd</h2> 
      PRöött
    </div>
  </article>
)

const Main = () => (
  <article>
    <h2>Tarina laulukalun synnystä </h2>
    <p>Irkkiin kulki huhu että loppui Kalun taika</p>
    <p>Vanha painos vähiin kävi siispä uuden aika</p>
    <p>Siihen Kalukomitea masottinaan Laika</p>
    <p>Laulukalleuksia ryhtyi hieromaan</p>
    <h2>  </h2>
    <p>Joka killast' siellä oli kutsuttuna ukko</p>
    <p>Aapo seisoi päällä kuten tunkionsa kukko</p>
    <p>Pian oltiin mökillä ja ovess' oli lukko</p>
    <p>Ja uuden Kalun viisit siellä alkoi kaukumaan</p>
    <h2>  </h2>
    <p>  :,: Siellä juotiin, siellä laulettiin</p>
    <p>  keväällä kova oli Kalu niin :,:</p>
    <h2>  </h2>
    <p>Laulut vaihtui tiuhaan siellä kova oli tahti</p>
    <p>Taso huimas päätä kuten viikon vanha sahti</p>
    <p>Siinä nähtiin tämän Kalukomitean mahti</p>
    <p>Kun Laulukalun biisit sen kun paranee.</p>
    <h2>  </h2>
    <p>Sitten äänen avas joku prosekillan mulkku</p>
    <p>Nousi pöydän päälle kuten tuhti punatulkku</p>
    <p>Juicen surkuvirsusta koht' täytty joka kulkku</p>
    <p>Ja Aapo huutaa tää ei kyllä Laulukaluun mee</p>
    <h2>  </h2>
    <p>:,: Siellä juotiin, siellä painittiin</p>
    <p>keväällä käyrä oli Kalu niin :,:</p>
    <h2>  </h2>
    <p>Kohtapuoliin pitäis saada uusi Kalu julki</p>
    <p>Koko Komitea viimein asioita sulki</p>
    <p>Silti koko prosessi vain takaperin kulki</p>
    <p>Tästä vielä vähemmistöt suivaantuu</p>
    <p>  </p>
    <p>Kalu viimein valmis on kun sanat kansiin laittoi</p>
    <p>Kossupullo päivässä ja Stoke kyllä taittoi</p>
    <p>Koko porukalle muuan jalojuoma maittoi</p>
    <p>Ensi Laulukalun tekee kyllä Joku muu™</p>
    <h2>  </h2>
    <p>  :,: Siellä juotiin, siellä juhlittiin</p>
    <p>  keväällä kaunis oli Kalu niin :,:</p>
    <p>  </p>
    <p>  </p>
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

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWebKaluAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      kappaleService.setToken(user.token)
    }
  },[])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: newUsername, password: newPassword
      })
      window.localStorage.setItem(
        'loggedWebKaluAppUser', JSON.stringify(user)
      )
      kappaleService.setToken(user.token)
      setUser(user)
      setUsername(newUsername)
      setPassword(newPassword)
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
      <header id="header1"><img id="kuva1" src="../oty_6.png"/> LAULUKALU ---------- 12/369   laulua</header>
      <div className="container">
        <Sivupalkki user={user} kategoriat={kategoriat} kappaleet={kappaleet}/>
        <Routes>
          <Route path="/" element={<Main />}/>
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

          {user && <Route path="/LisääKappale" element={<LisääKappale/>}/>}

        </Routes>

      </div>
    </>
  )}





export default function RoutedApp() { 
  return <Router><App /></Router>
}
