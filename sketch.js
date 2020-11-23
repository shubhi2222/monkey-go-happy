var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,300)
  
  monkey= createSprite(50,254,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground= createSprite(0,300,500,30)
  ground.x=ground.width/2
  
  obstacleGroup= createGroup()
  FoodGroup= createGroup()
}


function draw() {
 background("white")
  
  monkey.collide(ground)
  
  if(gameState==PLAY){
    
    if(keyDown("space") && monkey.y >= 100) {
        monkey.velocityY = -12;
    
  }    
    
  //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
  
  score =  Math.ceil(frameCount/frameRate());
  
    
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach()
  }  
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END
    }
    
    
  spawnBananas()
  spawnObstacles()
    
}
  
 else if(gameState==END) {
   
   
   obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);  
     
    score=0

   
 }
  
  
  text("survival time = "+score,20,60)
  
  drawSprites()
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,275,10,40);
   obstacle.velocityX = -(6+score/5)
   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -(4+ score/5);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}



