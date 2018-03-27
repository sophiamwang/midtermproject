//this is the group javascript file
var obstaclesArray= [];
var gunArray = [];
var pic;
var bkgroundPic, runnerPic, gunPic, floorPic,dodgePic,jumpPic,obstacle1Pic,obstacle2Pic,obstacle3Pic,obstacle4Pic;

var tempRunner,runnerX, runnerY;
var gunX, gunY, numberofGuns;
var obstacleX,obstacleY, numberofObstacles;

var frames = 0;
var ground = 570; //Pixel height of the ground
var speed = 3; //Speed at which the ground, batteries, and obstacle will move
var gunOffScreen = false;
var obstacleOffScreen = false;


// // Player counters
// var points = 0
// var life = 5;

//Preload assets
function preload(){
  bkgroundPic = loadGif("images/background3.gif");
  runnerPic = loadGif("images/running.gif");
  dodgePic = loadGif("images/jump.gif");
  jumpPic = loadGif("images/dodge.gif");
  batteryPic = loadImage("images/battery.png");
  gunPic = loadImage("images/gun.png");
  //floorPic = loadImage("images/floor.gif");
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
	tempRunner = new Runner(200,ground);

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
	image(bkgroundPic, 10, -100, 1500, 843);

	//image(floor, 0, 630);	
  // //Display and update each battery object
  // for (var i=0; i<batteryArray.length;i++) {
  //   batteryArray[i].display();
  //   batteryArray[i].move();
  //   batteryArray[i].checkCollision(x,y); //if kouki picks up battery

  //   //When the battery is off screen, add a new battery
  //   if (batteryOffScreen == true) {
  //     batteryArray.splice(i,1);
  //     var tempBat = new batteries (random(100,width-20), ground); //changed min x to 100
  //     batteryArray.push(tempBat);
  //   }
  // }

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
	console.log(pic.frame(), pic.totalFrames());
	if (pic.frame() === pic.totalFrames()-1) {
		pic = runnerPic;
		pic.frame(0);
	}
	tempRunner.display();

  // // Display hits and misses
  // noStroke();
  // textSize(20);
  // text("Assets: " + points, 650, 20);
  // text("Lives: " + life, 650, 35);

}


/*
add class Runner here
  //if lifes == 0, game over
*/

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
		var distGun = dist(this.x, this.y, runnerX, runnerY);
		if (distGun<= 20) {
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
	constructor(x,y) {
		this.x = runnerX;
		this.y = runnerY;
		pic = runnerPic;
	}
	display(){
		image(pic,200,300);
	}
}

function keyPressed() {
  if (keyCode === 87) {
	  pic = dodgePic;
	  pic.frame(0);
  } 
  else if (keyCode === 83) {
    pic = jumpPic;
	  pic.frame(0);
  } 
}
