import { useState } from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import kappaleService from '../services/kappaleet'
import '../styles/App.css'

const Kirjautuminen = ({ user, setUser, errorMessage, setErrorMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
      const handleLogout = () => {
        if(user){
            setUser(null)
            window.localStorage.clear()
        }
      }

    return (
      <article>
        <Notification message={errorMessage} />
        {!user && <form onSubmit={handleLogin}>
        <h2>Kirjautuminen</h2>
        <div>--&gt;Käyttäjätunnus: remes remes, päästää lisäämään kappaleita.<br/>--&gt;Kappaleet ei siirry tietokantaan ja poistuu päivittämällä sivun</div>
        <br/>
          <div>
            <div>Käyttäjänimi</div>
            <input
              id="käyttäjäNimi-styles"
              type="text"
              name="username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <div>Salasana</div>
            <input
              id="salasana-styles"
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button id="kirjautumisNappi-styles" type="submit">kirjaudu</button>
        </form>}
        {user && <> <div> Kirjautunut käyttäjällä {user.username} </div><button id="kirjautumisNappi-styles" onClick={() => handleLogout()}>Kirjaudu ulos</button></>}
      </article>
    )
  }

export default Kirjautuminen
