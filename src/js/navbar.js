
// console.log('navbar');
import { toggle } from './ui.js';
import { renderBeersDOM } from './beers.js';
import storage from './storage.js';

// const { toggle: className } = require('./ui.js'); ()

const {setItem,getItem}=storage();
const navbar = document.querySelector('#navbar');
const searchIcon = document.querySelector('#navbar-search');
const closeIcon = document.querySelector('#navbar-close');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#navbar .input.search');

console.log('comprobacion' + searchInput.value);
searchInput.value=getItem('navbar-input');
console.log('comprobacion2' + searchInput.value);

const handleNavBar = toggle(navbar);

searchIcon.addEventListener('click', () => (
  handleNavBar('no-search', 'search')
));


closeIcon.addEventListener('click', () => {
  toggle(navbar)('search', 'no-search');
});

searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  //console.log('desde navbar' + searchInput.validity.valid);
  if (searchInput.validity.valid) {
    // render shows
    setItem('navbar-input',searchInput.value);
    console.log('desde navbar 3'+searchInput.value);
    renderBeersDOM(searchInput.value);
  }
});

const hideFilter=()=>handleNavBar('filter','no-filter');
const showFilter=()=>handleNavBar('no-filter','filter');
// const hideFilter=handleNavBar.bind(this,'filter','no-filter');
// const showFilter=handleNavBar.bind(this,'no-filter','filter');
//console.log(hideFilter);

export {hideFilter,showFilter};
//export {handleNavbar};