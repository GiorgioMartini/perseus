import React from 'react'

export const Character = ({ character }) => {
  return !character
    ? null
    : (
      <div className="w-100">
        <div className="flex">
          <div className="flex-1">
            <img src={character.image} className="w-100" alt="character" />
          </div>
          <div className="pl3 flex-5">
            <p><b>Name:</b> {character.name}</p>
            <p><b>Specie</b> {character.species}</p>
            <p><b>Gender:</b> {character.gender}</p>
          </div>
        </div>
        <div>
          <p className="b">Episodes:</p>
          <ul className="pl0">
            {character.episodes && character.episodes.map((episode, id) => (
              <li className="dib episode dim" key={id}>{episode}</li>
            ))}
          </ul>
          <p className="b">Similar characters:</p>
          <ul className="pl0">
            {character.similarCharacters && character.similarCharacters.map((character, id) => (
              <li className="dib similarCharacter dim" key={id}>{character}</li>
            ))}
          </ul>
        </div>
      </div>
    )
}
