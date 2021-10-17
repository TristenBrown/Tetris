//When the page loads, the play button is clickable
$(function(){
    $('#playButton').click(function(){
       play(); 
    });
});

//function called when a game starts
function play(){
    //first four entries in the array represent where each block of the piece are. currentPiece[4] represents which piece it is (more on that in the getRandomPieceArray function) and currentPiece[5] represents the orientation of that piece
    var currentPiece = [0, 0, 0, 0, 0, 0];
    var nextPiece = [5, 6, 15, 16, 0, 0];
    var score = 0;
    var speed = 600;
    //variable that will be used when pressing the down key
    var downPressed = false;
    $('#playButton').remove();
    //sets up the grid that tetris will be played in
    for(var i = 1; i < 201; i++){
        $('#playBox').append("<div class=\"grid-item\" id=\"box" + i + "\"></div>");
    }
    for(var j = 1; j < 41; j++){
        $('#nextBox').append("<div class=\"grid-item\" id=\"show" + j + "\"></div>");
    }
    $('#score').html("Score: 0");
    //we get a random piece
    wipeShow();
    currentPiece = nextPiece;
    nextPiece = getRandomPieceArray();
    placeShow(nextPiece);
    //we color the piece so that it is visible
    currentPiece = colorAll(currentPiece, 1, 1);
    //interval is used to make the piece fall
    var fall = setInterval(intervalFunction, speed);
    //event listener listens for key presses
    window.addEventListener("keydown", handleKeys, true);
    
    //function is defined in play function in order to facilitate adding and removing the handleKeys eventlistener without having currentPiece as a global variable
    //This is okay, since we only want to handle key inputs while playing
    function handleKeys(event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
        
      switch (event.key) {
        case "ArrowDown":
          // code for "down arrow" key press.
              //using downPressed in this manner prevents the piece from freezing while the interval is rapidly removed and added 
              if(!downPressed){
                  downPressed = true;
                  clearInterval(fall);
                  fall = setInterval(intervalFunction, 100);
                  //event listener that waits for a key to be released (we're concerned with the down key)
                  window.addEventListener("keyup", releaseDown, true);
              }
          break;
        case "ArrowUp":
          // code for "up arrow" key press.
            //The initial switch is to check which piece we're looking at. Once we find it, the nested switch is to check what the current orientation of that piece is. After doing this, we can rotate the piece with the appropriate offsets
              switch(currentPiece[4]){
                  // Square piece
                  case 0:{
                      switch(currentPiece[5]){
                        // Square always looks the same
                          case 0:{
                              break;
                          }
                          case 1:{
                              break;
                          }
                          case 2:{
                              break;
                          }
                          case 3:{
                              break;
                          }
                      }
                      break;
                  }
                // Line piece
                  case 1:{
                      switch(currentPiece[5]){
                          case 0:{
                              rotatePiece(currentPiece, 12, 1, -10, -21);
                              break;
                          }
                          case 1:{
                              rotatePiece(currentPiece, 19, 10, 1, -8);
                              break;
                          }
                          case 2:{
                              rotatePiece(currentPiece, -12, -1, 10, 21);
                              break;
                          }
                          case 3:{
                              rotatePiece(currentPiece, -19, -10, -1, 8);
                              break;
                          }
                      }
                      break;
                  }
                  // Z piece
                  case 2:{
                      switch(currentPiece[5]){
                          case 0:{
                              rotatePiece(currentPiece, 2, 11, 0, 9);
                              break;
                          }
                          case 1:{
                              rotatePiece(currentPiece, 20, 9, 0, -11);
                              break;
                          }
                          case 2:{
                              rotatePiece(currentPiece, -2, -11, 0, -9);
                              break;
                          }
                          case 3:{
                              rotatePiece(currentPiece, -20, -9, 0, 11);
                              break;
                          }
                      }
                      break;
                  }
                    // back Z piece
                  case 3:{
                      switch(currentPiece[5]){
                          case 0:{
                              rotatePiece(currentPiece, 11, 20, -9, 0);
                              break;
                          }
                          case 1:{
                              rotatePiece(currentPiece, 9, -2, 11, 0);
                              break;
                          }
                          case 2:{
                              rotatePiece(currentPiece, -11, -20, 9, 0);
                              break;
                          }
                          case 3:{
                              rotatePiece(currentPiece, -9, 2, -11, 0);
                              break;
                          }
                      }
                      break;
                  }
                      // r piece
                  case 4:{
                      switch(currentPiece[5]){
                          case 0:{
                              rotatePiece(currentPiece, 11, 20, 0, -11);
                              break;
                          }
                          case 1:{
                              rotatePiece(currentPiece, 9, -2, 0, -9);
                              break;
                          }
                          case 2:{
                              rotatePiece(currentPiece, -11, -20, 0, 11);
                              break;
                          }
                          case 3:{
                              rotatePiece(currentPiece, -9, 2, 0, 9);
                              break;
                          }
                      }
                      break;
                  }
                      // L piece
                  case 5:{
                      switch(currentPiece[5]){
                          case 0:{
                              rotatePiece(currentPiece, 2, 11, 0, -11);
                              break;
                          }
                          case 1:{
                              rotatePiece(currentPiece, 20, 9, 0, -9);
                              break;
                          }
                          case 2:{
                              rotatePiece(currentPiece, -2, -11, 0, 11);
                              break;
                          }
                          case 3:{
                              rotatePiece(currentPiece, -20, -9, 0, 9);
                              break;
                          }
                      }
                      break;
                  }
                      // T piece
                  case 6:{
                      switch(currentPiece[5]){
                          case 0:{
                              rotatePiece(currentPiece, 11, -9, 0, 9);
                              break;
                          }
                          case 1:{
                              rotatePiece(currentPiece, 9, 11, 0, -11);
                              break;
                          }
                          case 2:{
                              rotatePiece(currentPiece, -11, 9, 0, -9);
                              break;
                          }
                          case 3:{
                              rotatePiece(currentPiece, -9, -11, 0, 11);
                              break;
                          }
                      }
                      break;
                  }
              }
          break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            //remove color from piece
            currentPiece = colorAll(currentPiece, 0, 1);
            //check if any of the pieces are on the left most column or if there's a colored block to its left
            for(var i = 0; i < 4; i++){
               if((((currentPiece[i] - 1) % 10) == 0) || isColored(currentPiece, currentPiece[i], -1)){
                   i--;
                   for(; i >= 0; i--){
                       currentPiece[i] = currentPiece[i] + 1;
                   }
                   break;
               }
                currentPiece[i] = currentPiece[i] - 1;
            }
            //currentPiece has been moved (or not) and is colored
            currentPiece = colorAll(currentPiece, 1, 1);
          break;
        case "ArrowRight":
          // code for "right arrow" key press.
          //remove color from piece
          currentPiece = colorAll(currentPiece, 0, 1);
          //check if any of the pieces are on the right most column or if there's a colored block to its right
           for(var i = 0; i < 4; i++){
               if(((currentPiece[i] % 10) == 0) || isColored(currentPiece, currentPiece[i], 1)){
                   i--;
                   for(; i >= 0; i--){
                       currentPiece[i] = currentPiece[i] - 1;
                   }
                   break;
               }
                currentPiece[i] = currentPiece[i] + 1;
            }
            //current piece has been moved (or not) and is colored
            currentPiece = colorAll(currentPiece, 1, 1);
          break;
          case " ":
              // code for space key press
              var i = 10;
              //while piece can be placed i levels down
              while(pieceCanMove(currentPiece, i, i, i, i)){
                  j = i + 10;
                  //if piece can't be placed i levels down plus 1, we place the piece i levels down
                  if(!pieceCanMove(currentPiece, j, j, j, j)){
                      currentPiece = colorAll(currentPiece, 0, 1);
                     for(var k = 0; k < 4; k++){
                         currentPiece[k] = currentPiece[k] + i;
                     } 
                    currentPiece = colorAll(currentPiece, 1, 1);
                  }
                  i = j;
              }
        default:
          return; // Quit when this doesn't handle the key event.
      }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }
    
    //used for down key functionality in order to return the piece to its normal speed
    function releaseDown(){
                      clearInterval(fall);
                      fall = setInterval(intervalFunction, speed);
                      downPressed = false;
                      window.removeEventListener("keyup", releaseDown);
    }
    
    //function called that makes the piece fall with an interval that gets faster and faster
    function intervalFunction(){
        //max interval delay is set to 100ms
        if(speed >= 100){
            speed = 600 - score/100;
        }
        //variable used to check if we've lost
        var lost = false;
        currentPiece = colorAll(currentPiece, 0, 1);
        //checks whether each block in the piece has hit either the bottom or another piece
        for(var i = 0; i < 4; i++){
            if((currentPiece[i] + 10 > 200) || (isColored(currentPiece, currentPiece[i], 10))){
                for(i--; i >= 0; i--){
                       currentPiece[i] = currentPiece[i] - 10;
                   }
                currentPiece = colorAll(currentPiece, 1, 1);
                //score will increase if a line is cleared via doClear
                score = score + doClear(currentPiece);
                //updates the score presented to the user (only changes if a line is cleared)
                updateScore(score);
                //get a new piece and update next piece
                wipeShow();
                currentPiece = nextPiece;
                nextPiece = getRandomPieceArray();
                placeShow(nextPiece);
                //check if placing the new piece would make you lose
                if(didLose(currentPiece)){
                    //wrap things up so that we can begin again if the user presses play once more
                    handleLoss(currentPiece, fall);
                    lost = true;
                    window.removeEventListener("keyup", releaseDown, true);
                    window.removeEventListener("keydown", handleKeys, true);
                }
                break;
            }
            else{
                currentPiece[i] = currentPiece[i] + 10;
            }
        }
        //if no loss occurs, the game continues
        if(!lost){
            currentPiece = colorAll(currentPiece, 1, 1);
        }
    }
}

//function called to set currentPiece to a random piece
function getRandomPieceArray(){
    //each piece's offset, where each block is in relation to one another
    //first four elements in each array are the actual offset, 5th represents the piece, and 6th is the piece's orientation
    var squareOffset = [0, 1, 10, 11, 0, 0];
    var lineOffset = [0, 10, 20, 30, 1, 0];
    var zOffset = [0, 1, 11, 12, 2, 0];
    var backZOffset = [0, 1, 9, 10, 3, 0];
    var rOffset = [0, 1, 10, 20, 4, 0];
    var lOffset = [0, 1, 11, 21, 5, 0];
    var tOffset = [0, 9, 10, 11, 6, 0];
    var currentPiece = [0, 0, 0, 0, 0, 0];
    //get a random number between 1 and 7
    var num = Math.floor(Math.random() * 7 + 1);
    //depending on the random number, we set the currentPiece to the corresponding piece's offset 
    //we add five to the offset in order to center each piece
    switch(num){
        case 1:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = squareOffset[i] + 5;
            }
            currentPiece[4] = squareOffset[4];
            break;
        }
        case 2:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = lineOffset[i] + 5;
            }
            currentPiece[4] = lineOffset[4];
            break;
        }
        case 3:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = zOffset[i] + 5;
            }
            currentPiece[4] = zOffset[4];
            break;
        }
        case 4:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = backZOffset[i] + 5;
            }
            currentPiece[4] = backZOffset[4];
            break;
        }
        case 5:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = rOffset[i] + 5;
            }
            currentPiece[4] = rOffset[4];
            break;
        }
        case 6:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = lOffset[i] + 5;
            }
            currentPiece[4] = lOffset[4];
            break;
        }
        case 7:{
            for(var i = 0; i < 4; i++){
                currentPiece[i] = tOffset[i] + 5;
            }
            currentPiece[4] = tOffset[4];
            break;
        }
    }
    return currentPiece;
}

//colors all current pieces if x is 1 and blue if not
function colorAll(currentPiece, x, y){
    var chosenGrid = "";
    if(y == 1){
        chosenGrid = "box";
    }
    else{
        chosenGrid = "show";
    }
    if(x == 1){
        //switch is used to identify the piece and give it the corresponding color
        switch(currentPiece[4]){
            case 0:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "yellow");
                }
                break;
            }
            case 1:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "aqua");
                }
                break;
            }
            case 2:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "red");
                }
                break;
            }
            case 3:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "lime");
                }
                break;
            }
            case 4:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "blue");
                }
                break;
            }
            case 5:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "orange");
                }
                break;
            }
            case 6:{
                for(var i = 0; i < 4; i++){
                    $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "mediumpurple");
                }
                break;
            }
        }
    }
    else{
        for(var i = 0; i < 4; i++){
            $("#" + chosenGrid + "" + currentPiece[i]).css("background-color", "black");
        }
    }
    return currentPiece;
}

//check if a space where a block of the currentPiece would move is colored
function isColored(currentPiece, currentBlock, offset){
    //if space is black, return false
    if(($("#box" + (currentBlock + offset)).css("background-color") == "rgba(0, 0, 0, 0)") || ($("#box" + (currentBlock + offset)).css("background-color") == "rgb(0, 0, 0)")){
        return false;
    }
    else{
        //if space is part of our currentPiece, return false
        for(var i = 0; i < 4; i++){
            if(currentPiece[i] == currentBlock + offset){
                return false;
            }
        }
        //in all other cases return true
        return true;
    }
}

//checks whether an entire piece can move, also accounts for if it would overflow from the side (happens during rotations)
function pieceCanMove(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour){
    //checking if any pieces are colored
    if((isColored(currentPiece, currentPiece[0], offsetOne)) || (isColored(currentPiece, currentPiece[1], offsetTwo)) || (isColored(currentPiece, currentPiece[2], offsetThree)) || (isColored(currentPiece, currentPiece[3], offsetFour))){
        return false;
    }
    //checks if any blocks would be below the bottom
    else if((currentPiece[0] + offsetOne > 200) || (currentPiece[1] + offsetTwo > 200) || (currentPiece[2] + offsetThree > 200) || (currentPiece[3] + offsetFour > 200)){
            return false;
    }
    //checks if the piece would overflow from the side of the playing field
    else if(sideOverflow(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour)){
        return false;
    }
    else{
        return true;
    }
}

//Assuming the piece can rotate, rotates a piece clockwise
function rotatePiece(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour){
    colorAll(currentPiece, 0, 1);
    if(pieceCanMove(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour)){
        currentPiece[0] = currentPiece[0] + offsetOne;
        currentPiece[1] = currentPiece[1] + offsetTwo;
        currentPiece[2] = currentPiece[2] + offsetThree;
        currentPiece[3] = currentPiece[3] + offsetFour;
        colorAll(currentPiece, 1, 1);
        //if orientation of piece is in the fourth position, return to the first position (has fully rotated)
        if(currentPiece[5] == 3){
            currentPiece[5] = 0;
        }
        else{
            currentPiece[5]++;
        }
    }
    else{
        colorAll(currentPiece, 1, 1);
    }
}

//check if a rotation rotates over the side
function sideOverflow(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour){
    var offset = [offsetOne, offsetTwo, offsetThree, offsetFour];
    //checks whether any two block would be on opposite sides of the playing field (normally impossible but happens during the overflow)
    for(var i = 0; i < 4; i++){
        if((currentPiece[i] % 10 == 0) || (currentPiece[i] % 10 == 9)){
            if(((currentPiece[i] + offset[i]) % 10 == 1) || ((currentPiece[i] + offset[i]) % 10 == 2)){
                return true;
            }
        }
        else if((currentPiece[i] % 10 == 1) || (currentPiece[i] % 10 == 2)){
              if(((currentPiece[i] + offset[i]) % 10 == 0) || ((currentPiece[i] + offset[i]) % 10 == 9)){
                return true;
            }  
        }
    }
    return false;
}

//returns an array that contains which lines need to be cleared and which lines each block is on
function getClear(currentPiece){
    var pieceClear = [1, 1, 1, 1, 1, 1, 1, 1];
    for(var j = 0; j < 4; j++){
        //math done to get the column
        var column = Math.floor((currentPiece[j] - 1)/10);
        column = column * 10;
        //column is passed to the array 4 ahead of what is in the column
        pieceClear[j + 4] = column;
        for(var k = 1; k < 11; k++){
            //if the column isn't complete, column isn't labeled to be cleared
            if(!isColoredMinus(currentPiece, column, k)){
                pieceClear[j] = 0;
                break;
            }
        }
    }
    return pieceClear;
}

function doClear(currentPiece){
    //gets an array containing which columns need to be cleared
    var clearArray = getClear(currentPiece);
    //temporary array used to seperate clearable columns from not clearable columns
    var workArray = [200, 200, 200, 200];
    for(var i = 0; i < 4; i++){
        if(clearArray[i] == 1){
            workArray[i] = clearArray[i + 4];
        }
    }
    //array that will store sorted version of workArray
    var sortedArray = [200, 200, 200, 200];
    for(var i = 0; i < 4; i++){
        var lowest = 200;
        var lowestPosition = 5;
        for(var j = 0; j < 4; j++){
            if(workArray[j] < lowest){
                lowest = workArray[j];
                lowestPosition = j;
            }
        }
        workArray[lowestPosition] = 200;
        sortedArray[i] = lowest;
        if(lowest == 200){
            break;
        }
    }
    for(var i = 0; i < 4; i++){
        if(sortedArray[i] == 200){
            break;
        }
        for( var j = i + 1; j < 4; j++){
            if(sortedArray[i] == sortedArray[j]){
                for(var k = j; k < 3; k++){
                    sortedArray[k] = sortedArray[k + 1];
                }
                sortedArray[3] = 200;
            }
        }
    }
    //cleares lines in order from lowest to highest and calculates score
    var score = 0;
    for(var i = 0; i < 4; i++){
        if(sortedArray[i] == 200){
            break;
        }
        clearLine(sortedArray[i]);
        score += 200;
    }
    score *= score/100;
    return score;
}

//clears a line when it is full
//line is the column that is passed
function clearLine(line){
    var currentLine = line;
    //removes current line and moves all previous lines down
    while(currentLine != 0){
        prevLine = currentLine - 10;
        for(var i = 1; i < 11; i++){
            var newColor = $("#box" + (prevLine + i)).css("background-color");
            $("#box" + (currentLine + i)).css("background-color", newColor);
        }
        currentLine = prevLine;
    }
    for(var i = 1; i < 11; i++){
        $("#box" + i).css("background-color", "black");
    }
}

//less strict colored function (can be same block)
function isColoredMinus(currentPiece, currentBlock, offset){
    if(($("#box" + (currentBlock + offset)).css("background-color") == "rgba(0, 0, 0, 0)") || ($("#box" + (currentBlock + offset)).css("background-color") == "rgb(0, 0, 0)")){
        return false;
    }
    else{
        return true;
    }
}

//checks whether the user has lost
function didLose(currentPiece){
    for(var i = 0; i < 4; i++){
        if(!(($("#box" + currentPiece[i]).css("background-color") == "rgba(0, 0, 0, 0)") || ($("#box" + currentPiece[i]).css("background-color") == "rgb(0, 0, 0)"))){
            return true;
        }
    }
    return false;
}

//if the user has loss, this cleans up loose ends
function handleLoss(currentPiece, fall){
    currentPiece = null;
    for(var i = 1; i < 201; i++){
        $('#box' + i).css("background-color", "black");
    }
    clearInterval(fall);
    $('#playBox').empty();
    $('#nextBox').empty();
    $('#score').html("Tetris");
    //add play button back
    $("#playBox").append("<input type=\"button\" value=\"Play\" onclick=\"play()\" id=\"playButton\">");
    window.alert("You lost!");
}

//updates the score for the user to see
function updateScore(score){
     $("#score").html("Score: " + score);
}

function placeShow(currentPiece){
    let showPiece = [0, 0, 0, 0, 0, 0];
    switch(currentPiece[4]){
        case 0:{
            console.log("square");
            showPiece = [12, 13, 17, 18, 0, 0];
            break;
        }
        case 1:{
            console.log("line");
            showPiece = [13, 18, 23, 28, 1, 0];
            break;
        }
        case 2:{
            console.log("z");
            showPiece = [17, 18, 23, 24, 2, 0];
            break;
        }
        case 3:{
            console.log("backZ");
            showPiece = [18, 19, 22, 23, 3, 0];
            break;
        }
        case 4:{
            console.log("R");
            showPiece = [12, 13, 17, 22, 4, 0];
            break;
        }
        case 5:{
            console.log("L");
            showPiece = [12, 13, 18, 23, 5, 0];
            break;
        }
        case 6:{
            console.log("T");
            showPiece = [13, 17, 18, 19, 6, 0];
            break;
        }
    }
    colorAll(showPiece, 1, 0);
}

function wipeShow(){
    for(var k = 1; k < 41; k++){
        $('#show' + k).css("background-color", "black");
    }
}