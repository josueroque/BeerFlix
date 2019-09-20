
import api from './api.js';
//import { renderQuotes } from './quotes.js';
import {toggle,toggleClass,renderLoader} from './ui.js';

const { getBeerDetail,createQuote } = api();



const detailTemplate = ({ id, name, image, description,brewersTips,firstBrewed,commentsList }) => `
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
      <div>
      <br />
        <h2>First Brewed </h2>
        ${firstBrewed} 
      </div>
      <div >
      <br />
      <h2>Comments </h2>
        <div id="quoteList" class="comments">
          ${commentsList}
        </div>
        <div>
          <br/>
            <form id="quote-form" novalidate>
            <div >
             <input required id="quote" placeholder="Add your comment" class="input primary" type="text">
            </div>
            <br />
            <button type="submit" class="button primary">Add comment</button>
          </form> 
        </div>
      </div>
    </div>

  </div>
`;



const renderDetail = async id => {
  try {
    renderLoader('hide','show');
    const head = document.querySelector('header');
   const comments = document.getElementById('com');
    const selector = document.querySelector('main');
   // const [beer] = await Promise.all([getBeerDetail(id), renderQuotes(id)]);

   const beer= await getBeerDetail(id);
   
    toggleClass(head,'header-hide');
    selector.innerHTML =  detailTemplate(beer);
    
//Create comment
    const quotesForm=document.querySelector('#quote-form');
    const quotesInput =document.querySelector('#quote');
    const quoteList=document.querySelector('#quoteList');
    quotesForm.addEventListener('submit',async evt =>{
        evt.preventDefault();
            
            if(quotesInput.validity.valid){
               const response= await createQuote(id, quotesInput.value);
               console.log(response);
               console.log('ok: ' +response.success);
               let today = new Date().toISOString() //.slice(0, 10);


               if (response.success){
                quoteList.innerHTML+=`${quotesInput.value} , ${today} <br/>`;
                console.log('desde createQuote '+quoteList.innerHTML);
              }
               // const data=await getQuote(id);
                //quoteList.innerHTML+=quoteTemplate(response);
               // const data=await getQuote(id);
            }
          });
//Create comment
  
  } catch (err) {
    console.error(err);
  }
  finally{
    renderLoader('show','hide');
  }
};

export default renderDetail;