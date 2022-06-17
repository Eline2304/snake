var canvas;         //variable benoemen
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_SIZE = 10;    //grote van de apple
const ALL_DOTS = 900;   //maximaal aantal punten van de slang
const MAX_RAND = 39;    //positie van de apple berekenen 
const DELAY = 140;      // de snelheid van het spel  
const C_HEIGHT = 400;    //grote van het canvas
const C_WIDTH = 400;      //grote van het camvas

const LEFT_KEY = 37;       //waarde van de toetsen om het spel te spelen 
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);   //de x en y cordinaten van de punten van de slang
var y = new Array(ALL_DOTS);   

function init() {
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);   //start van animatie
}    

function loadImages() {    //ophalen van afbeelding
    
    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image();
    ball.src = 'dot.png'; 
    
    apple = new Image();
    apple.src = 'apple.png'; 

gameoverfoto = new Image
}

function createSnake() {         //het maken van de slang

    dots = 3;                     //de slang begint met 3 punten 

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkApple() { //als het hoofd van de slang de apple raakt wordt de slang langer

    if ((x[0] == apple_x) && (y[0] == apple_y)) {    //als de coridnaten van de apple gelijk zijn aan die van het hoofd

        dots++;                                      //de slang wordt een punt langer
        locateApple();
    }
}    

function doDrawing() {                                //teken de slang en de apple
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);       //teken de apple op de berekende x en y cordinaten

        for (var z = 0; z < dots; z++) {              //variable z om het punt van de slang aan te geven, 0 is het hoofd 
            
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);      //teken het hoofd van de slang
            } else {
                ctx.drawImage(ball, x[z], y[z]);      //teken de rest van de punten van de slang
            }
        }    
    } else {

        gameOver();
    }        
}

function gameOver() {                   //geef de tekst van gameover weer als het spel plaar is. 
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = '18px fantasy';
    ctx.fillText('Game over, druk op F5 om opnieuw te starten', C_WIDTH/2, C_HEIGHT/2);
}

function checkApple() {                 //als het hoofd de apple raakt wordt de slang langer

    if ((x[0] == apple_x) && (y[0] == apple_y)) {   //als de cordinaten van het hoofd gelijk zijn aan de cordinaten van de apple

        dots++;                                      //de lengte van de slang wordt langer
        locateApple();
    }
}

function move() {  //bewegen van de slang

    for (var z = dots; z > 0; z--) { //de lengte van de slang wordt variable z, z is groter dan 0
    
        x[z] = x[(z - 1)];    //x cordinaten van het hoofd worden de nieuwe cordinaten van de achterligende punten, de slang bebwwegt naar het hoofd toe. 
        y[z] = y[(z - 1)];    //y cordinaten van het hoofd worden de nieuwe cordinaten van de achterligende punten, de slang bebwwegt naar het hoofd toe.
    }

    if (leftDirection) {   //nieuwe plaats van punt x min 1 om naar links te bewegen
    
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {   //nieuwe plaats van punt x plus 1 om naar rechts te bewegen
    
        x[0] += DOT_SIZE;
    }

    if (upDirection) {     //nieuwe plaats van punt y min 1 om naar boven te bewegen te bewegen
    
        y[0] -= DOT_SIZE;
    }

    if (downDirection) {     //nieuwe plaats van punt y plus 1 om naar onder te bewegen te bewegen te bewegen   
    
        y[0] += DOT_SIZE;  
    }
}    

function checkCollision() {   //de slang gaat dood als het de rand raakt of zichzelf

    for (var z = dots; z > 0; z--) {  //als de slang een punt raakt gaat het dood

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) { //als de cordinaten van het hoofd en een punt gelijk zijn gaat de slang dood
            inGame = false;
        }
    }    
                                    //de slang gaat dood als het de rand raakt
    if (y[0] >= C_HEIGHT) {         //als de y cordinaten van het hoofd gelijk of groter zijn aan de grote van het canvas gaat de slang dood
    
        inGame = false;
    }

    if (y[0] < 0) {                 //als de x cordinaten van het hoofd kleiner zijn dan 0 gaat de slang dood 
    
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {          //als de x cordinaten van het hoofd gelijk of groter zijn aan de grote van het canvas gaat de slang dood 
    
      inGame = false;
    }

    if (x[0] < 0) {                 //als de x cordinaten van het hoofd kleiner zijn dan 0 gaat de slang dood 
    
      inGame = false;
    }
}

function locateApple() {            // berekenen van positie apple

    var r = Math.floor(Math.random() * MAX_RAND); //math.floor betekend afronden naar beneden, een random getal tussen 0 en 1 vermenigvuldigen met de maximale waarde van de apple
    apple_x = r * DOT_SIZE;                       //berekenen van x cordinaat doormiddelvan r

    r = Math.floor(Math.random() * MAX_RAND); //math.floor betekend afronden naar beneden, een random getal tussen 0 en 1 vermenigvuldigen met de maximale waarde van de apple
    apple_y = r * DOT_SIZE;                   //berekenen van x cordinaat doormiddelvan r

}    

function gameCycle() {                      
    
    if (inGame) {                             //als het spel aan de gang is worden de volgende controles uitgevoerd

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {                          //reactie bij gebruik van de toetsen
    
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {   //als de de pijl naar links wordt ingedrukt en de slang niet naar rechts beweegt, beweegt de slang naar links
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {    //als de de pijl naar rechts wordt ingedrukt en de slang niet naar links beweegt, beweegt de slang naar rechts
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {       //als de de pijl omhoog wordt ingedrukt en de slang niet naar benenden beweegt, beweegt de slang naar boven
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {      //als de de pijl omlaag wordt ingedrukt en de slang niet naar boven beweegt, beweegt de slang naar beneden
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    
