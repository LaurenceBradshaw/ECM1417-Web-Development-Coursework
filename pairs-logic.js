var cards = [];
var flipped = [];
var numPairs = 0;
var numToMatch = 0;
var score = 0;
var totalScore = 0;
var timer;
var totalTimer;
var timeElapsed;
var totalTimeElapsed;
var info = document.getElementById("info");
var infoString = "";
var dataAcrossLevels = [];
var gameEnded = false;
var maxScores = [getCookie('1'), getCookie('2'), getCookie('3'), getCookie('4'), getCookie('5'), getCookie('6'), getCookie('total')];
var flipLockOut = false;

class Card{
    constructor(num, skin, eyes, mouth){
        this.num = num;
        this.skin = makeImg("/res/skin/" + skin + ".png");
        this.eyes = makeImg("/res/eyes/" + eyes + ".png");
        this.mouth = makeImg("/res/mouth/" + mouth + ".png");
        this.flipped = false;
        this.matched = false;
    }

    convertToDOMObj(){
        var c = document.createElement("div");
        c.className = "card";
        var _self = this;
        c.addEventListener('click', function() {
            if(!c.classList.contains('is-flipped') && !flipLockOut){
                c.classList.toggle('is-flipped');
                _self.flipped = true;
                var sound = new Audio('/res/cardflip.mp3')
                sound.volume = 0.4;
                sound.play();
                if(cards.filter(c => c.flipped === true).length === numToMatch){
                    flipLockOut = true;
                    setTimeout(() => {
                        checkFlipped();
                        flipLockOut = false;
                    }, 1000);
                }
            }
          });

        var front = document.createElement("div");
        front.className = "card-face card-face-front";

        var back = document.createElement("div");
        back.className = "card-face card-face-back";

        var emoji = document.createElement("div");
        emoji.className = "emoji";
        emoji.appendChild(this.skin);
        emoji.appendChild(this.eyes);
        emoji.appendChild(this.mouth);

        back.appendChild(emoji);

        c.appendChild(front);
        c.appendChild(back);

        if(this.flipped || this.matched){
            c.classList.add('is-flipped');
        }

        return c;
    }

    isEqual(c){
        if(c.num === this.num){
            return true;
        }
        return false;
    }
}

function render() {
    var gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    for(let i = 0; i < numPairs * numToMatch; i++){
        gameBoard.append(cards[i].convertToDOMObj());
    }
}

function makeImg(path){
    var img = document.createElement("img");
    img.src = path;
    return img;
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
            let c = new Card(i, skin, eyes, mouth);
            cards.push(c);
        }
    }
    // Shuffle the cards into a random order
    shuffle(cards);
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function changeLevel(level){
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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

function checkFlipped(){
    // Find all the cards that are flipped
    flipped = cards.filter(c => c.flipped === true);
    // Find their indexes in the card list so the dom objects can be found
    flippedIndexes = [];
    var j = 0;
    for(i = 0; i < cards.length; i++){
        if(cards[i] === flipped[j] && !flippedIndexes.includes(i)){
            flippedIndexes.push(i);
            j++;
            i = 0;
        }
    }
    // Find the dom objects for the flipped cards
    domobjects = [];
    gameBoard = document.getElementById("gameBoard");
    children = gameBoard.children;
    for(i = 0; i < flippedIndexes.length; i++){
        domobjects.push(children[flippedIndexes[i]]);
    }

    // Check if all the flipped cards are matching ones 
    var firstCard = flipped[0];
    truths = [];
    for(i = 1; i < flipped.length; i++){
        truths.push(firstCard.isEqual(flipped[i]));
    }
    
    var allmatch = truths.every(v => v === true);

    // If they all match then add a score and flip them back over and set matched to true
    if(allmatch){
        flipped.map(c => {c.flipped = false; c.matched = true;})
        score += 10;
        totalScore += 10;
    }
    // If they don't all match then flip them back over and deduct score and moves
    else {
        flipped.map(c => {c.flipped = false; });
        domobjects.map(c => c.classList.toggle('is-flipped'));
        score -= 1;
        totalScore -= 1;
        maxMoves -= 1;
        if(maxMoves === 0){
            gameEnded = true;
        }
    }

    // Check if the current score is bigger than the previous score for the user.
    if(maxScores[level - 1] < score){
        gameBoard.classList = "rounded-box play-area-gold";
    }
    else{
        gameBoard.classList = "rounded-box play-area";
    }

    // Check if all the cards have been matched
    truths = [];
    for(i = 1; i < cards.length; i++){
        truths.push(cards[i].matched);
    }
    var allmatched = truths.every(v => v === true);
    flipped = [];

    // If either all the cards are matched or the player has run out of moves
    if(gameEnded || allmatched){
        gameEnd();
    }

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

    data = `level=${level}&score=${score}&time=${time}`;

    xhr.open('POST', "leaderboardupdater.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(data);
}

function gameEnd(){
    // Stop the timer and record the current scores and time
    clearInterval(timer);
    dataAcrossLevels.push({
        score: score,
        level: level,
        time: timeElapsed
    });

    // Create some objects for submitting and playing again
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

    if(gameEnded){
        // Ran out of moves
        // If failed on level 1, dont offer the option to submit the score
        if(!isRegistered){
            text.innerHTML = "You ran out of moves!<br>Better luck next time...<br>To submit scores please register!";
            gameBoard.append(text);
            var register = document.createElement('button');
            register.classList = "btn btn-danger btn-lg";
            register.innerHTML = "Register";
            register.onclick = function() {
                window.location.href = "registration.php";
            }
            gameBoard.append(register);
        }
        else if(level === 1){
            text.innerHTML = "You ran out of moves!<br>Better luck next time...";
            gameBoard.append(text);
            gameBoard.append(playAgain);
        }
        // Submit the scores up to the failed level
        else{
            submitScore.onclick = function() {
                for(let i = 0; i < dataAcrossLevels.length - 1; i++){
                    updateLeaderboard(dataAcrossLevels[i].level, dataAcrossLevels[i].score, dataAcrossLevels[i].time);
                }
            }
            text.innerHTML = "You ran out of moves!<br>Better luck next time...";
            gameBoard.append(text);
            gameBoard.append(submitScore);
            gameBoard.append(playAgain);
        }
    } 
    else{
        // Finished a level
        // Progress onto the next level
        if(level < 6){
            // Check if the score when this level was finished is greater than the previous score
            if(score > maxScores[level]){
                maxScores[level - 1] = score;
                setCookie(level, score, 10 * 365 * 24 * 60 * 60);
            }

            level += 1;
            changeLevel(level);
            gameBoard.innerHTML = "";

            if(maxScores[level - 1] < score){
                gameBoard.classList = "rounded-box play-area-gold";
            }
            else{
                gameBoard.classList = "rounded-box play-area";
            }

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
            // If level 6 is beaten, finish the game
            if(!isRegistered){
                text.innerHTML = "You finished!<br>To submit scores please register!";
                gameBoard.append(text);
                var register = document.createElement('button');
                register.classList = "btn btn-danger btn-lg";
                register.innerHTML = "Register";
                register.onclick = function() {
                    window.location.href = "registration.php";
                }
                gameBoard.append(register);
            }
            else{
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
}

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

var b = document.createElement('button');
b.classList = "btn btn-success btn-lg";
b.innerHTML = "Start!";
b.onclick = function() {
    start();
}
gameBoard.append(b);