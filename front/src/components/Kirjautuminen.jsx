
const KirjautumisSivu = ({ handleLogin, handleUsernameChange, handlePasswordChange, user, errorMessage }) => {
    return (
      <article>
        <Notification message={errorMessage} />
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
    )
  }

export default KirjautumisSivu