import React from 'react'
import CharacterSelector from '../CharacterSelectorContainer'
import { getALlCharacters, getCharacter } from '../../services/rickandmorty_api'
import {render, cleanup, waitForElement, fireEvent} from '@testing-library/react';

jest.mock('../../services/rickandmorty_api', () => ({
  getALlCharacters: jest.fn(),
  getCharacter: jest.fn()
}))

const headline = 'Search episodes by character'
const characters = [
  {
    "id": 1,
    "name": "Rick Sanchez",
    "url": "https://rickandmortyapi.com/api/character/1",
    "species": "Human"
  },
  {
    "id": 2,
    "name": "Morty Smith",
    "url": "https://rickandmortyapi.com/api/character/2",
    "species": "Human"
  }
];

const singleCharacter = {
  "name": "Rick Sanchez",
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "species": "Human",
  "gender": "Male",
  "similarCharacters": [
    "Rick Sanchez",
    "Morty Smith"
  ],
  "id": 1,
  "episodes": [
    "Pilot",
    "Lawnmower Dog",
  ]
};

beforeEach(() => {
  cleanup();
})

describe('<CharacterSelectorContainer />', () => {
  getALlCharacters.mockImplementation(() => Promise.resolve(characters))
  getCharacter.mockImplementation(() => Promise.resolve(singleCharacter))

  test('It fetches initial data correclty and populates the menu items',async () => {  
      const {getAllByTestId, getByTestId, queryByTestId} = render(<CharacterSelector />)
      await waitForElement(() => [
        expect(queryByTestId('error')).toBeFalsy(),
        expect(getByTestId('headline')).toBeTruthy(),
        expect(getAllByTestId('character-menu-item')).toHaveLength(2),
        characters.map((item, i) => expect(getAllByTestId('character-menu-item')[i].textContent).toEqual(item.name)),
        expect(getByTestId('headline').textContent).toEqual(headline)
      ])
  })  

  test('It fetches the selected charatcer and shows it on the page when using dropdopwn', async () => {
    const { getByTestId } = render(<CharacterSelector />)
    const characterMenu = await waitForElement(() => getByTestId('character-menu'))
    fireEvent.change(characterMenu, { target: { value: 1 }})
    fireEvent.click(getByTestId('submit'))
    const characterCard = await waitForElement(() => getByTestId('character-card'))
    const characterName = await waitForElement(() => getByTestId('character-name'))
    const characterSpecies = await waitForElement(() => getByTestId('character-species'))
    const characterGender = await waitForElement(() => getByTestId('character-gender'))

    expect(characterCard).toBeTruthy()
    expect(characterName.textContent).toEqual(`Name: ${singleCharacter.name}`)
    expect(characterSpecies.textContent).toEqual(`Specie: ${singleCharacter.species}`)
    expect(characterGender.textContent).toEqual(`Gender: ${singleCharacter.gender}`)
  })

  test('It fetches the selected charatcer and shows it on the page when using searchBox', async () => {
    const { getByTestId } = render(<CharacterSelector />)
    const searchBox = await waitForElement(() => getByTestId('searchBox'))
    fireEvent.change(searchBox, { target: { value: 'rick sanchez' }})
    fireEvent.click(getByTestId('submit'))

    const characterCard = await waitForElement(() => getByTestId('character-card'))
    const characterName = await waitForElement(() => getByTestId('character-name'))
    const characterSpecies = await waitForElement(() => getByTestId('character-species'))
    const characterGender = await waitForElement(() => getByTestId('character-gender'))

    expect(characterCard).toBeTruthy()
    expect(characterName.textContent).toEqual(`Name: ${singleCharacter.name}`)
    expect(characterSpecies.textContent).toEqual(`Specie: ${singleCharacter.species}`)
    expect(characterGender.textContent).toEqual(`Gender: ${singleCharacter.gender}`)
  })
  
  test('It shows error on page if it falied to fetch characters', async () => {
    getALlCharacters.mockImplementation(() => {
      throw new Error();
    })
    const { queryByTestId } = render(<CharacterSelector />)
    expect(queryByTestId('character-selector-error')).toBeTruthy()
  })

  test('It shows error on page if it falied to fetch single character', async () => {
    getALlCharacters.mockImplementation(() => Promise.resolve(characters))
    getCharacter.mockImplementation(() => {
      throw new Error();
    })

    const { queryByTestId, getByTestId } = render(<CharacterSelector />)
    const characterMenu = await waitForElement(() => getByTestId('character-menu'))
    fireEvent.change(characterMenu, { target: { value: 1 }})
    fireEvent.click(getByTestId('submit'))
    const characterError = await waitForElement(() => queryByTestId('character-error'))
    expect(characterError).toBeTruthy()
  })
})
