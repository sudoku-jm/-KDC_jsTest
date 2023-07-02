import config from './config.js';
import msg from './msg.js';

const { API_ENDPOINT } = config;
const { REQUEST_ERROR } = msg;

const request = async(url) => {

  try{
    const result = await fetch(url);
    // console.dir(result.status);  
    if(result.status === 200){
      return result.json();
    }else{
      throw REQUEST_ERROR[result.status]; 
    }
  }catch(err){
    console.log(err);
    alert(err.msg);
    return {
      data : null,
    }
  }
}

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithLimit: (keyword,limit) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`);
  },
  fetchCatsPage: (keyword, page) => {
    console.log('fetchCatsPage',keyword,page);
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats : () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};


export default api;