var emojiElements = [null, null, null];

var myDiv = document.getElementById("pfpCol");

document.getElementById("bodySelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[0] = "<img src=\"../blank.jpg\" class=\"reg-img image1\"/>";
    }
    else if(this.selectedIndex == 1){
        emojiElements[0] = "<img src=\"../res/body1.png\" class=\"reg-img image1\"/>";
    }
    else if(this.selectedIndex == 2){
        emojiElements[0] = "<img src=\"../res/body2.png\" class=\"reg-img image1\"/>";
    }
    else if(this.selectedIndex == 3){
        emojiElements[0] = "<img src=\"../res/body3.png\" class=\"reg-img image1\"/>";
    }
    else if(this.selectedIndex == 4){
        emojiElements[0] = "<img src=\"../res/body4.png\" class=\"reg-img image1\"/>";
    }
    redraw();
};

document.getElementById("eyesSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[1] = null;
    }
    else if(this.selectedIndex == 1){
        emojiElements[1] = "<img src=\"../res/eyes1.png\" class=\"reg-img image2\"/>";
    }
    else if(this.selectedIndex == 2){
        emojiElements[1] = "<img src=\"../res/eyes2.png\" class=\"reg-img image2\"/>";
    }
    else if(this.selectedIndex == 3){
        emojiElements[1] = "<img src=\"../res/eyes3.png\" class=\"reg-img image2\"/>";
    }
    else if(this.selectedIndex == 4){
        emojiElements[1] = "<img src=\"../res/eyes4.png\" class=\"reg-img image2\"/>";
    }
    redraw();
};

document.getElementById("mouthSelect").onchange = function(){
    if(this.selectedIndex == 0){
        emojiElements[2] = null;
    }
    else if(this.selectedIndex == 1){
        emojiElements[2] = "<img src=\"../res/mouth1.png\" class=\"reg-img image3\"/>";
    }
    else if(this.selectedIndex == 2){
        emojiElements[2] = "<img src=\"../res/mouth2.png\" class=\"reg-img image3\"/>";
    }
    else if(this.selectedIndex == 3){
        emojiElements[2] = "<img src=\"../res/mouth3.png\" class=\"reg-img image3\"/>";
    }
    redraw();
};

var redraw = function(){
    var innerString = "<div>";
    emojiElements.forEach(element => {
        if(element !== null){
            innerString += element;
        }
    });
    myDiv.innerHTML = innerString + "</div>";
}
  