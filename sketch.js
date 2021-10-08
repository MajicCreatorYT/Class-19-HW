var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;



  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();



  ghost=createSprite(300,300,50,50)
  ghost.addImage(ghostImg);
  ghost.scale=0.35 
  


  spookySound.loop();
}

function draw() 
{
  background(0);
  
  
  

    


    if(gameState==="play")
    {
      drawSprites();

      if(tower.y > 400)
      {
        tower.y = 300
      }


      if(keyDown("d"))
      {
        ghost.x=ghost.x+5;
      }

      if(keyDown("a"))
      {
        ghost.x=ghost.x-5;
      }

      if(keyDown("space"))
      {
        ghost.velocityY=-5;
      }

      ghost.velocityY=ghost.velocityY+0.8

    

      if(climbersGroup.isTouching[ghost])
      {
        ghost.velocityY=0
      }


     if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
      {
        ghost.destroy();
        gameState="end";
      }
      
      spawn_windows();

    }
    
    if(gameState==="end")
    {
      fill("yellow")
      textSize(30)
      text("Game Over",300,300);
    }
    


   

}



function spawn_windows()
{
  if(frameCount%240===0)
  {
    door=createSprite(200,-50);
    door.addImage(doorImg);
    
    climber=createSprite(200,20);
    climber.addImage(climberImg);



    invisibleBlock=createSprite(200,25);
    invisibleBlock.width=climber.width
    invisibleBlock.height=2



    door.x=Math.round(random(100,500));
    door.velocityY=1;



    climber.x=door.x;
    climber.velocityY=1



    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1



    door.lifetime=800;
    doorsGroup.add(door);



    climber.lifetime=800
    climbersGroup.add(climber);



    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlockGroup.debug=true;



    ghost.depth=door.depth
    ghost.depth+=1


    ghost.depth=climber.depth
    ghost.depth+=1
  }
  
  

}