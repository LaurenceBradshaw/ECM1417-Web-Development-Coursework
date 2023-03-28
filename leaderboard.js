var data;



class DataEntry{
    constructor(input){
        var splitInput = input.split('-');
        this.name = splitInput[0];
        this.skin = makeImg("/res/skin/" + splitInput[1] + ".png");
        this.eyes = makeImg("/res/eyes/" + splitInput[2] + ".png");
        this.mouth = makeImg("/res/mouth/" + splitInput[3] + ".png");
        this.score = splitInput[4];
        this.time = splitInput[5];
    }

    convertToTableRow(){
        var row = document.createElement("tr");

        var emoji = document.createElement("div");
        emoji.className = "emoji";
        emoji.appendChild(this.skin);
        emoji.appendChild(this.eyes);
        emoji.appendChild(this.mouth);

        var colEmoji = document.createElement("td");
        var emojiWrapper = document.createElement("div");
        emojiWrapper.classList = "emoji-wrapper";
        emojiWrapper.appendChild(emoji);
        colEmoji.appendChild(emojiWrapper);

        var colName = document.createElement("td");
        colName.innerHTML = (this.name);

        var colScore = document.createElement("td");
        colScore.innerHTML = (this.score);

        var colTime = document.createElement("td");
        colTime.innerHTML = (this.time);

        row.appendChild(colEmoji);
        row.appendChild(colName);
        row.appendChild(colScore);
        row.appendChild(colTime);

        return row;
    }
}

function getLeaderboard(level){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.status == 200 && xhr.readyState == 4){
            console.log("get");
            console.log(xhr.readyState);
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    }
    xhr.open('GET', `data/${level}.txt`, false);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.send();

    return xhr.responseText;
}

function makeImg(path){
    var img = document.createElement("img");
    img.src = path;
    return img;
}

function splitLines(t) { return t.split(/\r\n|\r|\n/); }

function populateTable(){
    // Remove old table if it exists
    var leaderboardArea = document.getElementById("leaderboard-area");
    leaderboardArea.innerHTML = "";
    // Create table
    var table = document.createElement("table");
    table.className = "leaderboard";
    var headingRow = document.createElement("tr");
    var headingPfp = document.createElement("th");
    headingPfp.innerHTML = "Picture";
    var headingName = document.createElement("th");
    headingName.innerHTML = "Username";
    var headingScore = document.createElement("th");
    headingScore.innerHTML = "Score";
    var headingTime = document.createElement("th");
    headingTime.innerHTML = "Time";
    headingRow.appendChild(headingPfp);
    headingRow.appendChild(headingName);
    headingRow.appendChild(headingScore);
    headingRow.appendChild(headingTime);
    table.appendChild(headingRow);

    // Split into list
    var dataList = splitLines(data);
    dataList.pop();
    console.log(dataList);
    // Order list
    var entries = []
    for(i = 0; i < dataList.length; i++){
        entries.push(new DataEntry(dataList[i]));
    }
    entries.sort(function(a, b){ return b.score - a.score});
    // Display list
    for(i = 0; i < entries.length; i++){
        table.appendChild(entries[i].convertToTableRow());
    }

    leaderboardArea.appendChild(table);
}

document.getElementById("levelSelect").onchange = function(){
    if(this.selectedIndex < 6){
        data = getLeaderboard(this.selectedIndex + 1);
    }
    else{
        data = getLeaderboard("total");
    }

    populateTable();
};

data = getLeaderboard(1);
populateTable();