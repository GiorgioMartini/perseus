import React, {useEffect, useState} from 'react'
import {getALlCharacters} from '../services/rickandmorty_api'

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([])
  const [selectedCharacterUrl, setSelectedCharacterUrl] = useState(null)

  useEffect(() => {
    getALlCharacters()
      .then(results => {
        setCharacters(results)
        setSelectedCharacterUrl(results[0].url)
      })
  },[setCharacters])

  return !characters
    ? null
    : (
    <div>
      <select onChange={(e) => setSelectedCharacterUrl(e.target.value)} name="character" id="character">
        {characters.map(character => (
          <option key={character.id} value={character.url}>{character.name}</option>
        ))}
      </select>
      <a href={selectedCharacterUrl}>Go to profile</a>
    </div>
  )
}

export default CharacterSelector
