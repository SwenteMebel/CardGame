"use strict";

let spelersNaam = prompt('Welkom bij de game, Memory. Wat is uw naam?', 'asdfasdfasdf')
localStorage.setItem('speler', spelersNaam )
document.getElementById('speler').innerHTML = 'Welkom: ' + localStorage.getItem('speler');
const saveSpelerNaam = localStorage.getItem('speler');
console.log(saveSpelerNaam)

class Card {
    constructor(cardObject){
        this.card1 = cardObject.card1;
        this.card2 = cardObject.card2;
        this.set = cardObject.set;
        this.sound = cardObject.sound;
    }
}



fetch('JS/cards.json')
.then(res => res.json())

.then(json => {
    console.log(json)
    myCardArray = json.map(card => new Card(card))
    
})


const myField = document.getElementById('field');
const wissen = document.getElementById('opnieuw');
const stopGame = document.getElementById('stop');
const startGame = document.getElementById('start')
const selecteer = document.getElementById('selecteer');
let teller = document.getElementById('teller');
let sec = document.getElementById('sec')
let min = document.getElementById('min')
selecteer.addEventListener("change", onSelectFieldsize);
let boardClass;
let myCardSet;






let myCardArray = ["duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster", "horse", 
"mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"];




//functie die myDblCardArray shuffelt
function schudden(array){
    var m = array.length, t, i;

    while(m){
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t 
    }
    return array;
};

// selecteert die optie die de gebruiker kiest, aan de hand hievan word de class in css gekozen.
function onSelectFieldsize(e){
        let selectGrote = e.target.value;
        let aangepasteArray = schudden(myCardArray);
        switch(selectGrote){
            case '4':
                boardClass = 'board4';
                aangepasteArray = myCardArray.slice(0,8);
                poging = 0;
                matchteller = 0;
                compleetCard= [];
                break;

            case '5':
                boardClass = 'board5';
                aangepasteArray = myCardArray.slice(0,12);
                poging = 0;
                matchteller = 0;
                compleetCard= [];
                break;

            case '6': 
                boardClass = 'board6';
                aangepasteArray = myCardArray.slice(0,18);
                poging = 0;
                matchteller = 0;
                compleetCard= [];
                break;
            default:
                break;
               
        };

        let myDblCardArray = aangepasteArray;
        myDblCardArray = myDblCardArray.concat(aangepasteArray);
        myDblCardArray = schudden(myDblCardArray); 
        myCardSet = myDblCardArray.map(card => new Card(card));
        populateField();
       

};

// bouwt de kaarten op, met div, img, en class
function populateField(){

myField.innerHTML = '';   
myCardSet.forEach(card => {    
let newTile = document.createElement('div');
let newCard = document.createElement('img');
let cover = document.createElement('img');
let source = document.createElement('source')
let sound = 'snd/' + card.card1 + '.wav';
let imageURL = 'img/' + card.card1 + '.jpg';
newTile.setAttribute('class', boardClass);
cover.setAttribute("src", "img/cover.png");
cover.setAttribute('class', 'covered');
source.setAttribute('src', sound);
source.setAttribute('type', 'audio/mpeg')
newCard.setAttribute('src', imageURL);
newCard.setAttribute('name', card.card1);
newTile.appendChild(newCard);
newTile.appendChild(cover);
newTile.appendChild(source);
myField.appendChild(newTile);
});
}





let eersteCard; 
let tweedeCard; // gekozen tweede kaart 
let poging = 0; // houdt de telling bij van de aantal pogingen. 
let gekozenCard = [];  // komen de gekozen kaarten in
let compleetCard = []; // bewaard alle value's die overeen komen
let matchteller = 0; // teller die de match bijhoudt
let matchtellerMin = 0;
let secondes = 0; // de aantal secondes

// Telt de tijd zodra er op de start knop wordt gedrukt.
startGame.addEventListener('click', function(){
    myField.addEventListener('click', onClickCard);
    stopGame.addEventListener('click', stopGames)
    setInterval(timer, 1000)
    onClickCard()
  
});



// Als je op start drukt loopt de timer en begint het spel.
function timer(){
    ++secondes;
    sec.innerHTML = pad(secondes % 60);
    min.innerHTML = pad(parseInt(secondes / 60));          
   
}
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
    
}

// Zien welke kaarten je hebt gekozen. 
function onClickCard(e){
    if (e.target.className === 'covered'){
        e.target.className = 'uncovered';
    };
    
    if(!eersteCard){
        eersteCard = e.target.parentNode.firstChild.getAttribute('name');
        console.log('EersteCard = ' + eersteCard) 
        return;
    }

    if(!tweedeCard && tweedeCard != eersteCard){
        tweedeCard = e.target.parentNode.firstChild.getAttribute('name');
        console.log('tweedeCard = ' + tweedeCard) 
    }
    myField.removeEventListener('click', onClickCard)
    setinArray()
}

// Zet de gekozen kaarten in een Array
function setinArray(){
    gekozenCard.push(eersteCard, tweedeCard)
    console.log(gekozenCard)
    
    if(gekozenCard.length != 1){
        setTimeout(() => {
            matchbekijken() 
        })
    }
}

// bekijkt of er een match is, zo ja verwijderen, zo niet, dan weer omdraaien naar de class'covered'
// Als er een match is zet hij ze in een array om het te onthouden. 
function matchbekijken(){
    
    let uncoveredElement = document.querySelectorAll('.uncovered');
    let imgDier = document.querySelector('#field > div > img')
    let coverImg = document.querySelector('#field > div > img > img')
    let eersteCard = gekozenCard[0];
    let tweedeCard = gekozenCard[1];
   

if(eersteCard === tweedeCard && gekozenCard != ''){
    console.log('Match!')
    compleetCard.push(eersteCard,tweedeCard)
    setTimeout(() =>{
           
    
            uncoveredElement.forEach(function(element){
            element.parentNode.firstChild.remove(imgDier);
            element.parentNode.firstChild.remove(coverImg);  
        })
    },700);
    console.log('Gevonden sets ' + compleetCard + ', ')
} else{
    setTimeout(() =>{
            
           
            uncoveredElement.forEach(function(element){
            element.classList.remove('uncovered'); 
            element.classList.add('covered'); 
        })
    },700)
    
}
setTimeout(()=>{
    myField.addEventListener('click', onClickCard)
},800)

leeggooien()
telling()
matchcounter()
} 

//telling bijhouden per setje
function telling(){
    poging++;
    document.getElementById('teller').innerHTML = 'Pogingen: ' +  poging + '</b>';
}
function matchcounter(){
    matchteller = compleetCard.length;
    let matchtellerMin = matchteller / 2; 
    if(matchtellerMin >= 0){
        document.getElementById('goedeMatch').innerHTML = 'Aantal matchen: ' + matchtellerMin;
    } 
}
// leeg gooien, en myField.addEventListener('click', onClickCard) weer activeren na elke keer dat er 2 clicks zijn gedaan
function leeggooien(){
gekozenCard = [];
eersteCard = ''; 
tweedeCard = '';

}

// nog beter uitwerken.
wissen.addEventListener('click', function(){
    alert('U hebt op "Reset" gedrukt, de game begint opnieuw.')
    setTimeout(() =>{
        location.reload();
        gekozenCard = [];
        compleetCard= [];
        eersteCard = ''; 
        tweedeCard = '';
        let matchtellerMin = 0;
        poging = 0;
        
        document.getElementById('goedeMatch').innerHTML = 'Aantal matchen: ' + matchtellerMin;
        document.getElementById('teller').innerHTML = 'Pogingen: ' +  poging;
    },1000);


});


function stopGames(){
    matchteller = compleetCard.length;
    let matchtellerMin = matchteller / 2; 
    alert('Score van => ' + spelersNaam  + '\n\nAantal pogingen: ' + poging + '\nAantal Matchen: ' + matchtellerMin + ' \nTijd in secondes: '+ secondes )

    setTimeout(() =>{
        location.reload()
        gekozenCard = [];
        compleetCard= [];
        eersteCard = ''; 
        tweedeCard = '';
        matchtellerMin = 0;
        poging = 0;
    },1000);   
};

/* 
localStorage.setItem('Pogingen', poging)
localStorage.setItem('Matchen', matchtellerMin)
localStorage.setItem('Secondes', secondes);


let savePogingen = localStorage.getItem('Pogingen');
let saveMatchen = localStorage.getItem('Matchen');
let saveSecondes = localStorage.getItem('Secondes')

document.getElementById('scoreNaam').innerHTML = 'Speler: ' + saveSpelerNaam;
document.getElementById('scorePogingen').innerHTML = 'Pogingen: ' + savePogingen;
document.getElementById('scoreTijd').innerHTML = 'Tijd: ' + saveSecondes;
document.getElementById('matches').innerHTML = 'Matchen: ' + saveMatchen;

console.log('Aantal secondes: ' + saveSecondes)
console.log(savePogingen, saveMatchen, saveSecondes, saveSpelerNaam )
*/

