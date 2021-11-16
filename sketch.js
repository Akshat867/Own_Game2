var ground, ball;
var score = 0;
var lives = 3;
var paddle;
var bricks;
var brick;
var edges;

gameState = "Serve";

function setup(){
    var canvas = createCanvas(400,400);
    ball = createSprite (200,200,10,10)
    ball.shapeColor = "white";
    paddle = createSprite(200,350,120,10); 
    paddle.shapeColor = "Blue";    
    edges = createEdgeSprites();
    bricks = createGroup()
    createBrickRow(65,"red")
    createBrickRow(65+29,"orange")
    createBrickRow(65+29+29,"green")
    createBrickRow(65+29+29+29,"yellow")

}

function draw(){
    background(0);
    textSize(20)
    text("Score: " + score,40,25)
    text("Lives: " + lives,40,45)
    if(gameState === "Serve"){
        text("Click to serve the ball",120,250)
        ball.velocityX = 0
        ball.velocityY = 0
        ball.x = 200;
        ball.y = 200;

    }
     else if(gameState === "end"){
        text("Game Over",150,250);
        ball.remove();

     }
     else {
         gamePlay();
     }
     
    drawSprites();
    

}

function mouseClicked(){
ball.velocityX = 10;
ball.velocityY = 6;
if(gameState === "Serve"){
    gameState = "Play";
    ball.velocityX = -7;
    ball.velocityY - -7;
    bricks.setVelocityYEach(0.2);
}
}
function brickHit(ball,brick){
    brick.remove()
    score = score + 5;
    if(ball.velocityY<12 && ball.velocityY>-12){
        ball.velocityX*= 1.05;
        ball.velocityY*= 1.05;
    }
}

function lifeover(){
    lives = lives-1;
    if(lives>=1){
        gameState = "Serve";
    }
    else{
        gameState = "end";
    }
}

function createBrickRow(y,color){
    for(var c = 0; c <6; c++ ){
        brick = createSprite(65+54*c,y,50,25);
        brick.shapeColor = color
        bricks.add(brick)

    }
}
function gamePlay(){
    //paddle.x = World.mouseX;
    paddle.x = ball.x
    if(paddle.x<60){
        paddle.x = 60;
    }
    if(paddle.x>340){
        paddle.x = 340;
    }
    ball.bounceOff(edges[0])
    ball.bounceOff(edges[1])
    ball.bounceOff(edges[2])
    ball.bounceOff(bricks,brickHit);
    ball.bounceOff(paddle)
    //if(ball.bounceOff(paddle)){
    //    playSoun
    //}
if(!bricks[0]){
ball.velocityX = 0;
ball.velocityY = 0;
text("Well Done !",150,200)
}
if(ball.isTouching(edges[3])){
    lifeover();
}
}