import React from 'react'
import { useState } from 'react'
import { Editor, EditorState, convertToRaw } from 'draft-js'
import '../styles/Draft.css'


const LisääKappale = ({ kappaleet, setKappaleet }) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const [numero, setNumero] = useState('')
  const [addKategoria, setAddKategoria] = useState('')
  const [nimi, setNimi] = useState('')
  const [alkuperäinen, setAlkuperäinen] = useState('')
  const [sanat, setSanat] = useState('')

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

  const extractText = () => {
    const currentContent = editorState.getCurrentContent()
    const rawContent = convertToRaw(currentContent)
    const textString = rawContent.blocks.map(block => block.text).join('\n')
    handleSanatChange(textString)
    handleLisääKappale
  }
  return(
    <article>
      <form onSubmit={handleLisääKappale}>
        <div>Kappaleen numero <input type="number" name="KappaleId" onChange={handleNumeroChange}/></div>
        <div>
          Kappaleen kategoria <input type="text" minLength={1} name="Kategoria" onChange={handleKategoriaChange}/></div>
        <div>
          Kappaleen nimi <input type="text" name="KappaleNimi" onChange={handleNimiChange}/>
        </div>
        <div>
          Kappaleen alkuperäisen version nimi *ei pakollinen* <input type="text" name="AlkuperäinenNimi" onChange={handleAlkuperäinenChange}/></div>

        Kappaleen sanat 
        <Editor editorState={editorState} onChange={setEditorState}/> 
      </form>
      <button onClick={extractText}>Lisää </button>
    </article>
  )
}

export default LisääKappale
