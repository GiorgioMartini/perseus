import React, {useEffect, useState} from 'react'
import {getCharacter} from '../services/rickandmorty_api'

export const Character = ({characterId}) => {
  const [character, setCharacter] = useState({})
  
  useEffect(() => {
    getCharacter(characterId)
      .then(result => {
        setCharacter(result)
      })
  },[setCharacter, characterId])

  return (
    <div className="w-100 flex ">
      <div className="flex-1">
        <img src={character.image} className="w-100" alt="character"/> 
      </div>
      <div className="flex-1">
        <p>{character.name}</p>
        <p>{character.species}</p>
        <p>{character.gender}</p>
        <p>Episodes:</p>
        <ul>
          {character.episodes && character.episodes.map(episode => (
            <li>{episode}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
