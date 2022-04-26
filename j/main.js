import {info} from './personal.js';


//--Shortcut variables for the buttons and the body.
const container= document.querySelector('#container');
//const body = document.querySelector('body');
//const h2= document.createElement('h2');
//body.appendChild(h2);
//h2.textContent ='Random Word Generator and its Definition';
const btn = document.querySelector("#btn");
const typeBtn = document.querySelector("#typebtn");
const word = document.createElement('h3');
const definition = document.createElement('p');


// Adding Events to the butons----//
// --- Event for Random Button ---//
btn.addEventListener('click',(e)=>{
    randomWord();  
}) 

// --- Event for Input Button --//
typeBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    typeWord();
})

//------Functions --------//
//---Fuction for random words.--//
//Using the fetch method from random word API--//
const randomWord = () =>{
    fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(response =>{
          return response.json();
    })
     .then (response =>{
         console.log(response);
       
       word.textContent = response;
       container.appendChild(word);
       wordDefinition(word);

     })
      .catch(err =>{
          console.log("Error", err);
          
      }) 
 }

//--- Function for getting the word definition---//
//---Using the Fetch command  to get the dictionary API ----//
const wordDefinition = (word) =>{
     console.log(word);
     fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=${info.key}`)
     .then( response => { 
         return response.json();
         
     })
     .then (response =>{
         console.log(response);
         if(response[0].shortdef !== undefined){
            definition.textContent =  `Definition: ${response[0].shortdef}`;
         }else{
            definition.textContent = `Sorry ! No Definition Available`;
         }
        
         container.appendChild(definition);

     })
     .catch( err=>{
         console.log("Error", err);
     })
 }

 //----Function to get the typed word ---
const typeWord =() =>{
    let text = document.querySelector('input').value;
      word.textContent = text;
    console.log(text);
    wordDefinition(word);
  
  }


 