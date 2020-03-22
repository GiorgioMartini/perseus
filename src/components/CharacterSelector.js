import React, {useEffect, useState} from 'react'
import {getALlCharacters} from '../services/rickandmorty_api'
import {Character} from './Character'

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [chosenCharacter, setChosenCharacter] = useState(null)

  const handleClick = (e) => {
      e.preventDefault()
      setChosenCharacter(selectedCharacter)
  }
  
  useEffect(() => {
    getALlCharacters()
      .then(results => {
        setCharacters(results)
        setSelectedCharacter(results[0].id)
        setChosenCharacter(results[0].id)
      })
  },[setCharacters])

  return !characters
    ? null
    : (
    <div className="">
      <p className="f1 lh-title">Ricky and Morty character based episodes search</p>
      <form onSubmit={handleClick}>
        <select onChange={(e) => setSelectedCharacter(e.target.value)} name="character" id="character">
          {characters.map(character => (
            <option key={character.id} value={character.id}>{character.name}</option>
          ))}
        </select>
          <button type="submit">Show Episodes from {selectedCharacter}</button>
      </form>
      {chosenCharacter && <Character characterId={chosenCharacter} />}
    </div>
  )
}

export default CharacterSelector
