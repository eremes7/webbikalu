

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

export default {
  handleUsernameChange,
  handlePasswordChange,
  handleNimiChange,
  handleKategoriaChange,
  handleNumeroChange,
  handleAlkuperäinenChange, 
  handleSanatChange,
  handleLisääKappale,
  handleLogin
}
