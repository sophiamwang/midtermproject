//this is the group javascript file
var obstaclesArray= [];
var gunArray = [];
var pic;
var bkgroundPic, runnerPic, gunPic, floorPic,dodgePic,jumpPic,obstacle1Pic,obstacle2Pic,obstacle3Pic,obstacle4Pic;

var tempRunner,runnerX, runnerY;
var gunX, gunY, numberofGuns;
var obstacleX,obstacleY, numberofObstacles;

var frames = 0;
var ground = 400; //Pixel height of the ground
var speed = 3; //Speed at which the ground, batteries, and obstacle will move
// var gunOffScreen = false;
// var obstacleOffScreen = false;


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

  // if width of screen.. canvas size
  createCanvas(1500, 900);
  // numberofBatteries = int(random(1,4));
  // numberofGuns = int(random(1,3));
  // numberofObstacles = int(random(1,2));

  bkMusic.play();
  tempRunner = new runner(200,ground);
  // //Instantiate battery ovjects
  // for (var i = 0; i<numberofBatteries; i++) {
  //   //changed x position to random(100,width-20) because we should leave space for runner
  //   var tempBat = new Batteries(random(100,width-20),ground);
  //   batteryArray.push(tempBat);
  // }
  // //Instantiate gun objects
  // for (var i = 0; i<numberofGuns; i++) {
  //   //changed x position to random(100,width-20) because we should leave space for runner
  //   var tempGun = new Guns(random(100,width-20),ground);
  //   gunArray.push(tempGun);
  // }
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
  tempRunner.display();

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

  // //Display and update each gun object
  // for (var i=0; i<gunArray.length;i++) {
  //   gunArray[i].display();
  //   gunArray[i].move();
  //   gunArray[i].checkCollision(x,y); //check if kouki picks up gun

  //   //When the gun is off screen, add a new gun
  //   if (gunOffScreen == true) {
  //     gunArray.splice(i,1);
  //     var tempGun = new Gun (random(50,width-20), ground);
  //     gunArray.push(tempGun);
  //   }
  // }
  // //Display and update each cyborg object
  // for (var i =0; i<cyborgArray.length;i++) {
  //   cyborgArray[i].display();
  //   cyborgArray[i].move();
  //   cyborgArray[i].checkCollision();

  //   //When the cyborg is off screen, add a new cyborg
  //   if (cyborgOffScreen == true) {
  //     cyborgArray.splice(i,1);
  //     var tempCyborg = new cyborgs(random(20,width-20),ground);
  //     cyborgArray.push(tempCyborg);
  //   }
  // }

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
/*
class Batteries {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display() {
    imageMode(CENTER);
    image(batteryPic,this.x,this.y,20,40);
  }
  move() {
    this.x -=speed;
    if (this.x <0) {
      batteryOffScreen = true;
    }
    else {
      batteryOffScreen = false;
    }
    return batteryOffScreen;
  }
  // check if the kouki picks up the GUN,
  checkCollision(x, y) {
    var distBattery = dist(this.x, this.y, runnerX, runnerY);
    if (distBattery <= 45) {
      points += 1;
      //Play sound effect for point earned
      scored.play();
      //Remove battery from array and add a new battery object
      batteryOffScreen = true;
    }
    return batteryOffScreen;
  }
class Guns{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display() {
    image(gunPic,this.x,this.y, 60, 39);
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
  checkCollision(x, y) {
    var distGun = dist(this.x, this.y, runnerX, runnerY);
    if (distGun<= 45) {
      points += 1;
      //Play sound effect for point earned
      scored.play();
      //Remove gun from array and add a new gun object
      gunOffScreen = true;
    }
     return gunOffScreen;
}
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
class runner{
	constructor(x,y) {
		this.runnerX = x;
		this.runnerX = y;
		this.state = 0;
		this.pic = runnerPic;
	}
	display(){
		console.log("displayed");
		if (this.state==0) {
			//running
			this.pic = runnerPic;
		}
		else if (this.state==1){
			//jumping
			this.pic = jumpPic;
		}
		else if (this.state==2){
			//dodging
			this.pic = dodgePic;
		}
		image(this.pic,200,400,400,400);
	}
	isRun(){
		return this.state==0;
		console.log("run");
	}
	isJump(){
		return this.state==1;
		console.log("jump");
	}
	isDodge(){
		return this.state==2;
		console.log("dodge");
	}
	
}

function keyPressed() {
	if (keyCode==87){
		//w = jump
// 		frames = 0;
		tempRunner.isJump();
// 		frames+=1;
// 		if (frames>=8) {
// 			tempRunner.isRun();
		}

	}
	else if (keyCode==83) {
		//s = dodge
// 		frames=0;
		tempRunner.isDodge();
// 		frames+=1;
// 		if (frames>=6){
// 			tempRunner.isRun();
// 		}
	}
}
