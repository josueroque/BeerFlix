
const API_KEY = 'YRSCXXT-K8C4DJJ-KRQJ83X-ERCJAMG';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1') => {
 // const searchAPIEndpoint = `${API_URL}/beers`;
  const beersAPIEndpoint = `${API_URL}/beers`;
  return {
    getBeers: async (text,date) => {
      try {
        console.log('desde getbeers'+text+' '+date);
       // console.log('desde api'+date);
        const requestUrl = text ? `${beersAPIEndpoint}?search=${text}` : beersAPIEndpoint;
      // console.log('desde navbar'+ requestUrl);
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

       // console.log(data['beers']);
        if(date){
  
          let parts =date.split('-');
          // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
         // January - 0, February - 1, etc.
          let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
          
        let beersArray=[];
         data.beers.map(item =>{

          
          let month1;
          let month2;
          let year1;
          let year2;
          if ((`${mydate.getMonth()+1}`)<=9){
            month1=`0${mydate.getMonth()+1}`;
          }
          else{
            month1=`${mydate.getMonth()+1}`;
          } 
          month2=item['firstBrewed'].split('').splice(0,2).join('');
         //console.log('month2 '+month2+'month1 '+month1 );

          year1=mydate.getFullYear().toString();
          year2=item['firstBrewed'].split('').splice(3,4).join('');
         //  console.log('Y2 '+year2+'Y1 '+year1 );
         //console.log(typeof(month1)+typeof(month2)+typeof(year1)+typeof(year2) );
          if (month1===month2 & year1===year2){
            beersArray.push(item) ;
         //   console.log(typeof(month1)+typeof(month2)+typeof(year1)+typeof(year2) );
          }

         
        });
//        console.log(beersArray);
          return beersArray;
        }
        else{
          return data['beers'];
        }
        
        //return data['beers'];
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
    getBeerDetail: async (id) => {
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
       
        let commentsList=''
       if (beer['beer']['comment']){
          beer['beer']['comment'].map(item =>{
            commentsList+=item['comment'] + ', '+item['dateComment']+ '<br/>';
          });
       }
        console.log(commentsList);
        beer['beer']['commentsList']=commentsList;
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
        const response=await fetch(`${API_URL}/beers/${id}/comment`,{
           method:'POST',
           body:JSON.stringify({comment:text}),
           headers:{
             'Content-type':'application/json',
             'X-API-KEY':API_KEY,
           }, 
        });
        console.log(`${API_URL}/comment/${id}`);
       // console.log(response);
        if(!response.ok){
          throw new Error('Error creating comment');
        }
        const responseBody=await response.json();
        return responseBody;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
};

export default api;
