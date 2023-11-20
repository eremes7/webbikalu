import React from 'react'
import { Editor, EditorState, convertToRaw } from 'draft-js'
import '../styles/Draft.css'


const LisääKappale = ( {handleLisääKappale, handleNumeroChange, handleKategoriaChange, handleNimiChange, handleAlkuperäinenChange, handleSanatChange} ) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())


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
        <div>Kappaleen numero <input type="text" name="KappaleId" onChange={handleNumeroChange}/></div>
        <div>
          Kappaleen kategoria <input type="text" name="Kategoria" onChange={handleKategoriaChange}/></div>
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
