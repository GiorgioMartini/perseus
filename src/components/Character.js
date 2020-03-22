import React, { useEffect, useState } from 'react'
import { getCharacter } from '../services/rickandmorty_api'

export const Character = ({ characterId }) => {
  const [character, setCharacter] = useState({})

  useEffect(() => {
    getCharacter(characterId)
      .then(result => {
        setCharacter(result)
      })
  }, [setCharacter, characterId])

  // container or redux or check !character
  return (
    <div className="w-100">
      <div className="flex">
        <div className="flex-1">
          <img src={character.image} className="w-100" alt="character" />
        </div>
        {/* fix css flex */}
        <div style={{ flex: 5 }} className="pl3"> 
          <p><b>Name:</b> {character.name}</p>
          <p><b>Specie</b> {character.species}</p>
          <p><b>Gender:</b> {character.gender}</p>
        </div>
      </div>
      <div>
      <p className="b">Episodes:</p>
      <ul className="pl0">
        {character.episodes && character.episodes.map((episode, id) => (
          <li className="dib episode" key={id}>{episode}</li>
        ))}
      </ul>
      <p>Similar characters:</p>
      <ul>
        <li></li>
      </ul>
      </div>
    </div>
  )
}
