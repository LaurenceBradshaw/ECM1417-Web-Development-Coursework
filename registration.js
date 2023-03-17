var emojiElements = [null, null, null];

var submitButton = document.getElementById("submit-button");

var myDiv = document.getElementById("pfpCol");
var pSkin = document.createElement("p");
pSkin.className = "invalid-chars";
var pEyes = document.createElement("p");
pEyes.className = "invalid-chars";
var pMouth = document.createElement("p");
pMouth.className = "invalid-chars";
document.getElementById("skinSelect").parentNode.insertBefore(pSkin, document.getElementById("skinSelect").nextSibling);
document.getElementById("eyesSelect").parentNode.insertBefore(pEyes, document.getElementById("eyesSelect").nextSibling);
document.getElementById("mouthSelect").parentNode.insertBefore(pMouth, document.getElementById("mouthSelect").nextSibling);

var usernameInput = document.getElementById("username");
var p = document.createElement("p");
p.className = "invalid-chars";
usernameInput.parentNode.parentNode.insertBefore(p, usernameInput.parentNode.nextSibling);
usernameInput.addEventListener('input', inputHandler);

validUsername = false;
validSkin = false;
validEyes = false;
validMouth = false;

checkValid();

function inputHandler(e){
    var invalidChars = /[”!@#%&*()+=^{}\[\]—;:“’<>?\/]/;
    p.innerHTML = "";
    if(invalidChars.test(e.target.value) || e.target.value === ""){
        p.innerHTML = "Invalid Characters";
        validUsername = false;
    } else {
        p.innerHTML = "";
        validUsername = true;
    }
    checkValid();
}


document.getElementById("skinSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[0] = null;
        pSkin.innerHTML = "Please select an option";
        validSkin = false;
    }
    else {
        emojiElements[0] = "<img src=\"../res/skin/" + this.value +".png\" class=\"reg-img image1\"/>";
        pSkin.innerHTML = "";
        validSkin = true;
    }
    redraw();
};

document.getElementById("eyesSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[1] = null;
        pEyes.innerHTML = "Please select an option";
        validEyes = false;
    }
    else {
        emojiElements[1] = "<img src=\"../res/eyes/" + this.value +".png\" class=\"reg-img image2\"/>";
        pEyes.innerHTML = "";
        validEyes = true;
    }
    redraw();
};

document.getElementById("mouthSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[2] = null;
        pMouth.innerHTML = "Please select an option";
        validMouth = false;
    }
    else {
        emojiElements[2] = "<img src=\"../res/mouth/" + this.value +".png\" class=\"reg-img image3\"/>";
        pMouth.innerHTML = "";
        validMouth = true;
    }
    redraw();
};

var redraw = function(){
    var innerString = "<img src=\"../res/blank.jpg\" class=\"reg-img image-behind\"/>";
    emojiElements.forEach(element => {
        if(element !== null){
            innerString += element;
        }
    });
    myDiv.innerHTML = innerString;
    checkValid();
}

function checkValid() {
    if(validEyes && validMouth && validSkin && validUsername){
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}