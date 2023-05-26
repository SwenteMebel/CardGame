"use strict";

let spelersNaam = prompt('Welkom het kaartspel Memory, wat is uw naam?')
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
const selecteer = document.getElementById('selecteer');
let teller = document.getElementById('teller');
let tijd = document.getElementById('tijd')
myField.addEventListener('click', onClickCard);

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
let imageURL = 'img/' + card.card1 + '.jpg';
newTile.setAttribute('class', boardClass);
cover.setAttribute("src", "img/cover.png");
cover.setAttribute('class', 'covered');
newCard.setAttribute('src', imageURL);
newCard.setAttribute('name', card.card1);
newTile.appendChild(newCard);
newTile.appendChild(cover);
myField.appendChild(newTile);
});
}





let eersteCard;
let tweedeCard; // gelkpzem 
let poging = 0; // houdt de telling bij van de aantal pogingen. 
let gekozenCard = [];  // komen de gekozen kaarten in
let compleetCard = []; // bewaard alle value's die overeen komen
let matchteller = 0; // teller die de match bijhoudt
let matchtellerMin = 0 


function onClickCard(e){
  // Zien welke kaarten je hebt gekozen. 
    if (e.target.className === 'covered'){
        e.target.className = 'uncovered';
    };
    
if(!eersteCard){
    eersteCard = e.target.parentNode.firstChild.getAttribute('name');
    console.log('EersteCard = ' + eersteCard) 
    return;
}

if(!tweedeCard){
    tweedeCard = e.target.parentNode.firstChild.getAttribute('name');
    console.log('tweedeCard = ' + tweedeCard) 
    
    
}

setInArray()

}
// zet de gekozen elementen in een array.
function setInArray(){
gekozenCard.push(eersteCard, tweedeCard)
console.log(gekozenCard)
if(gekozenCard.length = 2){
    setTimeout(() => {
        matchbekijken() 
    })
}
}

// bekijkt of er een match is, zo ja verwijderen, zo niet, dan weer omdraaien naar de class'covered'
// Als er een match is zet hij ze in een array om het te onthouden. 
function matchbekijken(){
    myField.removeEventListener('click', onClickCard)
    let uncoveredElement = document.querySelectorAll('.uncovered');
    let imgDier = document.querySelector('#field > div > img')
    let coverImg = document.querySelector('#field > div > img > img')
    let eersteCard = gekozenCard[0];
    let tweedeCard = gekozenCard[1];
   

if(eersteCard === tweedeCard && gekozenCard != ''){
    console.log('Match!')
    compleetCard.push(eersteCard,tweedeCard)
    setTimeout(() =>{
            alert('Match!')
    
            uncoveredElement.forEach(function(element){
            element.parentNode.firstChild.remove(imgDier);
            element.parentNode.firstChild.remove(coverImg);  
        })
    });
    console.log('Gevonden sets ' + compleetCard + ', ')
} else{
    setTimeout(() =>{
            alert('Helaas, probeer het opnieuw!')
           
            uncoveredElement.forEach(function(element){
            element.classList.remove('uncovered'); 
            element.classList.add('covered'); 
        })
    })
    
}

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
// leeg gooien, en dmyField.addEventListener('click', onClickCard) weer activeren na elke keer dat er 2 clicks zijn gedaan
function leeggooien(){
gekozenCard = [];
eersteCard = ''; 
tweedeCard = '';
myField.addEventListener('click', onClickCard)
}

// nog beter uitwerken.
wissen.addEventListener('click', function(){
    gekozenCard = [];
    compleetCard= [];
    eersteCard = ''; 
    tweedeCard = '';
    let matchtellerMin = 0;
    poging = 0;
    document.getElementById('goedeMatch').innerHTML = 'Aantal matchen: ' + matchtellerMin;
    document.getElementById('teller').innerHTML = 'Pogingen: ' +  poging;
    
});

stopGame.addEventListener('click', function(){
    gekozenCard = [];
    compleetCard= [];
    eersteCard = ''; 
    tweedeCard = '';
    let matchtellerMin = 0;
    poging = 0;
    document.getElementById('goedeMatch').innerHTML = 'Aantal matchen: ' + matchtellerMin;
    document.getElementById('teller').innerHTML = 'Pogingen: ' +  poging;
    alert('Score van ' + spelersNaam + '\n\nAantal pogingen: ' + poging + '\nAantal Matchen: ' + matchtellerMin + ' \nTijd:' )
});
