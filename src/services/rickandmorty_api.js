import axios from 'axios';
export const baseUrl = 'https://rickandmortyapi.com/api/';
export const charactersUrl = `${baseUrl}character/`;
export const episodesUrl = 'https://rickandmortyapi.com/api/episode/';

export const getCharacter = async (id) => {
  const character = await axios.get(`${charactersUrl}${id}`).then(({data}) => data);
  const episodes = await Promise.all(character.episode.map(url => axios(url)))
  const formatedEpisodes = episodes
    .map(item => item['data'])
    .map(item => item['name'])

  return {
    ...character,
    episodes: formatedEpisodes,
  }; 
}

export const getEpisodes = async (url) => {
  const result = await axios.get(`episodesUrl${url}`).then(({data}) => data);
  return result; 
}
  
// ADD CATCH ERRORS !!!
export const getALlCharacters = async () => {
  const result = await axios.get(charactersUrl).then(({data}) => data);
  const formatedResult = result.results.map(item => ({
    id: item.id,
    name: item.name,
    url: item.url,
  }));
  return formatedResult;
}


