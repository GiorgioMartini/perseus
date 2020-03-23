import React, { useEffect, useState } from 'react'
import { getALlCharacters, getCharacter } from '../services/rickandmorty_api'
import { Character } from './Character'

const CharacterSelector = () => {
  // check names and if this make sense
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBtnIsEnabled, setSearchBtnIsEnabled] = useState(true);
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    getALlCharacters().then(characters => setCharacters(characters))
  }, [setCharacters]);

  const handleSearchByNameChange = query => {
    // set menu back to default when its empty
    // also bug when switching from menu to search or viceversa state is strange, its mixed
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
    // if (!selectedCharacterId && !!searchQuery) {
    //   alert('Ooops! You must choose a character.')
    //   return
    // }
    // setCharacterId(selectedCharacterId);
    if (selectedCharacterId) {
      const chara = await getCharacter(selectedCharacterId)
      const similarCharacters = characters
        .filter(char => char.species === chara.species)
        .map(item => item['name'])

      setCharacter({
        ...chara,
        similarCharacters,
      })
    }
  }

  // console.log('characters: ', characters)

  return !characters
    ? null
    : (
      <div className="pt4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" className="mw5 center db" alt="Rick and Morty" />
        <p className="pt3 f4 b lh-title mt0 mb4 mb5-ns word-wrap tc">Search episodes by character</p>
        <form onSubmit={handleClick}>
          <div className="flex justify-around">
            <div className={!!searchQuery ? 'o-30' : null}>
              <label className="db tc pb2">Choose by dropdown:</label>
              <select disabled={!!searchQuery} onChange={(e) => setSelectedCharacterId(e.target.value)} name="character" id="character">
                <option value="">Choose a characer</option>
                {characters.map(character => (
                  <option key={character.id} value={character.id}>{character.name}</option>
                ))}
              </select>
            </div>
            <div>or</div>
            <div>
              <label className="db tc pb2">Type character name:</label>
              <input
                onChange={e => handleSearchByNameChange(e.target.value)}
                type="text"
                placeholder="e.g. Rick Sanchez "
                className="pa1 br2 w-100"
              />
            </div>
          </div>
          <button
            disabled={!searchBtnIsEnabled}
            className={`br2 white b pa2 center db mv3 bn grow pointer ${searchBtnIsEnabled ? 'bg-green' : 'bg-gray'}`}
            type="submit">
            SHOW EPISODES
        </button>
        </form>
        <Character character={character} />
      </div>
    )
}

export default CharacterSelector