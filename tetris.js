$(function(){
    $('#playButton').click(function(){
       play(); 
    });
});

function play(){
    var currentPiece = [0, 0, 0, 0, 0, 0];
    var score = 0;
    var speed = 600;
    var downPressed = false;
    $('#playButton').remove();
    for(var i = 1; i < 201; i++){
        $('#mainBox').append("<div class=\"grid-item\" id=\"box" + i + "\"></div>");
    }
    $('#score').html("Score: 0");
    currentPiece = getRandomPieceArray();
    currentPiece = colorAll(currentPiece, 1);
    var fall = setInterval(intervalFunction, speed);
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
              if(!downPressed){
                  downPressed = true;
                  clearInterval(fall);
                  fall = setInterval(intervalFunction, 100);
                  window.addEventListener("keyup", releaseDown, true);
              }
          break;
        case "ArrowUp":
          // code for "up arrow" key press.
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
            currentPiece = colorAll(currentPiece, 0);
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
            currentPiece = colorAll(currentPiece, 1);
          break;
        case "ArrowRight":
          // code for "right arrow" key press.
              currentPiece = colorAll(currentPiece, 0);
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
            currentPiece = colorAll(currentPiece, 1);
          break;
          case " ":
              // code for space key press
              var i = 10;
              while(pieceCanMove(currentPiece, i, i, i, i)){
                  j = i + 10;
                  if(!pieceCanMove(currentPiece, j, j, j, j)){
                      currentPiece = colorAll(currentPiece, 0);
                     for(var k = 0; k < 4; k++){
                         currentPiece[k] = currentPiece[k] + i;
                     } 
                    currentPiece = colorAll(currentPiece, 1);
                  }
                  i = j;
              }
        default:
          return; // Quit when this doesn't handle the key event.
      }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }
    
    function releaseDown(){
                      clearInterval(fall);
                      fall = setInterval(intervalFunction, speed);
                      downPressed = false;
                      window.removeEventListener("keyup", releaseDown);
    }
    
    function intervalFunction(){
        if(speed >= 100){
            speed = 600 - score/100;
        }
        var lost = false;
        currentPiece = colorAll(currentPiece, 0);
        for(var i = 0; i < 4; i++){
            if((currentPiece[i] + 10 > 200) || (isColored(currentPiece, currentPiece[i], 10))){
                for(i--; i >= 0; i--){
                       currentPiece[i] = currentPiece[i] - 10;
                   }
                currentPiece = colorAll(currentPiece, 1);
                score = score + doClear(currentPiece);
                updateScore(score);
                currentPiece = getRandomPieceArray();
                if(didLose(currentPiece)){
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
        if(!lost){
            currentPiece = colorAll(currentPiece, 1);
        }
    }
}


function getRandomPieceArray(){
    var squareOffset = [0, 1, 10, 11, 0, 0];
    var lineOffset = [0, 10, 20, 30, 1, 0];
    var zOffset = [0, 1, 11, 12, 2, 0];
    var backZOffset = [0, 1, 9, 10, 3, 0];
    var rOffset = [0, 1, 10, 20, 4, 0];
    var lOffset = [0, 1, 11, 21, 5, 0];
    var tOffset = [0, 9, 10, 11, 6, 0];
    var currentPiece = [0, 0, 0, 0, 0, 0];
    var num = Math.floor(Math.random() * 7 + 1);
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

//colors all current pieces red, if x is 1, and blue if not
function colorAll(currentPiece, x){
    if(x == 1){
        switch(currentPiece[4]){
            case 0:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "yellow");
                }
                break;
            }
            case 1:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "aqua");
                }
                break;
            }
            case 2:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "red");
                }
                break;
            }
            case 3:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "lime");
                }
                break;
            }
            case 4:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "blue");
                }
                break;
            }
            case 5:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "orange");
                }
                break;
            }
            case 6:{
                for(var i = 0; i < 4; i++){
                    $("#box" + currentPiece[i]).css("background-color", "mediumpurple");
                }
                break;
            }
        }
    }
    else{
        for(var i = 0; i < 4; i++){
            $("#box" + currentPiece[i]).css("background-color", "black");
        }
    }
    return currentPiece;
}

//check if a space is colored
function isColored(currentPiece, currentBlock, offset){
    if(($("#box" + (currentBlock + offset)).css("background-color") == "rgba(0, 0, 0, 0)") || ($("#box" + (currentBlock + offset)).css("background-color") == "rgb(0, 0, 0)")){
        return false;
    }
    else{
        for(var i = 0; i < 4; i++){
            if(currentPiece[i] == currentBlock + offset){
                return false;
            }
        }
        return true;
    }
}

function pieceCanMove(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour){
    //checking if any pieces are colored
    if((isColored(currentPiece, currentPiece[0], offsetOne)) || (isColored(currentPiece, currentPiece[1], offsetTwo)) || (isColored(currentPiece, currentPiece[2], offsetThree)) || (isColored(currentPiece, currentPiece[3], offsetFour))){
        return false;
    }
    else if((currentPiece[0] + offsetOne > 200) || (currentPiece[1] + offsetTwo > 200) || (currentPiece[2] + offsetThree > 200) || (currentPiece[3] + offsetFour > 200)){
            return false;
    }
    else if(sideOverflow(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour)){
        return false;
    }
    else{
        return true;
    }
}

function rotatePiece(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour){
    colorAll(currentPiece, 0);
    if(pieceCanMove(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour)){
        currentPiece[0] = currentPiece[0] + offsetOne;
        currentPiece[1] = currentPiece[1] + offsetTwo;
        currentPiece[2] = currentPiece[2] + offsetThree;
        currentPiece[3] = currentPiece[3] + offsetFour;
        colorAll(currentPiece, 1);
        if(currentPiece[5] == 3){
            currentPiece[5] = 0;
        }
        else{
            currentPiece[5]++;
        }
    }
    else{
        colorAll(currentPiece, 1);
    }
}

//check if a rotation rotates over the side
function sideOverflow(currentPiece, offsetOne, offsetTwo, offsetThree, offsetFour){
    var offset = [offsetOne, offsetTwo, offsetThree, offsetFour];
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
        var column = Math.floor((currentPiece[j] - 1)/10);
        column = column * 10;
        pieceClear[j + 4] = column;
        for(var k = 1; k < 11; k++){
            if(!isColoredMinus(currentPiece, column, k)){
                pieceClear[j] = 0;
                break;
            }
        }
    }
    return pieceClear;
}

function doClear(currentPiece){
    var clearArray = getClear(currentPiece);
    var workArray = [200, 200, 200, 200];
    for(var i = 0; i < 4; i++){
        if(clearArray[i] == 1){
            workArray[i] = clearArray[i + 4];
        }
    }
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


function clearLine(line){
    var currentLine = line;
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

//less strict is colored function (can be same block)
function isColoredMinus(currentPiece, currentBlock, offset){
    if(($("#box" + (currentBlock + offset)).css("background-color") == "rgba(0, 0, 0, 0)") || ($("#box" + (currentBlock + offset)).css("background-color") == "rgb(0, 0, 0)")){
        return false;
    }
    else{
        return true;
    }
}

function didLose(currentPiece){
    for(var i = 0; i < 4; i++){
        if(!(($("#box" + currentPiece[i]).css("background-color") == "rgba(0, 0, 0, 0)") || ($("#box" + currentPiece[i]).css("background-color") == "rgb(0, 0, 0)"))){
            return true;
        }
    }
    return false;
}

function handleLoss(currentPiece, fall){
    currentPiece = null;
    for(var i = 1; i < 201; i++){
        $('#box' + i).css("background-color", "black");
    }
    clearInterval(fall);
    $('#mainBox').empty();
    $('#score').html("Tetris");
    //add play button back
    $("#mainBox").append("<input type=\"button\" value=\"Play\" onclick=\"play()\" id=\"playButton\">");
    window.alert("You lost!");
}

function updateScore(score){
     $("#score").html("Score: " + score);
}
