var world = [
  [1,1,1,1,1,1,1,1,1], //row 0
  [1,0,2,2,1,2,2,2,1], //row 1
  [1,2,1,2,3,2,1,2,1],
  [1,2,1,2,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,1],
  [1,3,1,1,1,2,1,3,1],
  [1,2,2,2,2,2,2,2,1],
  [1,2,1,2,1,1,1,2,1],
  [1,2,1,2,3,2,1,2,1],
  [1,2,2,2,1,2,2,2,1],
  [1,1,1,1,1,1,1,1,1],
]
var worldDict = {
  0: 'blank',
  1: 'wall',
  2: 'sushi', //1 points
  3: 'onigiri' //10 points
}

var ninjaman = {
x: 1,
y: 1,
direction: 0,
lives: 3,
score: 0
}

var pacman = {
  x: 1,
  y: 9,
  direction: 0,
  lives: 3,
  score: 0
}

var red = {
x: 7,
y: 1
}

var generate = 0
var randomWorld = 0 //the reason for this is so I can easily still toggle my old world since the random gen is not very nice. Normally it would be smart to kill the array up top and just use 2 variables for height and width of the game board.
function randomizeWorld (){
  for(var row = 0; row < world.length; row++){
    for(var x = 0; x < world[row].length; x++){
      var tile = Math.floor(Math.random()*3+1)
      world[row][x]= tile
    }
  }
}

function drawWorld() {
  var output = ""
  for(var row = 0; row < world.length; row++){
    output += "<div class = 'row'>"
    for(var x = 0; x < world[row].length; x++){
      output += "<div class = '" + worldDict[world[row][x]] + "'></div>"
      }
  output += "</div>";
  }
  output += "<div>Ninjaman</div>"
  output += "<div> Score: " + ninjaman.score + "</div>"
  output += "<div> Lives: " + ninjaman.lives + "</div>"
  output += "<br>"
  output += "<div>Pacman</div>"
  output += "<div> Score: " + pacman.score + "</div>"
  output += "<div> Lives: " + pacman.lives + "</div>"
  document.getElementById('world').innerHTML = output
}

function drawNinjaman(){
  document.getElementById('ninjaman').style.top = ninjaman.y*40 + 'px'
  document.getElementById('ninjaman').style.left = ninjaman.x*40 + 'px'
  document.getElementById('ninjaman').style.transform = "rotate("+ninjaman.direction+"deg)"
}

function drawPacman(){
  document.getElementById('pacman').style.top = pacman.y*40 + 'px'
  document.getElementById('pacman').style.left = pacman.x*40 + 'px'
  document.getElementById('pacman').style.transform = "rotate("+pacman.direction+"deg)"
}

function drawRed(){
  document.getElementById('red').style.top = red.y*40 + 'px'
  document.getElementById('red').style.left = red.x*40 + 'px'
}

function moveRed(){
  if (red.x > ninjaman.x && world[red.y][red.x - 1] != 1) {
    red.x--
  }
  else if (red.x < ninjaman.x && world[red.y][red.x + 1] != 1) {
    red.x++
  }
  else if (red.y > ninjaman.y && world[red.y - 1][red.x] != 1) {
    red.y--
  }
  else if (red.y < ninjaman.y && world[red.y + 1][red.x] != 1) {
    red.y++
  }
}
function touchCheck() {
  if (ninjaman.x == red.x && ninjaman.y == red.y) {
    ninjaman.lives--
    ninjaman.x = 1
    ninjaman.y = 1
    red.x = 7
    red.y = 1
  }
  if (pacman.x == red.x && pacman.y == red.y) {
    pacman.lives--
    pacman.x = 1
    pacman.y = 7
    red.x = 7
    red.y = 1
  }
  if ((ninjaman.lives === 0 || pacman.lives === 0) || ninjaman.score+pacman.score === 80){
    gameOver()
  }
}

function gameOver(){
  ninjaman.lives = ninjaman.lives + "    Game Over - f5 to restart"
  for(var row = 0; row < world.length; row++){
    for(var x = 0; x < world[row].length; x++){
      world[row][x]= 1
    }
  }
}

document.onkeydown = function(e){ 
  //ninjaman
  console.log(e)
  if (e.keyCode == 37 && world[ninjaman.y][ninjaman.x-1] !=1 && ninjaman.x > 0) { 
    ninjaman.x--
    ninjaman.direction = 180
  }
  else if (e.keyCode == 38 && world[ninjaman.y-1][ninjaman.x] !=1 && ninjaman.y > 0) { //up
    ninjaman.y--
    ninjaman.direction = 270
  }
  else if (e.keyCode== 39 && world[ninjaman.y][ninjaman.x+1] !=1&& ninjaman.x < 9) { //right
    ninjaman.x++
    ninjaman.direction = 0
  }
  else if (e.keyCode == 40 && world[ninjaman.y+1][ninjaman.x] !=1 && ninjaman.y < 11) {//down
    ninjaman.y++
    ninjaman.direction = 90
  }

  //pacman
  if (e.keyCode == 65 && world[pacman.y][pacman.x-1] !=1 && pacman.x > 0) { 
    pacman.x--
    pacman.direction = 180
  }
  else if (e.keyCode == 87 && world[pacman.y-1][pacman.x] !=1 && pacman.y > 0) { //up
    pacman.y--
    pacman.direction = 270
  }
  else if (e.keyCode == 68 && world[pacman.y][pacman.x+1] !=1&& pacman.x < 9) { //right
    pacman.x++
    pacman.direction = 0
  }
  else if (e.keyCode == 83 && world[pacman.y+1][pacman.x] !=1 && pacman.y < 11) {//down
    pacman.y++
    pacman.direction = 90
  }

  if (world[ninjaman.y][ninjaman.x] == 2){
    world[ninjaman.y][ninjaman.x] = 0
    ninjaman.score++
  }
  else if (world[ninjaman.y][ninjaman.x] == 3){
    world[ninjaman.y][ninjaman.x] = 0
    ninjaman.score = ninjaman.score + 10
  }

  if (world[pacman.y][pacman.x] == 2){
    world[pacman.y][pacman.x] = 0
    pacman.score++
  }
  else if (world[pacman.y][pacman.x] == 3){
    world[pacman.y][pacman.x] = 0
    pacman.score = pacman.score + 10
  }

  drawNinjaman()
  drawPacman()
  drawWorld()
  touchCheck()
}
function gameLoop(){
  drawWorld()
  touchCheck()
  moveRed()
  drawRed()
  setTimeout(gameLoop,1000)
}
gameLoop()