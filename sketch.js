//this is the group javascript file
var obstaclesArray= [];
var gunArray = [];
var pic;
var bkgroundPic, groundPic, lifePic, startPic,runnerPic, gunPic, floorPic,dodgePic,jumpPic, droneRedPic,endPic, droneGreenPic, droneBlackPic;
var obstacleY;
var greenDroneY = 600;
var redDroneY = 350;

var begin = false;
var end = false;

var isJumping = false;
var isDodging = false;

var dronePic;
var tempLife = 0;

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
var speed = 6; //Speed at which the ground, batteries, and obstacle will move
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
  startPic = loadImage("images/startPage.png");
  droneRedPic = loadImage("images/droneRed.png");
  droneGreenPic = loadImage("images/droneGreen.png");
  endPic = loadImage("images/gameover.png")
  //load sound files here
  bkMusic = loadSound("sound/backgroundMusic.mp3");
  scored = loadSound("sound/score.mp3");
  hit = loadSound("sound/hit.mp3")
  //load font
  fontMedium = loadFont('fonts/Orbitron-Medium.ttf');
}

function setup(){
  console.log(dodgePic.totalFrames());
  console.log(jumpPic.totalFrames());
  // if width of screen.. canvas size
  createCanvas(1500, 843);
  numberofGuns = int(random(1,3));

  bkMusic.play();
  tempRunner = new Runner();

  //Instantiate gun objects
  for (var i = 0; i<numberofGuns; i++) {
  //changed x position to random(100,width-20) because we should leave space for runner
  var tempGun = new Guns(random(250,width-20),ground);
  gunArray.push(tempGun);
  }

 //Instantiate drone obstacle objects
  droneOnGrd = new Obstacle(random(500, 900), obstacleY, "random");
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
  return frameCounter % 30 === 0;
}
function mouseClicked() {
  begin = true;
}

function draw() {
  background(0);

  if (begin == false) {
    image(startPic, 0, 0, 1500, 843);
  } else if (begin == true) {
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
    if (pic.frame() === pic.totalFrames() - 1) {
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
    text("LIVES: ", 50, 70);
    displayLives();
    if (life <= 0) {
      end == true;
      fill(0);
      background(0);
      image(endPic, -50, -200, 1500, 843);
      points = 0;
      bkMusic.stop();
      scored.stop();
      hit.stop();
    }
  }
}

function keyPressed() {
  if (keyCode === 87) {
    //W
    pic = jumpPic;
    runnerY= 220;
    pic.frame(0);
    isJumping = true;
  } else {
    isJumping = false;
  }

  if (keyCode === 83) {
    //S
    pic = dodgePic;
    runnerX = 210;
    runnerY = 380;
    pic.frame(0);
    isDodging = true;
  } else {
    isDodging = false;
  }
}

class Runner{
  constructor() {
    pic = runnerPic;
  }
  display() {
    image(pic,runnerX,runnerY);
  }
}

class Guns{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display() {
    image(gunPic,this.x,this.y, 70, 50);
  }
  move() {
    this.x -= speed;
    if (this.x <0) {
      gunOffScreen = true;
    }
    else {
      gunOffScreen = false;
    }
  }
  // check if the kouki picked up the gun
  checkCollision() {
    if ((this.x - runnerX) < 300){
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
      this.type = type;
    }
  }

  isGreen() {
    return this.type == "green";
    return this.y == greenDroneY;
  }

  isRed() {
    return this.type == "red";
    return this.y == redDroneY;
  }

  randomColor() {
    var i = Math.round(random(0, 1));
    var rndType = ""
    if (i == 0) {
      rndType = "green";
      this.isGreen();
    } else if (i == 1) {
      rndType = "red";
      this.isRed();
    }
    // console.log("generating random color: " + rndType)
    return rndType
  }

  display() {
    if (this.isRed()) {
      dronePic = droneRedPic;
      this.y = redDroneY;

    }

    else if (this.isGreen()) {
      dronePic = droneGreenPic;
      this.y = greenDroneY;
    }

    image(dronePic, this.x, this.y, 100, 70);
  }

  move() {
    if (this.x > 600 && this.x < 610) {
      isJumping = false;
      isDodging = false;
    }

    //jitter
    // this.x += random(-3, 3);
    this.y += random (-3, 3);

    //move obstacle towards the runner
    this.x -= speed;

    //check if the obstacle has gone off-screen
    if (this.x < 0) {
      obstacleOffScreen = true;
    } else {
      obstacleOffScreen = false;
    }
  }

  checkCollision(){
    var isHit = false;

    // First check if drone is within the x coordinates of the runner
    var xDist = Math.abs(this.x - runnerX);
    if (xDist < 250 && xDist > 230 && !obstacleOffScreen) {
      // If it is, then we need to check which type of drone this is
      // so we can find out how to "avoid" it

      if (this.isRed() && !isDodging) {
        // Red drones need to be "dodged" via the 's' key
        isHit = true;
      } else if (this.isGreen() && !isJumping) {
        // Green drones need to be "dodged" via the 's' key
        isHit = true;
      }

      if (isHit) {
        hit.play();
        obstacleOffScreen = true;
        life -= 1;
      }
    }
  }
}

function displayLives() {
  var tempX = 150;
  var tempY = 45;
  for (var i=0; i<life; i++) {
    image(lifePic, tempX, tempY, 40, 40);
    tempX += 50;
  }
}
