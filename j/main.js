import {info} from './env.js';

const container= document.querySelector('#container');
//const body = document.querySelector('body');
//const h1= document.createElement('h1');
//container.appendChild(h1);
//h1.textContent ='Random Word Generator and its Definition';
const btn = document.querySelector("#btn");
const word = document.createElement('h3');
const definition = document.createElement('p');

btn.addEventListener('click',(e)=>{
    randomWord();
   
}) 

const randomWord = () =>{
    fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(response =>{
          return response.json();
    })
     .then (response =>{
         //console.log(response);
       
       word.textContent = response;
       container.appendChild(word);
       wordDefinition(word);

     })
      .catch(err =>{
          console.log("Error", err);
          
      }) 
 }
const wordDefinition = (word) =>{
     console.log(word.textContent);
     fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=${info.key}`)
     .then( response => {
         return response.json();
     })
     .then (response =>{
         console.log(response[0].shortdef);
         if(response[0].shortdef !== undefined){
            definition.textContent = ` Definition: ${response[0].shortdef}`;
         }else{
            definition.textContent = `Sorry No Definition Available`;
         }
        
         container.appendChild(definition);

     })
     .catch( err=>{
         console.log("Error", err);
     })
 }

 


 