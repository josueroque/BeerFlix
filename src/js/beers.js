
import { toggleClass, renderLoader } from './ui.js';
import api from './api.js';

const templateBeer = ({ beerId,principal, name, image, description }) => `
<a href="/detail/${beerId}">
    <div class="card ${principal ? 'principal' : 'secondary close'}">
      <header class="card-header">
        <h2>${name}</h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image ? image : 'default.jpg'}">
        </div>
        <div class="card-content-text">
          <p>${description}
          </p>
        


        </div>
      </div>
    </div>
  </a>
`;
// ${ comment.forEach(com => { 
//   <p>${com['comment']}
//   </p>

//   }) } 

const renderBeers = (element, beers ) => {
 //console.log(beers);
  const htmlBeers = beers.slice(0,10).map((beer) =>{
    // if(index<0){
    //   return templateBeer({...beer,principal:true});
    // }
       return templateBeer({...beer,principal:false});
    }).join('');
  element.innerHTML = `
  <div class="show-section">

  ${htmlBeers}
  </div>
  `;
  // codigo para manejar los header
  const headers = document.querySelectorAll('.card.secondary .card-header');
  headers.forEach(header => {
    const element = header.parentNode;
    header.addEventListener('click', evt => {
      evt.preventDefault();
      toggleClass(element, 'close');
    });
  });
};

const { getBeers } = api();

const renderBeersDOM = async (text,date) => {
  try {
    renderLoader('hide','show');
    const mainSection = document.querySelector('main');
    //console.log('desde rendersbeersdom '+date);
    if (date){
      console.log(text+' '+date);
      const items = await getBeers(text,date);
      console.log(items);
      renderBeers(mainSection, items);
    }
    else {
      const items = await getBeers(text);
      console.log(items);
      renderBeers(mainSection, items);
    }
    // console.log(items);
    // renderBeers(mainSection, items);
  } catch (err) {
    console.error(err);
  }finally{
    renderLoader('show','hide');
  }
};

export { renderBeersDOM };
