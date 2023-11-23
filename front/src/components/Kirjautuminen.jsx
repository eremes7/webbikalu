import Notification from './Notification'
import Handlers from './Handlers'

const Kirjautuminen = ({ handleLogin, handleUsernameChange, handlePasswordChange, user, errorMessage }) => {
  console.log(Handlers)
    return (
      <article>
        <Notification message={errorMessage} />
        {!user && <form onSubmit={handleLogin}>
        <div>käyttäjä remes remes, päästää lisäämään kappaleita. Kappaleet ei siirry tietokantaan ja poistuu päivittämällä sivun</div>
        <div>-&gt;</div>
          <div>
            Käyttäjänimi
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            Salasana
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>}
        {user && <> <div> Kirjautunut käyttäjällä {user.username} </div><button onClick={() => window.localStorage.clear()}>Kirjaudu ulos</button></>}
      </article>
    )
  }

export default Kirjautuminen
