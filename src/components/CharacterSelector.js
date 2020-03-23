import React, { useEffect, useState } from 'react'
import { getALlCharacters, getCharacter } from '../services/rickandmorty_api'
import { Character } from './Character'
import Header from './Header'
const CharacterSelector = () => {
  const [characters, setCharacters] = useState(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBtnIsEnabled, setSearchBtnIsEnabled] = useState(true);
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chars = await getALlCharacters()
        setCharacters(chars)
      } catch {
        setError('Ooops there was an error fetching the characters.')
      }
    };
    fetchData()
  }, [setCharacters]);

  const handleSearchByNameChange = query => {
    const matchedCharacter = characters.find(character => character.name.toLowerCase() === query.toLowerCase().trim());

    if (matchedCharacter) setSelectedCharacterId(matchedCharacter.id);
    setSearchQuery(query);
    
    if (query.length > 0 && !matchedCharacter) {
      setSearchBtnIsEnabled(false)
    } else if (query.length > 0 && matchedCharacter) {
      setSearchBtnIsEnabled(true)
    } else {
      setSearchBtnIsEnabled(true)
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    if (selectedCharacterId) {
      setCharacter(null)
      try {
        const receivedCharacter = await getCharacter(selectedCharacterId)
        const similarCharacters = characters
          .filter(char => char.species === receivedCharacter.species)
          .map(item => item['name'])
        setCharacter({
          ...receivedCharacter,
          similarCharacters,
        })
      } catch {
        setError('Ooops there was an error fetching character.')
      }
    }
  }


  return !characters
    ? <p data-testid="character-selector-error" className="tc b f1">{error}</p>
    : (
      <div data-testid="character-selector" className="pt4">
        <Header/>
        <form onSubmit={handleClick}>
          <div className="flex justify-around">
            <div className={!!searchQuery ? 'o-30' : null}>
              <label className="db tc pb2">Choose by dropdown:</label>
              <select
                data-testid="character-menu"
                disabled={!!searchQuery}
                onChange={(e) => setSelectedCharacterId(e.target.value)}
                name="character"
                id="character">
                <option value="">Choose a characer</option>
                {characters.map(character => (
                  <option data-testid="character-menu-item" key={character.id} value={character.id}>{character.name}</option>
                ))}
              </select>
            </div>
            <div>or</div>
            <div>
              <label className="db tc pb2">Type character name:</label>
              <input
                data-testid="searchBox"
                onChange={e => handleSearchByNameChange(e.target.value)}
                type="text"
                placeholder="e.g. Rick Sanchez "
                className="pa1 br2 w-100"
              />
            </div>
          </div>
          <button
            data-testid="submit"
            disabled={!searchBtnIsEnabled}
            className={`br2 white b pa2 center db mv3 bn grow pointer ${searchBtnIsEnabled ? 'bg-green' : 'bg-gray'}`}
            type="submit">
            SHOW EPISODES
        </button>
        </form>
        {error && <p data-testid="character-error" className="tc b f1">{error}</p>}
        <Character character={character} />
      </div>
    )
}

export default CharacterSelector