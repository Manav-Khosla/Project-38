
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score = 0;
var ground;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(600, 450);
 
FoodGroup = new Group();
obstacleGroup = new Group();
  
monkey = createSprite(50, 395, 50, 50);
monkey.addAnimation("monkey_run", monkey_running);
monkey.scale=0.15;

ground = createSprite(300, 450, 600, 20);
camera.position.x=displayWidth/2;
}


function draw() {

background("lime");
textSize(25);
text("Score: " + score, 500, 20);

if (FoodGroup.isTouching(monkey)){
  score = score+1;
  monkey.y=395;
}

if (obstacleGroup.isTouching(monkey)){
  score = 0;
  FoodGroup.destroyEach();
  obstacleGroup.setVelocityXEach(0);
  textSize(40);
  text("Game Over", 200, 300);
}
if (ground.x<300){
  ground.x=ground.width/2;
}

if (keyDown("space")){
  monkey.y=monkey.y-13;
}

monkey.collide(ground);
  
monkey.velocityY = monkey.velocityY + 0.3;

food();
obstacles();
drawSprites();
  
}

function food(){
if (camera.position.x%80===0){
  
var foodY = Math.round(random(120, 200));  

banana = createSprite(580, foodY, 50, 50);
banana.velocityX = -5;
banana.lifetime = 300;
banana.addAnimation("fruit", bananaImage);
banana.scale=0.1;
FoodGroup.add(banana);
}
}

function obstacles(){
  if(camera.position.x%300===0){
   obstacle = createSprite(580, 390, 50, 50);
   obstacle.velocityX = -5;
   obstacle.lifetime = 300;
   obstacle.addAnimation("obstacle", obstacleImage);
   obstacle.scale=0.25;
   obstacleGroup.add(obstacle);
  }
}

