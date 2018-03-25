
//this is the group javascript file
var obstaclesArray = [];
var gunArray = [];

var bkgroundPic, runnerPic, gunPic, floorPic, dodgePic, jumpPic, obstaclePic, obstacle1Pic, obstacle2Pic,obstacle3Pic,obstacle4Pic;

var runnerX, runnerY;
var gunX, gunY, numberofGuns;
var obstacleX, obstacleY, numberofObstacles;

var frames = 0;
var ground = 400; //Pixel height of the ground
var speed = 3; //Speed at which the ground, batteries, and obstacle will move

// var gunOffScreen = false;
var obstacleOffScreen = false;
// Drones
var blackDrone, greenDrone, redDrone;

// Scoring counters
// var showStartScreen = true
// var showGameOverText = false
var points = 0;
var life = 5;
var fontMedium;

//Preload assets
function preload(){
  bkgroundPic = loadGif("images/background3.gif");
  runnerPic = loadGif("images/running.gif");
  //jumpPic = loadGif("images/jump.gif");
  // dodgePic = loadGif("images/dodge.gif");
  batteryPic = loadImage("images/battery.png");
  gunPic = loadImage("images/gun.png");
  obstacle1Pic = loadImage("images/droneRed.png");
  obstacle2Pic = loadImage("images/droneGreen.png");
  obstacle3Pic = loadImage("images/droneBlack.png")
  //floorPic = loadImage("images/floor.gif");
  //load sound files here
  bkMusic = loadSound("sound/backgroundMusic.mp3");
  scored = loadSound("sound/score.mp3");
  //load font
  fontMedium = loadFont('fonts/Orbitron-Medium.ttf');
}

function setup(){

  // if width of screen.. canvas size
  createCanvas(1500, 900);
  // numberofBatteries = int(random(1,4));
  // numberofGuns = int(random(1,3));
  // numberofObstacles = int(random(1,2));

  bkMusic.play();

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

  // Drones
  blackDrone = new Obstacle(random(400,1000), ground + 100, "black");
  greenDrone = new Obstacle(random(400,1000), ground + 100 , "green");
  redDrone = new Obstacle(random(400,1000), ground + 100, "red");

  obstaclesArray.push(redDrone);
  obstaclesArray.push(greenDrone);
  obstaclesArray.push(blackDrone);
}


function draw() {
  background(0);

  image(bkgroundPic, 10, -100, 1300, 850);

  //image(floor, 0, 630);

  image(runnerPic, 200, ground, 315, 300);

  for (var i=0; i < obstaclesArray.length; i++){
    obstaclesArray[i].display();
    obstaclesArray[i].move();
    // obstaclesArray[i].checkCollision();

    //When the obstacle is off screen, add a new obstacle
    if (obstacleOffScreen == true) {
      obstaclesArray.splice(i,1);
      var tempDrone = new Obstacle(random(400,1000), ground + 100, "random");
      obstaclesArray.push(tempDrone);
    }
  }


  // //Check if player has used up lives
  // if (lifes <= 0){
  //   showGameOverText = true
  // }

  // textSize(50)
  // fill(255)
  // if (showGameOverText) {
  //   text("GAME OVER! You lost all 5 lives!", width/2, height/2);
  //   fill("yellow");
  //   textSize(20);
  //   text("Total Points: " + points, width/2, 470);
  // }

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

  //Display and update each cyborg object

  // for (var i = 0; i < obstaclesArray.length; i++) {
  //   obstaclesArray[i].display();
  //   // obstaclesArray[i].move();
  //   // obstaclesArray[i].checkCollision();


  //   //When the cyborg is off screen, add a new cyborg
  //   if (obstacleOffScreen == true) {
  //     obstacleArray.splice(i,1);
  //     var tempObstacle = new Obstacle(random(200,width-50),ground);
  //     obstacleArray.push(tempObstacle);
  //   }
  // }


  // Display hits and misses
  noStroke();
  fill(255);
  textFont(fontMedium);
  textSize(25);
  text("Assets: " + points, 50, 50);
  text("Lives: " + life, 50, 80);

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
*/
}

class Obstacle {
  constructor (x, y, type) {
    this.x = x;
    this.y = ground +100;

    if (type == "random") {
      this.type = this.randomColor()
    } else {
      this.type = type
    }
  }

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
    var i = Math.round(random(0, 2))
    console.log("random number: " + i)
    var rndType = ""
    if (i == 0) {
      rndType = "green"
    } else if (i == 1) {
      rndType = "red"
    } else {
      rndType = "black"
    }
    console.log("generating random color: " + rndType)
    return rndType
  }

  display() {
    var pic = "";

    if (this.isRed()) {
      pic = obstacle1Pic
    } else if (this.isGreen()) {
      pic = obstacle2Pic
    } else if (this.isBlack()) {
      pic = obstacle3Pic
    }
    image(pic, this.x, this.y, 150, 100);
  }

  move() {
    //jitter
    this.x += random(-1,1);
    this.y += random (-1,1);

    //move obstacle towards the runner
    this.x -= speed;

    //check if the obstacle has gone off-screen
    if (this.x <0) {
      obstacleOffScreen = true;
    }
    else {
      obstacleOffScreen = false;
    }
    return obstacleOffScreen;

  }

  // //check if the kouki collided with the cyborg
  // checkCollision(x, y) {
  //   var distObstacle = dist(this.x, this.y, runnerX, runnerY);
  //   if (distObstacle<= 45) {
  //     life -= 1;
  //     //Play sound effect for getting hit
  //     //Remove cyborg from array and add a new cyborg object
  //     obstacleOffScreen = true;
  //   }
  //   return obstacleOffScreen;
  // }
}
