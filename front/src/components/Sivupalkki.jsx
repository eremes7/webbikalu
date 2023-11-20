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

const Kirjautuminen = () => (
  <aside>
    <Link to="/Kirjautuminen">Kirjautuminen</Link>
  </aside>
)

const Kategoriat = ({ kategoriat}) => (
  <aside>
    {kategoriat.map((kategoria) =>
      <li key={kategoria}>
        <Link to={`/${kategoria}`}>{kategoria}</Link>
      </li>
    )}
  </aside>
)

const Sivupalkki = ({ kategoriat, kappaleet, user }) => (
  <div>
    <aside>
      <Menu />
      <Hakemisto kappaleet={kappaleet} kategoriat={kategoriat} />
      <Kategoriat kategoriat={kategoriat} />
    </aside>
    <Kirjautuminen />
    {user && <LisääKappaleLink />}
  </div>
)

export default Sivupalkki