//this is the group javascript file
var obstaclesArray= [];
var gunArray = [];
var pic;
var bkgroundPic, groundPic, lifePic, startPic,runnerPic, gunPic, floorPic,dodgePic,jumpPic, droneRedPic, droneGreenPic, droneBlackPic;

var begin = false;

var tempRunner;
var runnerX = 200;
var runnerY = 350;
var gunX, gunY, numberofGuns;
var groundX = 0;
var groundY = 625;
var droneInSky, droneOnGrd;
var frameCounter = 0;
var droneGenerated = false;

var ground = 625; //Pixel height of the ground
var speed = 4; //Speed at which the ground, batteries, and obstacle will move
var gunOffScreen = false;
var obstacleOffScreen = false;


// Player counters
var points = 0
var life = 5;
var fontMedium;



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
  startPic = loadImage("images/startPage");
  droneRedPic = loadImage("images/droneRed.png");
  droneGreenPic = loadImage("images/droneGreen.png");
  droneBlackPic = loadImage("images/droneBlack.png")
  //load sound files here
  bkMusic = loadSound("sound/backgroundMusic.mp3");
  scored = loadSound("sound/score.mp3");
  //load font
  fontMedium = loadFont('fonts/Orbitron-Medium.ttf');
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

	//Instantiate gun objects
	for (var i = 0; i<numberofGuns; i++) {
	//changed x position to random(100,width-20) because we should leave space for runner
	var tempGun = new Guns(random(250,width-20),ground);
	gunArray.push(tempGun);
	}

 //Instantiate drone obstacle objects
  // droneInSky = new Obstacle(random(1100, 1400), ground - 270, "random");
  droneOnGrd = new Obstacle(random(500, 900), ground, "random");
  // obstaclesArray.push(droneInSky);
  obstaclesArray.push(droneOnGrd);

}

function generateDroneHeight() {
  var rnd = Math.round(random(1, 2));
  if (rnd === 1) {
    return ground;
  }
  return ground - 270;
}

// Returns true every second
function readyToGenerateDrone() {
  return frameCounter % 60 === 0;
}
function mouseClicked() {
  begin = true;
}

function draw() {
	background(0);
	if (begin == false) {
		image(startPic, 0, 0, 1500, 843);
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

    //Display and update the obstacle object
    frameCounter += 1;
    for (var i=0; i < obstaclesArray.length; i++){
      obstaclesArray[i].display();
      obstaclesArray[i].move();
      obstaclesArray[i].checkCollision();
    }

    //When the obstacle is off screen, add a new obstacle
    if (obstacleOffScreen) {
      obstaclesArray.splice(0, 1);

      //Ensure that drones are spaced one second apart
      if (readyToGenerateDrone()) {
        var droneHeight = generateDroneHeight();
        var tempDrone = new Obstacle(random(600, 1400), droneHeight, "random");
        obstaclesArray.push(tempDrone);
        obstacleOffScreen = false;
      }
    }

	  // Display score and lives
	  noStroke();
    textFont(fontMedium);
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
	// check if the kouki picked up the gun
	checkCollision() {
		if ((this.x -runnerX) < 80) {
		  points += 1;
		  // Play sound effect for point earned
		  scored.play();
		  // Remove gun from array and add a new gun object
		  gunOffScreen = true;
		}
	}
}

class Obstacle {
  constructor (x, y, type) {
    this.x = x;
    this.y = y;

    if (type == "random") {
      this.type = this.randomColor()
    } else {
      this.type = type
    }
  }
  // randomHeight(){
  //   //h returns number 0 or 1, both inclusives
  //   var h = int(random(0,2));
  //   console.log("random height state: " + h);
  //   if (h == 0) {
  //     obstacleY = ground
  //   } else if (h == 1) {
  //     obstacleY = ground - 270
  //   }
  // }

  isGreen() {
    return this.type == "green"
  }

  isRed() {
    return this.type == "red"
  }

  isBlack() {
    return this.type == "black"
  }

  randomColor() {
    var i = Math.round(random(0, 2));
    var rndType = ""
    if (i == 0) {
      rndType = "green"
    } else if (i == 1) {
      rndType = "red"
    } else {
      rndType = "black"
    }
    return rndType
  }

  display() {
    var dronePic = "";

    if (this.isRed()) {
      dronePic = droneRedPic
    } else if (this.isGreen()) {
      dronePic = droneGreenPic
    } else if (this.isBlack()) {
      dronePic = droneBlackPic
    }

    var xDist = this.x - runnerX;
    var yDist = this.y - runnerY;
    console.log(yDist);

    // if (this.x <= 0 || xDist < 250) {
    //   console.log("goodbye");
    //   obstacleOffScreen = true;
    // } else {
    //   image(dronePic, this.x, this.y, 100, 59);
    //   obstacleOffScreen = false;
    if (this.x <= 0 || xDist < 250) {
      if (yDist == 5 || yDist == 275) {
        console.log("standing collision")
        obstacleOffScreen = true;
      } else {
        image(dronePic, this.x, this.y, 100, 59);
        obstacleOffScreen = false;
      }
    }
  }

  move() {
    // jitter
    // this.x += random(-1, 1);
    // this.y += random (-1, 1);

    // move obstacle towards the runner
    this.x -= speed;
    this.x = Math.max(0, this.x);
  }

  // Check if the kouki collided with the drone
  checkCollision() {
    // console.log(this.x - runnerX);
    // if ((this.x - runnerX) <= 80) {
    //   life -= 1;
    //   //Play sound effect for getting hit

    //   //Remove cyborg from array and add a new cyborg object
    //   obstacleOffScreen = true;
    // }

    // check if the obstacle has gone off-screen
    // console.log(this.x);
    // if (this.x === 0) {
    //   obstacleOffScreen = true;
    //   console.log("it just disappeared yo!")
    // } else {
    //   obstacleOffScreen = false;
    // }
  }
}

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
