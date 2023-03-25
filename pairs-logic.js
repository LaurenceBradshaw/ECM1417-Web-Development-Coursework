var cards = [];
var selected = [];
var numPairs = 0;
var score = 0;
var totalScore = 0;
var numToMatch = 0;
var maxMoves = 0;
var gameBoard = document.getElementById("gameBoard");
var leaderboard;
var level = 1;
var startTime;
var totalTimeStart;
var timer;
var timeElapsed;
var totalTimeElapsed;
var info = document.getElementById("info");
var infoString = "";
var dataAcrossLevels = [];
var gameEnded = false;
var maxScores = [getCookie('1'), getCookie('2'), getCookie('3'), getCookie('4'), getCookie('5'), getCookie('6'), getCookie('total')];

// TODO: level specific cookies to check if you beat the max
// TODO: Fix the sessions vs cookies. On session start find if a name and pfp have been set otherwise the session is not registered

function start(){
    gameEnded = false;
    score = 0;
    totalScore = 0;
    level = 1;
    cards = [];
    dataAcrossLevels = [];
    selected = [];
    changeLevel(level);
    updateInfo(totalScore, score, timeElapsed, totalTimeElapsed, level);
    gameBoard.innerHTML = "";
    createCards();
    render();
    startTime = new Date().getTime();
    totalTimeStart = new Date().getTime();

    timer = setInterval(function() {
        timeElapsed = Math.floor((new Date().getTime() - startTime) / 1000);
        totalTimeElapsed = Math.floor((new Date().getTime() - totalTimeStart) / 1000);
        updateInfo(totalScore, score, timeElapsed, totalTimeElapsed, level);
    }, 1000)
}

function updateInfo(totalScore, score, timeElapsed, totalTimeElapsed, level){
    infoString = `Total Score: ${totalScore} | Score For Level: ${score} | Level: ${level}<br>Pairs: ${numPairs} | Number To Match ${numToMatch} | Moves Remaining: ${maxMoves}<br>`;
    if(timeElapsed === undefined){
        infoString += `Time In Level: ${0}`;
    } else{
        infoString += `Time In Level: ${timeElapsed}`;
    }
    if(totalTimeElapsed === undefined){
        infoString += ` | Total Time: ${0}`;
    } else{
        infoString += ` | Total Time: ${totalTimeElapsed}`;
    }
    info.innerHTML = infoString;
}

function changeLevel(level){
    gameBoard.classList = "rounded-box play-area";
    switch(level){
        case 1:
            numPairs = 3;
            numToMatch = 2;
            maxMoves = 12;
            break;
        case 2:
            numPairs = 3;
            numToMatch = 3;
            maxMoves = 18;
            break;
        case 3:
            numPairs = 5;
            numToMatch = 2;
            maxMoves = 20;
            break;
        case 4:
            numPairs = 3;
            numToMatch = 4;
            maxMoves = 24;
            break;
        case 5:
            numPairs = 5;
            numToMatch = 3;
            maxMoves = 30;
            break;
        case 6:
            numPairs = 5;
            numToMatch = 4;
            maxMoves = 40;
            break;
    }
}

function createCards(){
    cards = [];
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
    if (clickedCard.flipped === false && clickedCard.matched === false) {
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
    if(!gameEnded){
        //TODO: Check if current score exceeds the players max and then set to gold background if so
        gameBoard.innerHTML = "";
        updateInfo(totalScore, score, timeElapsed, totalTimeElapsed, level);
        for(let i = 0; i < numPairs * numToMatch; i++){
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
}

function gameEnd() {
    clearInterval(timer);
    dataAcrossLevels.push({
        score: score,
        level: level,
        time: timeElapsed
    });
    console.log(dataAcrossLevels);
    if(level < 6 && maxMoves !== 0){
        if(score > maxScores[level]){
            maxScores[level - 1] = score;
            setCookie(level, score, 10 * 365 * 24 * 60 * 60);
        }
        level += 1;
        changeLevel(level);
        gameBoard.innerHTML = "";
        createCards();
        score = 0;
        selected = [];
        startTime = new Date().getTime();
        
        timer = setInterval(function() {
            timeElapsed = Math.floor((new Date().getTime() - startTime) / 1000);
            totalTimeElapsed = Math.floor((new Date().getTime() - totalTimeStart) / 1000);
            updateInfo(totalScore, score, timeElapsed, totalTimeElapsed, level);
        }, 1000)
        render();
    } 
    else{
        gameEnded = true;
        var playAgain = document.createElement('button');
        playAgain.classList = "btn btn-danger btn-lg";
        playAgain.innerHTML = "Play Again!";
        playAgain.onclick = function() {
            start();
        }

        var submitScore = document.createElement('button');
        submitScore.classList = "btn btn-success btn-lg";
        submitScore.innerHTML = "Submit Scores!";

        var text = document.createElement('p');

        gameBoard.innerHTML = "";

        if(level === 1 && maxMoves === 0){
            // NO OPTION TO SUBMIT
            text.innerHTML = "You ran out of moves!\nBetter luck next time...";
            gameBoard.append(text);
            gameBoard.append(playAgain);
        }
        else if(level !== 6){
            // SUBMIT SCORES SO FAR
            submitScore.onclick = function() {
                for(let i = 0; i < dataAcrossLevels.length - 1; i++){
                    updateLeaderboard(dataAcrossLevels[i].level, dataAcrossLevels[i].score, dataAcrossLevels[i].time);
                }
            }
            text.innerHTML = "You ran out of moves!\nBetter luck next time...";
            gameBoard.append(text);
            gameBoard.append(submitScore);
            gameBoard.append(playAgain);
        }
        else{
            // SUBMIT ALL SCORES
            submitScore.onclick = function() {
                for(let i = 0; i < dataAcrossLevels.length; i++){
                    updateLeaderboard(dataAcrossLevels[i].level, dataAcrossLevels[i].score, dataAcrossLevels[i].time);
                }
                updateLeaderboard("total", totalScore, totalTimeElapsed);
            }
            text.innerHTML = "You completed all levels!";
            gameBoard.append(text);
            gameBoard.append(submitScore);
            gameBoard.append(playAgain);

            if(totalScore > maxScores[6]){
                maxScores[6] = totalScore;
                setCookie("total", totalScore, 10 * 365 * 24 * 60 * 60);
            }
            if(score > maxScores[5]){
                maxScores[5] = score;
                setCookie("6", score, 10 * 365 * 24 * 60 * 60);
            }
        }
    }
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

function updateLeaderboard(level, score, time) {
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
    data.append("level", level.toString());
    data.append("time", time);

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
    end = false;

    if(matching){
        // Keep shown and add score
        score += 10;
        totalScore += 10;
        selected.forEach(function (c) { c.matched = true; });
    }
    else {
        maxMoves -= 1;
        if(maxMoves === 0){
            end = true;
        }
        score -= 1;
        totalScore -= 1;
    }

    if(maxScores[level - 1] < score){
        gameBoard.classList = "rounded-box play-area-gold";
    }
    else{
        gameBoard.classList = "rounded-box play-area";
    }

    if(end){
        gameEnd();
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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
}

function setCookie(name, value, time) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (time));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}


var b = document.createElement('button');
b.classList = "btn btn-success btn-lg";
b.innerHTML = "Start!";
b.onclick = function() {
    start();
}
gameBoard.append(b);