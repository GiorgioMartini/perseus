import axios from 'axios';
export const baseUrl = 'https://rickandmortyapi.com/api/';
export const charactersUrl = `${baseUrl}character/`;
export const episodesUrl = 'https://rickandmortyapi.com/api/episode/';

export const getALlCharacters = async () => {
  const result = await axios.get(charactersUrl).then(({data}) => data);
  if (!result) throw new Error('Something went wrong fetching characters')
  const formatedResult = result.results.map(item => ({
    id: item.id,
    name: item.name,
    url: item.url,
    species: item.species,
  }));
  return formatedResult;
}

export const getCharacter = async (id) => {
  const character = await axios.get(`${charactersUrl}${id}`).then(({data}) => data);
  if (!character) throw new Error('Something went wrong fetching character')

  const formatedCharacter = {
    name: character.name,
    image: character.image,
    species: character.species,
    gender: character.gender,
    episode: character.episode,    
    similarCharacters: character.similarCharacters,    
    id: character.id,
  }
  const episodes = await getEpisodes(formatedCharacter.episode)
  const characterWithEpisodes = { ...formatedCharacter, episodes: episodes }
  delete characterWithEpisodes.episode
  
  return characterWithEpisodes; 
}

export const getEpisodes = async (urls) => {
  const result = await Promise.all(urls.map(url => axios(url)))
  if (!result) throw new Error('Something went wrong fetching episodes')
  const formatedEpisodes = result
    .map(item => item['data'])
    .map(item => item['name'])
  return formatedEpisodes; 
}
