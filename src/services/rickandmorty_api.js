import axios from 'axios';

export const baseUrl = 'https://rickandmortyapi.com/api/';
export const charactersUrl = `${baseUrl}character/`;
// export const characterUrl = charactersUrl;

export const getCharacter = async (id) => {
  const result = await axios.get(`charactersUrl/${id}`).then(({data}) => data)
  return result 
}
  
export const getALlCharacters = async () => {
  const result = await axios.get(charactersUrl).then(({data}) => data)
  const formatedResult = result.results.map(item => ({
    id: item.id,
    name: item.name,
    url: item.url,
  }))
  return formatedResult
}


