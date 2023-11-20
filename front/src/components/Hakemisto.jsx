import { Link } from 'react-router-dom'

const Hakemisto = ({ kappaleet, kategoriat }) => (
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
        )
      })}
    </article>
  )

export default Hakemisto