const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gameState= "Play"
var fire, fireImg, ball2, shoot_Img;
var bow;
var coinGroup;
var gameOver, gameOverImg;
var visiblity=1;
var particle = [];
var newX =500;
var score=0;
var time=0;

function preload(){
  bg1=loadImage("images/bg5.png")
  p_walking1= loadAnimation("images/shooter_player (3).png","images/shooter_player (4).png","images/shooter_player (5).png"
  ,"images/shooter_player (6).png","images/shooter_player (7).png")
  e_walking1= loadAnimation("images/enemy11.png")
  platformImg= loadImage("images/platform2.png")
  shootImg= loadAnimation("images/shooter_player_shoot (1).png")
  groundImg= loadImage("images/ground.png")
  playerImg= loadAnimation("images/shooter_player (1).png")
  downImg= loadAnimation("images/shooter_player - down1.png")
  winImg= loadImage("images/medal1.png")
  fireImg= loadImage("images/fire.png")
  gameOverImg= loadImage("images/game_over.png")
  BallImg= loadAnimation("images/obstacle1.png")
  BowImg= loadImage("images/shooter1.png")
  coinImg= loadAnimation("images/coin1.png","images/coin2.png","images/coin3.png"
  ,"images/coin4.png","images/coin5.png","images/coin6.png")
  coinImgs= loadImage("images/coin1.png")
  BlockImg= loadImage("images/block.png")
  ballImg= loadImage("images/football.png")
  shoot_Img= loadImage("images/obstacle2.png")
}
function setup(){
  var canvas=createCanvas(1700,displayHeight);
  
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine)

  time:World.frameCount%1===0;
  coinGroup= new Group()
  platformGroup= new Group()
  platform_Group= new Group()
  block_Group= new Group()
  enemyGroup= new Group()
  BallGroup= new Group()
  player= new Player()
  ground= new Ground(100,600)
  for(var i=0; i<30; i++){
    platform= new Platform(newX)
    platforma= new Platforma(newX+2000)
    block= new Block(newX)
    platforma.velocityY=5
    newX= newX+platform.width
    newX= newX+platforma.width
    platformGroup.add(platform.body)
    platform_Group.add(platforma.body)
    block_Group.add(block.body)
    coin= new Coin(newX)
    if(i%1===0){
      enemy= new Enemy(newX+29000)
      enemyGroup.add(enemy.body)
    }    
    if(i%3===0){
      enemy= new Enemy(newX+16000)
      enemyGroup.add(enemy.body)
    }    
    if(i%3===0){
      enemy= new Enemy(newX+3000)
      enemyGroup.add(enemy.body)
    }
    if(i%5===0){
    ball= new Ball(newX)
    BallGroup.add(ball.body)
    }
  }

  platform1= new Ground(newX+350,700,100,50)
  win= new Win(newX+600)

 polygon = createSprite(newX,160,384,20)
 polygon.addImage(ballImg)
 polygon.scale=0.1
}
function draw()
{
  Engine.update(engine)
  
  background(bg1);
  fill ("white")
  textSize(40)
  text(score,player.body.x-220,90)
  image(coinImgs,player.body.x-300,50,50,50)
  if(gameState==="Play"){
  //if(frameCount%1000===0){
  //player.body.changeAnimation("coinImage")
//}
 // translate(-player.body.x,0)
 camera.position.x=player.body.x+300
 camera.position.y=height/2
 fill ("green")
 //textSize(50)
 //text(time,player.body.x-250,100)
 if(platform.body.x<0){
   platform.destroy()
 }
  if(keyDown("right")){
    player.moveRight()
  }
  if(keyDown("left")){
    player.moveLeft()
  }
  if(keyDown("up") && player.body.velocityY===0){
    player.moveUp()
  }
  player.gravity()
  enemy.gravity()
  if(player.body.collide(enemyGroup)){
    gameState="End"
  }
  
  if(player.body.x>=newX-300){
  if(frameCount%6===0){
    particle.push(new Particle(newX+200))
    }
    for(i=0;i<particle.length;i++){
      particle[i].display()
      }

    if(frameCount%10===0){
      particle.push(new Particle(newX+250))
      }
    
      for(i=0;i<particle.length;i++){
      particle[i].display()
      }
      if(frameCount%6===0){
      particle.push(new Particle(newX+300))
      }
    
      for(i=0;i<particle.length;i++){
      particle[i].display()
      }
      if(frameCount%3===0){
        particle.push(new Particle(newX+350))
        }
      
        for(i=0;i<particle.length;i++){
        particle[i].display()
        }  
        if(frameCount%8===0){
          particle.push(new Particle(newX+400))
          }
        
          for(i=0;i<particle.length;i++){
          particle[i].display()
          }
          if(frameCount%5===0){
            particle.push(new Particle(newX+450))
            }
          
            for(i=0;i<particle.length;i++){
            particle[i].display()
            }
            if(frameCount%7===0){
              particle.push(new Particle(newX+500))
              }
            
              for(i=0;i<particle.length;i++){
              particle[i].display()
              }
              if(frameCount%7===0){
                particle.push(new Particle(newX+550))
                }
              
                for(i=0;i<particle.length;i++){
                particle[i].display()
                }
  
            }

  player.body.collide(platformGroup)
  player.body.collide(platform_Group)
  player.body.collide(platform1.body)
  player.body.collide(enemyGroup)
  player.body.collide(ground.body)
  player.body.collide(win.body)
  player.body.collide(coinGroup,points)
  player.body.collide(BallGroup,end)
  BallGroup.collide(platformGroup)
  platform_Group.bounceOff(block_Group)
}
  drawSprites()

  if(fire){
    fire.collide(enemyGroup,killa)
  }
  if(ball2){
    ball2.collide(enemyGroup,killb)
  }
  

  if(player.body.collide(win.body)){
 fill ("Red")
 textSize(200)
 textFont("ALGERIAN")
 text("YOU WIN",player.body.x+200,height/2)
  }
  
  if(gameState==="End"){
    player.body.destroy()
    enemyGroup.setVelocityXEach(0)
    gameOver = createSprite(player.body.x+500,height/2,20,20)
    gameOver.addImage(gameOverImg)
    gameOver.scale=2.5
   
  }
  if(player.body.y>800){
    player.body.destroy()
  }
  if(player.body.collide(win.body)){
    enemyGroup.destroyEach()
  }
  
  
 //image(polygonImg,polygon.position.x,polygon.position.y,50,50)
}
function keyPressed(){
  if(keyCode===32 && gameState==="Play"){
    player.body.changeAnimation("shoot")
    fire= createSprite(player.body.x,player.body.y,20,20)
    fire.addImage(fireImg)
    fire.scale=0.1
    fire.velocityX=100
  }
  
  if(keyCode===(DOWN_ARROW) && gameState==="Play"){
    player.body.changeAnimation("down")
    player.body.scale=1.5
    ball2= createSprite(player.body.x,player.body.y,20,20)
    ball2.addImage(shoot_Img)
    ball2.scale=0.05
    ball2.velocityX=35
    ball2.velocityY=-8
  }
}
function killa(fire,enemy){
  tint(255,visiblity)
  enemy.alpha=visiblity
  fire.destroy()
  enemy.destroy()
  visiblity-=0.1
}
function killb(ball2,enemy){
  tint(255,visiblity)
  enemy.alpha=visiblity
  ball2.destroy()
  enemy.destroy()
  visiblity-=0.1
}
function end(player,ball){
  gameState="End"
}
function points(player,coin){
score++
coin.destroy()
} 


