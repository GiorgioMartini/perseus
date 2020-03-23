import React, { useEffect, useState } from 'react'
import { getALlCharacters, getCharacter } from '../services/rickandmorty_api'
import CharacterSelector from './CharacterSelector'

const CharacterSelectorContainer = () => {
  const [characters, setCharacters] = useState(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
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
      setSelectedCharacterId(selectedCharacterId)
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
    : <CharacterSelector
        handleClick={handleClick}
        searchQuery={searchQuery}
        selectedCharacterId={selectedCharacterId}
        characters={characters}
        searchBtnIsEnabled={searchBtnIsEnabled}
        error={error}
        character={character}
        setSelectedCharacterId={setSelectedCharacterId}
        handleSearchByNameChange={handleSearchByNameChange}
      />
}

export default CharacterSelectorContainer