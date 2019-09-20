/*eslint-disable no-undef*/
import { renderBeersDOM } from './beers.js';
import {hideFilter,showFilter} from './navbar.js'
import {showQuotesForm,hideQuotesForm} from './ui.js';
import renderDetail from './detail.js';
import addQuoteListener from './quotesForm.js';
//import {handleNavbar} from './navbar.js';

page('/',() =>{
  console.log('Home page');
  //handleNavbar('no-filter','filter');
  const head = document.querySelector('header');
  head.classList.remove('header-hide');
  showFilter();
  //hideQuotesForm();
  renderBeersDOM();
});

page('/detail/:id', ctx=>{
  console.log('Detail');
  const{params: { id } }=ctx;
  //    handleNavbar('filter','no-filter');
  hideFilter();
  showQuotesForm();  
  renderDetail(id);
  addQuoteListener(id);
});
page();
