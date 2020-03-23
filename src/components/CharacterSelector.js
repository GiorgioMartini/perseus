import React from 'react'
import { Character } from './Character'
import Header from './Header'

const CharacterSelector = ({
  handleClick,
  searchQuery,
  selectedCharacterId,
  characters,
  searchBtnIsEnabled,
  error,
  character,
  setSelectedCharacterId,
  handleSearchByNameChange
}) => (
    <div data-testid="character-selector" className="pt4">
      <Header />
      <form onSubmit={handleClick}>
        <div className="flex justify-around">
          <div className={!!searchQuery ? 'o-30' : null}>
            <label className="db tc pb2">Choose by dropdown:</label>
            <select
              data-testid="character-menu"
              disabled={!!searchQuery}
              onChange={(e) => setSelectedCharacterId(e.target.value)}
              name="character"
              id="character"
              value={selectedCharacterId}
            >
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

export default CharacterSelector