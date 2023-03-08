var emojiElements = [null, null, null];

var myDiv = document.getElementById("pfpCol");

document.getElementById("bodySelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[0] = "<img src=\"../blank.jpg\" class=\"reg-img image1\"/>";
    }
    else {
        emojiElements[0] = "<img src=\"../res/body" + this.selectedIndex +"\" class=\"reg-img image1\"/>";
    }
    redraw();
};

document.getElementById("eyesSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[1] = null;
    }
    else {
        emojiElements[1] = "<img src=\"../res/eyes" + this.selectedIndex +"\" class=\"reg-img image2\"/>";
    }
    redraw();
};

document.getElementById("mouthSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[2] = null;
    }
    else {
        emojiElements[2] = "<img src=\"../res/mouth" + this.selectedIndex +"\" class=\"reg-img image3\"/>";
    }
    redraw();
};

var redraw = function(){
    var innerString = "<img src=\"../blank.jpg\" class=\"reg-img image-behind\"/>";
    emojiElements.forEach(element => {
        if(element !== null){
            innerString += element;
        }
    });
    myDiv.innerHTML = innerString;
}
  