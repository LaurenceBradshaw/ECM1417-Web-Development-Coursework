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
    // Define Variables
    let usedCombo = [];
    let skin;
    let eyes;
    let mouth;
    //Generate a combination of features that have not been generated before
    for(let i = 0; i < numPairs; i++){
        do{
            skin = ["green", "red", "yellow"][getRandomInt(3)];
            eyes = ["closed", "laughing", "long", "normal", "rolling", "winking"][getRandomInt(6)];
            mouth = ["open", "sad", "smiling", "straight", "surprise", "teeth"][getRandomInt(6)];
        }while(arrayAlreadyHasArray(usedCombo, [skin, eyes, mouth]));
        // Add this generation to the list of used generations
        usedCombo.push([skin, eyes, mouth]);
        
        // Create a pair of cards
        let card1 = new Card(skin, eyes, mouth);
        let card2 = new Card(skin, eyes, mouth);

        // Add the cards to the list of cards
        cards.push(card1);
        cards.push(card2);
    }
    // Shuffle the cards into a random order
    shuffle(cards);
}

function cardClick(num){
    console.log(num);
    // Find the clicked card
    clickedCard = cards[num];
    // Check its not flipped already
    if (clickedCard.flipped === false) {
        clickedCard.show();
    }
    // Check if the game should end
    let i = 0;
    end = true;
    while (i < cards.length) {
        if (cards[i].flipped === false) {
            end = false;
            break;
        }
        i++;
    }
    if (end) {
        gameEnd();
    }
}

function render(){
    // Design a way of rendering cards given the dimentions of the window
    //width = getWidth();
    gameBoard.innerHTML = "";
    for(let i = 0; i < numPairs * 2; i++){
        let newButton = document.createElement('button');
        newButton.className = "parent cardparent unstyled-button";
        if (cards[i].flipped === true || cards[i].matched === true) {
            newButton.innerHTML = cards[i].turnedString;
        }
        else {
            newButton.innerHTML = cards[i].unTurnedString;
        }
        newButton.onclick = function () {
            cardClick(i);
        };
        gameBoard.append(newButton);
    }
}

function gameEnd() {
    
}

function evalEqual(){
    matching = true;
    let i = 1;
    // Iterate over the list of selected cards and check if they are all equal
    // This loop will break upon finding the first non-matching card
    while (i < selected.length) {
        if (!(selected[i].isEqual(selected[0]))) {
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
        selected.forEach(function (c) { c.matched = true; });
        // selected = [];
    } 
    // else {
    //     sleep(1000).then(() => {  
    //         selected.forEach(function (c) { c.flipped = false; });
    //         selected = [];
    //         render();
    //         });  
    //     // Turn over again
    // }
}

class Card {

    constructor(skin, eyes, mouth) {
        this.skin = skin;
        this.eyes = eyes;
        this.mouth = mouth;
        this.turnedString = "<img src=\"../res/skin/" + this.skin +".png\" class=\"playingcard image1\"/>\
                             <img src=\"../res/eyes/" + this.eyes +".png\" class=\"playingcard image2\"/> \
                             <img src=\"../res/mouth/" + this.mouth +".png\" class=\"playingcard image3\"/>";
        this.unTurnedString = "<img src=\"../res/blank.jpg\" class=\"playingcard image1\"/>"; // Create back of card icon
        this.flipped = false;
        this.matched = false;
    }
    
    isEqual(otherCard) {
        if (otherCard.skin === this.skin && otherCard.eyes === this.eyes && otherCard.mouth === this.mouth) {
            return true;
        }
        return false;
    }

    show() {
        if(selected.length === numToMatch){
            selected.forEach(function (c) { c.flipped = false; });
            selected = [];
        }
        selected.push(this);
        this.flipped = true;
        if (selected.length === numToMatch){
            evalEqual();
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

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
} 

function arrayAlreadyHasArray(arr, testArr){
    for(var i = 0; i<arr.length; i++){
        let checker = []
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === testArr[j]){
                checker.push(true)
            } else {
                checker.push(false)
            }
        }
        if (checker.every(check => check === true)){
            return true
        }
    }
    return false
}
createCards();
render();