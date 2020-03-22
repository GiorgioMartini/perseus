import React, { useEffect, useState } from 'react'
import { getALlCharacters } from '../services/rickandmorty_api'
import { Character } from './Character'

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [characterId, setCharacterId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBtnIsEnabled, setSearchBtnIsEnabled] = useState(true);

  const handleClick = e => {
    e.preventDefault();
    // if (!selectedCharacter && !!searchQuery) {
    //   alert('Ooops! You must choose a character.')
    //   return
    // }
    setCharacterId(selectedCharacter);
  }

  const handleSearchByNameChange = query => {
    // add util function for trimming and tolowercase

    const matchedCharacter = characters
      .find(character => character.name.toLowerCase().trim() === query.toLowerCase().trim());
    if (matchedCharacter) {
      setSelectedCharacter(matchedCharacter.id);
    }
    setSearchQuery(query);

    if (query.length > 0 && !matchedCharacter) {
      setSearchBtnIsEnabled(false)
    } else if (query.length > 0 && matchedCharacter) {
      setSearchBtnIsEnabled(true)
    } else {
      setSearchBtnIsEnabled(true)
    }
    
  }

  useEffect(() => {
    getALlCharacters().then(results => setCharacters(results))
  }, [setCharacters]);

  console.log(characters)

  return !characters
    ? null
    : (
      <div className="pt4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" className="mw5 center db" alt="Rick and Morty" />
        <p className="pt3 f4 b lh-title mt0 mb4 mb5-ns word-wrap tc">Search episodes by character</p>
        <form onSubmit={handleClick}>
          <div className="flex justify-around">
            <div className={!!searchQuery ? 'o-30' : null}>
              <label className="db tc pb2">Choose by dropdown</label>
              <select disabled={!!searchQuery} onChange={(e) => setSelectedCharacter(e.target.value)} name="character" id="character">
                <option value="">Choose a characer</option>
                {characters.map(character => (
                  <option key={character.id} value={character.id}>{character.name}</option>
                ))}
              </select>
            </div>
            <div>or:</div>
            <div>
              <label className="db tc pb2">Type character name</label>
              <input
                onChange={e => handleSearchByNameChange(e.target.value)}
                type="text"
                placeholder="Search by name e.g. Rick Sanchez... "
                className="pa1 br2"
              />
            </div>
          </div>
          <h1>{JSON.stringify(!searchBtnIsEnabled)}</h1>
          <button
            disabled={!searchBtnIsEnabled}
            className={`br2 white b pa2 center db mv3 bn grow pointer ${searchBtnIsEnabled ? 'bg-green' : 'bg-gray'}`}
            type="submit">
            SHOW EPISODES
        </button>
        {!searchBtnIsEnabled}
        </form>
        {characterId && <Character characterId={characterId} />}
      </div>
    )
}

export default CharacterSelector