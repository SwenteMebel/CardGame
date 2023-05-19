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
    matchbekijken()
}

function setInArray(){
    gekozenCard.push(eersteCard, tweedeCard)
    console.log(gekozenCard)
    if(gekozenCard.length = 2){
        setTimeout(() => {
            matchbekijken() 
        })
    }
}

function matchbekijken(){
    let cards = document.querySelectorAll('img')
    let eersteCard = gekozenCard[0];
    let tweedeCard = gekozenCard[1];
    if(eersteCard === tweedeCard && gekozenCard != ''){
        console.log('Match');
        compleetCard.push(eersteCard, tweedeCard)
        console.log('Array met match kaarten, BEWAREN! ' + compleetCard)
        setTimeout(() =>{
            // verwijderd match element na 500ms
         },500);
    } else{
        console.log('helaas probeer het opnieuw!')
        setTimeout(() =>{
            //zet de class uncovered weer op de img na de 500ms
            document.querySelector('#field > div > img').classList = 'covered'
        },500)
       
       
    }
    eersteCard= '';
    tweedeCard = '';
    gekozenCard = [];
    poging++;
    document.getElementById('teller').innerHTML = 'Aantal keer op een kaart geklikt: ' + poging -1;
    
}

/*
    if(!eersteCard){
        eersteCard = e.target.parentNode.firstChild.getAttribute('name');
        console.log('EersteCard = ' + eersteCard) 
        
        return
    }
    if(!tweedeCard){
        tweedeCard = e.target.parentNode.firstChild.getAttribute('name');
    console.log('tweedeCard = ' + tweedeCard) 
        return
    }
   
}     

setInArray()
function setInArray(){
    gekozenCard.push(eersteCard, tweedeCard)
    if(gekozenCard.length === 2){
        setTimeout(nakijkenMatch, 500)
    }
    console.log(gekozenCard)
}

function nakijkenMatch(){
    let cards = document.querySelectorAll('img');
    console.log(cards)
    let optieEenID = gekozenCard[0];
    let optieTweeID = gekozenCard[1];
   
    if(gekozenCard[0] === gekozenCard[1]){
        alert('match')
        cards[optieEenID].setAttribute('src', 'imgwit/wit.jpg')
        cards[optieTweeID].setAttribute('src', 'imgwit/wit.jpg')
        gevondenCard.push(gekozenCard);
        
        console.log('Gevonden kaarten ' + gevondenCard);
    } else {

        cards[optieEenID].setAttribute('src', 'imgwit/wit.jpg')
        console.log('dit is foute match ' + optieTweeID)
        alert('Sorry, probeer het opnieuw')
      
       
        
    }
    optieEenID = '';
    optieTweeID = '';
    eersteCard = '';
    tweedeCard = '';
    gekozenCard = []; 
    
}

function keepScore(){
    klikTeller++;
    document.getElementById('teller').innerHTML = 'Aantal keer op een kaart geklikt: ' + klikTeller;
};
};


function evaluateMatch(){
   
    if(eersteCard === tweedeCard){
        console.log('match!')
    } else {
        console.log('helaas probeer het opnieuw')
       
    }
    console.log('eersteCard ' + eersteCard + ' TweedeCard ' + tweedeCard)
}


function evaluateMatch(){  
// nakijken of ze overeen komen.  
let match = eersteCard === tweedeCard;
console.log(match)

 match ? disableCards() : omdraaienCards();
};

function disableCards(){
 // als ze een match zijn dan uitschakelen of verwijderen en de waardes moeten worden leeg gegooid.
 let match = eersteCard == tweedeCard;
    console.log(match)
    setTimeout( () => {
        alert('match')
        resetGame()
    },1000)
    return;
}

function omdraaienCards(e){
console.log(eersteCard, tweedeCard + ' in de fuctie omdraaienCards' )
    // als ze geen match zijn dan moeten ze omdraaien en leeg gooien
  setTimeout(() => {
    if(e.target.className === 'uncovered'){
        e.target.className = 'covered'
    } else {
        e.target.className = 'covered'
    }
    resetGame()
  }, 1000)
}

function keepScore(){
    klikTeller++;
    document.getElementById('teller').innerHTML = 'Aantal keer op een kaart geklikt: ' + klikTeller;
};


function resetGame(){
// de waardes resetten na de 2 kliks
eersteCard = '';
tweedeCard = '';
console.log('Functie resetGame(), EersteCard = ' + eersteCard + ' tweedeCard = ' + tweedeCard )

};
*/






