import api from './api.js';

const QUOTES_API='https://quotes-api-keepcoding.herokuapp.com/api/v1';

const {createQuote}=api(QUOTES_API);

export const quoteTemplate=({quote,date})=>`
<div class="List-item">
    <p>${quote}</p>
    <span>${date}</span>
</div>    
`;

const addQuoteListener=id=>{
    const quotesForm=document.querySelector('#quote-form');
    const quotesInput =document.querySelector('#quote');
    const quoteList=document.querySelector('#quoteList');
    // quotesForm.addEventListener('submit',async evt =>{
    //     evt.preventDefault();
    //     try {
    //         if(quotesInput.validity.valid){
    //            const response= await createQuote(id, quotesInput.value);
    //             quoteList.innerHTML+=quoteTemplate(response);
    //            // const data=await getQuote(id);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         //handle error
    //     }
    // });
};

export default addQuoteListener;