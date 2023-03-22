var cards = [];
var selected = [];
var selected = [];
var numPairs = 3;
var score = 0;
var numToMatch = 2;
var gameBoard = document.getElementById("gameBoard");
var leaderboard;
var level = 1;

// TODO: Make timer
// TODO: Total score vs level score
// TODO: Make different levels with changing numToMatch (level 1: 3 pairs of 2) (level 2: 3 pairs of 3) (level 3: 5 pairs of 2) etc increasing total card count
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
        
        // Create the number of cards to match and add them to the list of cards
        for(let j = 0; j < numToMatch; j++){
            let c = new Card(skin, eyes, mouth);
            cards.push(c);
        }
    }
    // Shuffle the cards into a random order
    shuffle(cards);
}

function cardClick(num){
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
        if (cards[i].matched === false) {
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
    //TODO: Check if current score exceeds the players max and then set to gold background if so
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
    // Add the score to the data store if it is better
    leaderboard = getLeaderboard();
    updateLeaderboard();
}

function getLeaderboard(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.status == 200 && xhr.readyState == 4){
            console.log("get");
            console.log(xhr.readyState);
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    }
    xhr.open('GET', 'data/leaderboard.txt', false);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.send();

    return xhr.responseText;
}

function updateLeaderboard() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.status == 200 && xhr.readyState == 4){
            console.log("update");
            console.log(xhr.readyState);
            console.log(xhr.status);
        }
    }
    data = new FormData();
    data.append("score", score);
    data.append("level", level);
    xhr.open('POST', "leaderboardupdater.php", false);
    xhr.send(data);
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