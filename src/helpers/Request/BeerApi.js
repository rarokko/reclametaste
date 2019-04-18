import axios from 'axios';

class BeerApi {

  getBeers(keyword = "", filterName, page=1) {
    keyword = keyword !== "" ? `&${filterName}=${keyword}` : "";
    return axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=20${keyword}`);
  };
};

var beerApi = new BeerApi();
export default beerApi;
