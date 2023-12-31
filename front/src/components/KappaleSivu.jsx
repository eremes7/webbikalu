const KappaleArticle = ({ kappale }) => (
    <article>
      <h2>{kappale.nimi}</h2>
      {kappale.alkuperäinen && <h4>({kappale.alkuperäinen})</h4>}
      <pre id="lyriikat-styles">{kappale.sanat}</pre>
    </article>
  )

export default KappaleArticle