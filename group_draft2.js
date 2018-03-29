//this is the group javascript file
var obstaclesArray= [];
var gunArray = [];
var pic;
var bkgroundPic, groundPic, lifePic, startPic,runnerPic, gunPic, floorPic,dodgePic,jumpPic,obstacle1Pic,obstacle2Pic,obstacle3Pic,obstacle4Pic;

var begin = false;

var tempRunner;
var runnerX = 200; 
var runnerY = 350;
var gunX, gunY, numberofGuns;
var obstacleX,obstacleY, numberofObstacles;
var groundX = 0;
var groundY = 625;

var ground = 625; //Pixel height of the ground
var speed = 4; //Speed at which the ground, batteries, and obstacle will move
var gunOffScreen = false;
var obstacleOffScreen = false;


// // Player counters
var points = 0
var life = 5;

//Preload assets
function preload(){
  bkgroundPic = loadGif("images/background3.gif");
  runnerPic = loadGif("images/running.gif");
  dodgePic = loadGif("images/dodge.gif");
  jumpPic = loadGif("images/jump.gif");
  batteryPic = loadImage("images/battery.png");
  gunPic = loadImage("images/gun.png");
  lifePic = loadImage("images/lives.png");
  groundPic = loadImage("images/road5.jpg");
  startPic = loadImage("images/startPage.jpeg");
  //load all obstacle pics
  //load sound files here
  bkMusic = loadSound("sound/backgroundMusic.mp3");
  scored = loadSound("sound/score.mp3");
}

function setup(){
	console.log(dodgePic.totalFrames());
	console.log(jumpPic.totalFrames());
	// if width of screen.. canvas size
	createCanvas(1500, 843);
	// numberofBatteries = int(random(1,4));
	numberofGuns = int(random(1,3));
	// numberofObstacles = int(random(1,2));

	bkMusic.play();
	tempRunner = new Runner();

	// //Instantiate battery ovjects
	// for (var i = 0; i<numberofBatteries; i++) {
	//   //changed x position to random(100,width-20) because we should leave space for runner
	//   var tempBat = new Batteries(random(100,width-20),ground);
	//   batteryArray.push(tempBat);
	// }
	//Instantiate gun objects
	for (var i = 0; i<numberofGuns; i++) {
	//changed x position to random(100,width-20) because we should leave space for runner
	var tempGun = new Guns(random(250,width-20),ground);
	gunArray.push(tempGun);
	}
	// //Instantiate cyborg objects
	// for (var i = 0; i <numberofCyborgs;i++) {
	//   //changed x position to random(150,width-20) because we should leave space for runner
	//   //and make sure that runner has time to jump over cyborg
	//   var tempCyborg = new Cyborgs(random(150,width-20,ground));
	//   cyborgArray.push(tempCyborg);
	// }
}


function draw() {
	background(0);
	if (begin == false) {
		image(startPic,0,0,1500,843);
		function mouseClicked() {
			begin = true;
		}
	}
	else {
		image(bkgroundPic, 10, -100, 1500, 843);
	  //Display and move ground
	  	groundX -= speed;
	  	if (groundX <-1181) {
	  		groundX = 0;
	  	}
		image(groundPic,groundX,groundY);
	  //Display and update each gun object
	  for (var i=0; i<gunArray.length;i++) {
			gunArray[i].display();
			gunArray[i].move();
			gunArray[i].checkCollision(); //check if kouki picks up gun
			//When the gun is off screen, add a new gun
			if (gunOffScreen == true) {
			  gunArray.splice(i,1);
			  var tempGun = new Guns (random(200,width-20), ground);
			  gunArray.push(tempGun);
			}
		}

	  	tempRunner.display();
		if (pic.frame() === pic.totalFrames()-1) {
			pic = runnerPic;
			runnerX = 200;
			runnerY = 350;
			pic.frame(0);
		}
		
		

	  // Display hits and misses
	  noStroke();
	  textSize(20);
	  fill(255);
	  text("SCORE: " + points, 50, 120);
	  displayLives();

	}
	
}


class Guns{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	display() {
		image(gunPic,this.x,this.y, 100, 60);
	}
	move() {
		this.x -=speed;
		if (this.x <0) {
		  gunOffScreen = true;
		}
		else {
		  gunOffScreen = false;
		}
		return gunOffScreen;
	}
	//check if the kouki picked up the gun
	checkCollision() {
		if ((this.x -runnerX) < 80) {
		  points += 1;
		  //Play sound effect for point earned
		  scored.play();
		  //Remove gun from array and add a new gun object
		  gunOffScreen = true;
		}
		 return gunOffScreen;
	}
}

/*
class obstacles{
  constructor (x,y) {
    this.x = x;
    this.y = y;
  }
  display() {
    image(cyborgGif,this.x,this.y, 50, 63);
  }
  move () {
    this.x -=speed;
    if (this.x <0) {
      cyborgOffScreen = true;
    }
    else {
      cyborgOffScreen = false;
    }
    return cyborgOffScreen;
  }
  //check if the kouki collided with the cyborg
  checkCollision(x, y) {
    var distCyborg = dist(this.x, this.y, runnerX, runnerY);
    if (distCyborg<= 45) {
      life -= 1;
      //Play sound effect for getting hit
      //Remove cyborg from array and add a new cyborg object
      cyborgOffScreen = true;
    }
    return cyborgOffScreen;
  }
}
*/
class Runner{
	constructor() {
		pic = runnerPic;
	}
	display(){
		image(pic,runnerX,runnerY);
	}
}

function keyPressed() {
  if (keyCode === 87) {
  	//W
	pic = jumpPic; 
	runnerY= 280;
	pic.frame(0);
  } 
  else if (keyCode === 83) {
  	//S
    pic = dodgePic;
    runnerX = 210;
    runnerY = 380;
	pic.frame(0);
  } 
}

function displayLives() {
	var tempX = 50;
	var tempY = 50;
	for (var i=0; i<life; i++) {
		image(lifePic,tempX,tempY,40,40);
		tempX += 50;
	}
}
