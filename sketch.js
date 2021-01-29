
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var backgroundImg;
var backgroundImg2;
var player, playerImg;
var ground;
var obstacles,obstacleImg;
var position;
var ground2, ground2Img;
var play = 1;
var end = 0;
var gameState = play;


function preload()
{
	backgroundImg = loadImage("mario2.png");
	backgroundImg2 = loadImage("background.png");
	playerImg = loadAnimation("mario3.png","mario4.png","mario5.png");
	playerImg2 = loadAnimation("mario3.png");
	obstacleImg = loadImage("ant1.png");
	obstacleImg2 = loadImage("ant2.png");
	ground2Img = loadImage("mario2.jpg");
}

function setup() {
	createCanvas(800, 600);

	engine = Engine.create();
	world = engine.world;

	obstaclesGroup = createGroup();
	
	background2 = createSprite(400,100,800,600);
	background2.addImage("back",backgroundImg2);
	background2.scale = 2.6;
	background2.velocityX = -3;

	ground = createSprite(100,550,800,20);
	ground.velocityX = -3;
	ground.scale = 3;
	ground.x = ground.width/2;
	ground.visible = false;
	console.log(ground.x);

	player = createSprite(60,510,0,0);
	player.addAnimation("run",playerImg);
	player.addAnimation("stop",playerImg2);
	player.debug = true;

	Engine.run(engine);
  
}

function draw() {
	Engine.update(engine);
	rectMode(CENTER);
	background(0);
	
	if (background2.x < 280){
		background2.x = displayWidth/4;
	}
	
	player.collide(ground);

	
	if(gameState===play){
		spawnGround();
		spawnObstacles();
		
		if (ground.x < 0){
			ground.x = ground.width/2;
		}

		if(keyDown("space")&& player.y>=400 ) {
			player.velocityY = -12;
		}  
		player.velocityY = player.velocityY+0.8;

		if(player.isTouching(obstaclesGroup)){
			gameState = end;
		}
		else if(gameState === end){
			player.changeAnimation(playerImg2);
			// background2.velocityX = 0;
			// ground.velocityX = 0;
			// ground2.velocityX = 0;
			// player.velocityY = 0;
			// obstaclesGroup.setVelocityXEach(0);
		}
		console.log(gameState);
	}

	drawSprites();
}


function spawnObstacles(){
	if(frameCount % 120===0){
		obstacles = createSprite(200,500,30,30);
	
		var position = Math.round(random(1,2));
		obstacles.shapeColor = "black";
		obstacles.scale = 0.2;
		player.depth = player.depth+1;
		
		if(position===1){
			obstacles.x = 0;
			obstacles.addImage(obstacleImg);
			obstacles.velocityX = 3;
		}
		else{
			if(position===2){
				obstacles.x = 600;
				obstacles.addImage(obstacleImg2);
				obstacles.velocityX = -6;
			
			}
			obstacles.debug = true;
			console.log(obstacles.x,obstacles.y);
	}
	obstaclesGroup.add(obstacles);
	}
}

function spawnGround(){
	if(frameCount % 200===0){
		ground2 = createSprite(800,random(300,500),60,10);
		ground2.velocityX = -3; 
		ground2.addImage(ground2Img);
		player.collide(ground2);
	}
}