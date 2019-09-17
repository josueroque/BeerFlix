
const API_KEY = 'YRSCXXT-K8C4DJJ-KRQJ83X-ERCJAMG';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1') => {
 // const searchAPIEndpoint = `${API_URL}/beers`;
  const beersAPIEndpoint = `${API_URL}/beers`;
  return {
    getBeers: async text => {
      try {
        const requestUrl = text ? `${beersAPIEndpoint}${text}` : beersAPIEndpoint;
      //  console.log(await requestUrl);
        const response = await fetch(requestUrl
          ,{
          method:'GET',
          headers:{
          'X-API-KEY':API_KEY},
        });

        
        if (!response.ok) {
          throw new Error('Error fetching beers');
        }
        //console.log( response);
        const data = await response.json();
      //  console.log(typeof(data));
        // const formatData = data.forEach(item => {
        //   // if (item.show) {
        //   //   return item.show;
        //   // }
        //   console.log(item);
        //   return item;
         
        // });

        //return formatData;
        console.log(data);
        return data['beers'];
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
    getBeerDetail: async id => {
      try {
      //  const requestUrlId = text ? `${beersAPIEndpoint}${text}` : beersAPIEndpoint;
      const requestUrlId = `${beersAPIEndpoint}/${id}`;
        const response = await fetch(requestUrlId
          ,{
          method:'GET',
          headers:{
          'X-API-KEY':API_KEY},
        });
      //  console.log(response);
        if (!response.ok) {
          throw new Error('Error getting a beer');
        }
        const beer = await response.json();
        console.log(beer['beer']);
        return beer['beer'];
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getQuotes: async id=>{
      try {
        const response=await fetch(`${API_URL}/quote/${id}`);
        if(!response.ok){
          throw new Error('Error fetching quotes');
        }
        const quotes =await response.json();
        return quotes;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    createQuote: async (id,text) =>{
      try {
        const response=await fetch(`${API_URL}/quote/${id}`,{
           method:'POST',
           body:JSON.stringify({quote:text}),
           headers:{
             'Content-type':'application/json',
             'X-API-KEY':API_KEY,
           }, 
        });
        if(!response.ok){
          throw new Error('');
        }
        const responseBody=await response.json();
        return responseBody;
      } catch (err) {
        console.err(err);
        throw err;
      }
    },
  };
};

export default api;
