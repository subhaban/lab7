import {
    info
} from './personal.js';


//--Shortcut variables for the buttons and the body.
//const container = document.querySelector('#container');
const btn = document.querySelector("#btn");
const typeBtn = document.querySelector("#typebtn");
const para = document.createElement('p');


// Adding Events to the butons----//
// --- Event for Random Button ---//
btn.addEventListener('click', (e) => {
    randomWord();
})

// --- Event for Input Button --//
typeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    typeWord();
})

//------Functions --------//
//---Fuction for random words.--//
//Using the fetch method from random word API--//
const randomWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
        .then(response => {
            return response.json();
        })
        .then(response => {
            //console.log(response[0]);
            let word = response[0];
            let h3 = document.createElement('H3');

            h3.textContent = word;
            let title = document.querySelector("#title");
            title.innerHTML = "";
            title.append(h3);
            
            wordDefinition(word);

        })
        .catch(err => {
            console.log("Error", err);

        })
    
}

//--- Function for getting the word definition---//
//---Using the Fetch command  to get the dictionary API ----//
const wordDefinition = (word) => {
    
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${info.key}`)
        .then(response => {
            return response.json();

        })
        .then(response => {
           console.log(response);
            if (response[0].shortdef !== undefined) {
                para.textContent = `Definition: ${response[0].shortdef}`;
            } else {
                para.textContent = `Sorry ! No Definition Available`;
            }
            let def = document.getElementById("def");
            def.innerHTML = "";
            def.appendChild(para);

        })
        .catch(err => {
            console.log("Error", err);
        })
}

//----Function to get the typed word ---
const typeWord = () => {
    let text = document.querySelector('input').value;
    let h3 = document.createElement('H3');
    h3.textContent = text;

    let title = document.querySelector("#title");
    title.innerHTML = "";
    title.append(h3);
    
    wordDefinition(text);

}