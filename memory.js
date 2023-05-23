"use strict";

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
const wissen = document.getElementById('opnieuw')
const selecteer = document.getElementById('selecteer');
let teller = document.getElementById('teller');
let tijd = document.getElementById('tijd')
myField.addEventListener('click', onClickCard);
wissen.addEventListener('click', opnieuw);
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
              
                break;

            case '5':
                boardClass = 'board5';
                aangepasteArray = myCardArray.slice(0,12);
               
                break;

            case '6': 
                boardClass = 'board6';
                aangepasteArray = myCardArray.slice(0,18);
                
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
let idNr= 1;
myField.innerHTML = '';   
myCardSet.forEach(card => {    
let newTile = document.createElement('div');
let newCard = document.createElement('img');
let cover = document.createElement('img');
let imageURL = 'img/' + card.card1 + '.jpg';
newTile.setAttribute('id', idNr++)
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
let tweedeCard;
let poging = 0; // houdt de telling bij van de aantal pogingen. 
let gekozenCard = [];  // komen de gekozen kaarten in
let compleetCard = []; // bewaard alle value's die overeen komen

function onClickCard(e){
    
    
// Zien welke kaarten je hebt gekozen. 
    if (e.target.className === 'covered'){
        e.target.className = 'uncovered';
        //console.log(e.target.parentNode.firstChild.getAttribute('name'))
    };
    if(!eersteCard){
        eersteCard = e.target.parentNode.firstChild.getAttribute('name');
        console.log('EersteCard = ' + eersteCard) 
        return;
    }
   
    if(!tweedeCard){
        tweedeCard = e.target.parentNode.firstChild.getAttribute('name');
        console.log('tweedeCard = ' + tweedeCard) 
        myField.removeEventListener('click', onClickCard)
        
    }
    
    setInArray()
matchbekijken(e)
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
function matchbekijken(e){
    
    let eersteCard = gekozenCard[0];
    let tweedeCard = gekozenCard[1];

    
    if(eersteCard === tweedeCard && gekozenCard != ''){
        console.log('Match!')
        compleetCard.push(eersteCard, tweedeCard)     
       
        setTimeout(() =>{
             // verwijderd match element na 500ms
             
             let clickedElement1 = e.target; 
             let clickedElement = e.target;
             console.log(clickedElement)
             console.log(clickedElement1)
             clickedElement1.parentNode.removeChild(clickedElement1);
             clickedElement.parentNode.removeChild(clickedElement); 

         });
    } else{
        setTimeout(() =>{
            //zet de class uncovered weer op de img na de 500ms
        let clickedElement = e.target;
        clickedElement.firstChild.classList('uncovered')
   
        },500)
    }

    leeggooien()
   
    //telling bijhouden per setje
    poging++;
    document.getElementById('teller').innerHTML = 'Aantal keer op een kaart geklikt: ' + poging;
}

// leeg gooien, en dmyField.addEventListener('click', onClickCard) weer activeren na elke keer dat er 2 clicks zijn gedaan

function leeggooien(){
    eersteCard= '';
    tweedeCard = '';
    gekozenCard = [];
    myField.addEventListener('click', onClickCard)
        
}

// nog beter uitwerken.
function opnieuw(){
    poging = 0;
    eersteCard= '';
    tweedeCard = '';
    gekozenCard = []; 
    compleetCard = [];

}

