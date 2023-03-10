var cards = [];
var selected = [];
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
    let usedCombo = [];
    let body;
    let eyes;
    let mouth;
    for (let i = 0; i < numPairs; i++){
        do {
            body = getRandomInt(3) + 1; //TODO Find if the combo of body eyes and mouth have been used?
            eyes = getRandomInt(3) + 1;
            mouth = getRandomInt(2) + 1;
        } while (usedCombo.includes([body, eyes, mouth]));
        usedCombo.append([body, eyes, mouth]);
        let card1 = new Card(currentCardNum, body, eyes, mouth);
        let card2 = new Card(currentCardNum + 1, body, eyes, mouth);

        currentCardNum += 2;
        cards.push(card1);
        cards.push(card2);
    }
}

function cardClick(num){
    clickedCard = cards[num];
    if (clickedCard.flipped === false) {
        clickedCard.show();
    }
}

function render(){
    // Design a way of rendering cards given the dimentions of the window?
    //width = getWidth();
    for(let i = 0; i < numPairs * 2; i++){
        let newDiv = document.createElement('button');
        newDiv.className = "parent cardparent unstyled-button";
        if (cards[i].flipped) {
            newDiv.innerHTML = cards[i].turnedString;
        }
        else {
            newDiv.innerHTML = cards[i].unTurnedString;
        }
        newDiv.onclick = cardClick(i);
        gameBoard.append(newDiv);
    }
}

function evalEqual() {
    matching = true;
    let i = 1;
    while (i < selected.length) {
        if (!(selected[i].isEqual(selected[0].turnedString))) {
            matching = false;
            break;
        }
        else {
            i++;
        }
    }

    if(matching){
        // Keep shown and add score
        score += 1;
    } else {
        selected.forEach(function (c) { c.flipped === false; })
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
        this.flipped = false;
    }
    
    isEqual(otherCard) {
        if (otherCard.body === this.body && otherCard.eyes === this.eyes && otherCard.mouth === this.mouth) {
            return true;
        }
        return false;
    }

    show() {
        selected.push(this);
        this.flipped = true;
        if (selected.length === numToMatch){
            evalEqual();
            selected = [];
            return;
        }
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