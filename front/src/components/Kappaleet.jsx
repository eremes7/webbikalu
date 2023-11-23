import { Link } from 'react-router-dom'

const KappaleLinkit = ({ kappaleet }) => (
    <article>
        {kappaleet.map((kappale) => (
            <h3 key={kappale.sanat}>
                <Link key={kappale.nimi} to={`/${kappale.kategoria}/${kappale.nimi}`}>{kappale.kappaleId}... {kappale.nimi}</Link>
            </h3>
        ))}
    </article>
)

const Kappaleet = ({ kappaleet }) => (
    <article>
        <KappaleLinkit kappaleet={kappaleet} />
        {kappaleet.map((kappale) => (
            <div key={kappale.kappaleId}>
                <h2 key={kappale.nimi}>{kappale.nimi}</h2>
                <pre id="lyriikat-styles" key={kappale.sanat}>{kappale.sanat}</pre>
            </div>))}
    </article>
)





export default Kappaleet