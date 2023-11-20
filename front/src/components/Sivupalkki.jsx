import { Link } from 'react-router-dom'


const Sivupalkki = ({ kategoriat, user }) => (
  <aside className="sivupalkki">
    <nav>
      <ul>
        <p><Link to="/">Etusivu</Link></p>
        <p><Link to="/Hakemisto">Hakemisto</Link></p>
        {kategoriat.map((kategoria) => (
          <li key={kategoria}><Link to={`/${kategoria}`}>{kategoria}</Link></li>
        ))}
        <p><Link to="/Kirjautuminen">Kirjautuminen</Link></p>
        {user && <p><Link to="/LisääKappale">Lisää kappale</Link></p>}
      </ul>
    </nav>
  </aside>
);

export default Sivupalkki