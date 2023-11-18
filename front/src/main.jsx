import ReactDom from 'react-dom/client'
import {BrowserRouter as Router, Route, Link, Routes, useMatch, useParams} from 'react-router-dom'
import './styles/App.css'
import kappaleService from './services/kappaleet'

console.log(KappaleService)

const Menu = () => (
  <aside>
    <Link to="/"> Kategoriat </Link>
  </aside>
)


const Kategoriat = ({kategoriat}) => (
  <div>
    <Menu/>
    <aside>
      {kategoriat.map((kategoria) => 
      <li key={kategoria}>
        <Link to={`/${kategoria}`}>{kategoria}</Link>
      </li>
      )}
    </aside>
    <Hakemisto kappaleet={kappaleet} kategoriat={kategoriat}/>
  </div>
)


const Kappaleet = ({ kappaleet }) => (
  <article>
    <KappaleLinkit kappaleet={kappaleet}/>
    {kappaleet.map((kappale) => (
      <div key={kappale.id}>
        <h2>{kappale.nimi}</h2>
        <pre>{kappale.sanat}</pre>
      </div> ))}
  </article>
)


const KappaleLinkit = ({ kappaleet }) => (
  <article>
    {kappaleet.map((kappale) => (
      <h3 key={kappale.id}>
        <Link to={`/${kappale.kategoria}/${kappale.nimi}`}>{kappale.id}... {kappale.nimi}</Link>
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
          <h3>
            <Link to={`/${kappale.kategoria}/${kappale.nimi}`}>
              {kappale.id}... {kappale.nimi}</Link>
          </h3>
          )}
        </div>
      )})}
  </article>
)


const App = () => {
  const kategoriat = kappaleet.reduce((acc, cur) => {
    if (!acc.includes(cur.kategoria)){
      acc.push(cur.kategoria)
    }
    return acc
  }, [])

  const match = useMatch('/:kategoria')
  const kategoriaKappaleet = match
    ? kappaleet.filter((kappale) => kappale.kategoria === match.params.kategoria)
    : null

  return (
    <>
      <yläteksti id="header1"><img id="kuva1" src="../oty_6.png"/> LAULUKALU </yläteksti>
      <div className="container">
        <Kategoriat kategoriat={kategoriat}/>
        <Routes>
          <Route path=""/>
          {kategoriat.map((kategoria) => (
            <Route key={kategoria} path={`/${kategoria}`} element={
              <Kappaleet kappaleet={kategoriaKappaleet} />}/>
          ))}
          <Route path="/Hakemisto" 
            element={<HakemistoArticle kappaleet={kappaleet} kategoriat={kategoriat}/>}
          />
          {kappaleet.map((kappale) =>
          <Route key={kappale.id} path={`/${kappale.kategoria}/${kappale.nimi}`} 
            element={<KappaleArticle kappale={kappale}/>}
          />)}
        </Routes>
      </div>
    </>
  )}

ReactDom.createRoot(document.getElementById('root')).render(
  <Router><App /></Router>)
