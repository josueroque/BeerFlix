
import api from './api.js';
import { renderQuotes } from './quotes.js';
import {toggle,toggleClass} from './ui.js';

const { getBeerDetail } = api();
//console.log('prueba'+ beerId+image+name+description);
//console.log(beerId);
const detailTemplate = ({ id, name, image, description,brewersTips }) => `
  <div class="detail-section">
    <header id="${id}">
      <div class="title-section">
        <h1>${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image : 'default.jpg'}"  />
      </div>
    </header>
    <div class="content">
      <div>
        <h2>Description</h2>
        ${description}
      </div>
      <div>
        <br />
        <h2>Brewers Tips</h2>
        ${brewersTips} 
      </div>
    </div>
  </div>
`;

const renderDetail = async id => {
  try {
    const head = document.querySelector('header');
    const selector = document.querySelector('main');
    const [beer] = await Promise.all([getBeerDetail(id), renderQuotes(id)]);
    //  const show = await getShowDetail(id);
    //  await renderQuotes(id);
    toggleClass(head,'header-hide');
    selector.innerHTML = detailTemplate(beer);
  } catch (err) {
    console.error(err);
  }
};

export default renderDetail;