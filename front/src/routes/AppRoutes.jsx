import { Route, Routes, } from 'react-router-dom'
import Main from '../components/Main'
import LisääKappale from '../components/Lisääkappale'
import Kirjautuminen from '../components/Kirjautuminen'
import Hakemisto from '../components/Hakemisto'
import KappaleArticle from '../components/KappaleSivu'
import Kappaleet from '../components/Kappaleet'

const AppRoutes = ({ kappaleet, setKappaleet, kategoriat, user, setUser, errorMessage, setErrorMessage }) => {
  return(
        <Routes>
          <Route path="/" 
            element={<Main />} />

          {kategoriat.map((kategoria) => (
            <Route key={kategoria} path={`/${kategoria}`} element={
              <Kappaleet 
                kappaleet={kappaleet.filter(kappale => kappale.kategoria === kategoria)} />} />
          ))}
          <Route path="/Hakemisto"
            element={<Hakemisto 
              kappaleet={kappaleet} 
              kategoriat={kategoriat} />}/>
          {kappaleet.map((kappale) =>
            <Route 
              key={kappale.kappaleId} path={`/${kappale.kategoria}/${kappale.nimi}`}
              element={<KappaleArticle
                kappale={kappale} />}/>)}

          <Route path="/Kirjautuminen" 
            element={<Kirjautuminen
              user={user} 
              setUser={setUser}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage} />} />

          {user && <Route path="/LisääKappale" 
            element={<LisääKappale kappaleet={kappaleet} setKappaleet={setKappaleet}/>} />}
        </Routes>
  )
}

export default AppRoutes




