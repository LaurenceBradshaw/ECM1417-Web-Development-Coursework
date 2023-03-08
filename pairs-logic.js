var cards = [];
var shown = [];
var numPairs = 3;
var score = 0;
var numToMatch = 2;
var gameBoard = document.getElementById("gameBoard");


function changeSize(cards){
    numPairs = cards;
}

function createCards(){
    // Find a random number generator and create pairs of cards with random features
    let currentCardNum = 0;
    for(let i = 0; i < numPairs; i++){
        let body = getRandomInt(3) + 1; //TODO Find if the combo of body eyes and mouth have been used?
        let eyes = getRandomInt(3) + 1;
        let mouth = getRandomInt(2) + 1;
        let card1 = new Card(currentCardNum, body, eyes, mouth);
        let card2 = new Card(currentCardNum + 1, body, eyes, mouth);

        currentCardNum += 2;
        cards.push(card1);
        cards.push(card2);
    }
}

function cardClick(num){
    clickedCard = cards.filter(c => c.num === num);
    clickedCard.show();
}

function render(){
    // Design a way of rendering cards given the dimentions of the window
    //width = getWidth();
    for(let i = 0; i < numPairs * 2; i++){
        let newDiv = document.createElement('button');
        newDiv.className = "parent cardparent unstyled-button";
        newDiv.innerHTML = cards[i].turnedString;
        gameBoard.append(newDiv);
    }
}

function evalEqual(){
    if(shown[0].isEqual(shown[1])){
        // Keep shown and add score
    } else {
        // Turn over again
    }
}

class Card {

    constructor(num, body, eyes, mouth) {
        this.num = num;
        this.body = body;
        this.eyes = eyes;
        this.mouth = mouth;
        this.turnedString = "<img src=\"../res/body" + this.body +".png\" class=\"playingcard image1\"/>\
                             <img src=\"../res/eyes" + this.eyes +".png\" class=\"playingcard image2\"/> \
                             <img src=\"../res/mouth" + this.mouth +".png\" class=\"playingcard image3\"/>";
        this.unTurnedString; // Create back of card icon
    }
    
    isEqual(otherCard) {
        if (otherCard.body === this.body && otherCard.eyes === this.eyes && otherCard.mouth === this.mouth) {
            return true;
        }
        return false;
    }

    show() {
        if(shown.length === 2){
            evalEqual();
            shown = [];
            return;
        }
        shown.push(this);
        render();
    }
}

function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

createCards();
render();