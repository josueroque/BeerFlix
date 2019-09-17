
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
          <div class="rating-container">
            <button class="icon">
              <i class="fas fa-star"></i>
            </button>
            <button class="icon">
              <i class="far fa-star"></i>
            </button>
            <button class="icon">
              <i class="far fa-star"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </a>
`;

const renderBeers = (element, beers ) => {
 console.log(beers);
  const htmlBeers = beers.slice(0,10).map((beer,index) =>{
    // if(index<2){
    //   return templateBeer({...beer,principal:true});
    // }
       return templateBeer({...beer,principal:false});
    }).join('')
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

const renderBeersDOM = async text => {
  try {
    renderLoader('hide','show');
    const mainSection = document.querySelector('main');
    const items = await getBeers(text);
    renderBeers(mainSection, items);
  } catch (err) {
    console.error(err);
  }finally{
    renderLoader('show','hide');
  }
};



export { renderBeersDOM };
