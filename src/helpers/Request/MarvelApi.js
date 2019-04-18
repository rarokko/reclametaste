import axios from 'axios';

class MarvelApi {

  constructor() {
    this.PUBLIC_API_KEY = 'fc84026e09ba6b818abec750c6c5868f';
  }

  getCharacters(keyword="", offset=0) {
    keyword = keyword !== "" ? `&nameStartsWith=${keyword}` : "";
    offset = offset !== 0 ? `&offset=${offset}` : "";
    return axios.get(`https://gateway.marvel.com/v1/public/characters?apikey=${this.PUBLIC_API_KEY}${keyword}${offset}`);
  };
  
  getComics(keyword="", offset=0) {
    keyword = keyword !== "" ? `&titleStartsWith=${keyword}` : "";
    offset = offset !== 0 ? `&offset=${offset}` : "";
    return axios.get(`https://gateway.marvel.com/v1/public/comics?apikey=${this.PUBLIC_API_KEY}${keyword}${offset}`);
  };
};

var marvelApi = new MarvelApi();
export default marvelApi;
