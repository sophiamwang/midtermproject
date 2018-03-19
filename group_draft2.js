//this is the group javascript file
var batteryArray= [];
var cyborgArray= [];
var gunArray = [];

var batteryPic, cyborgGif, gunPic, bkgroundPic;

var runnerX, runnerY;
var batteryX,batteryY,numberofBatteries;
var gunX, gunY, numberofGuns;
var cyborgX,cyborgY, numberofCyborgs;

var ground = 400; //Pixel height of the ground
var speed = 3; //Speed at which the ground, batteries, and cyborg will move
var batteryOffScreen = false;
var gunOffScreen = false;
var cyborgOffScreen = false;


// Player counters
var points = 0
var life = 5;

//Preload assets
function preload(){
	bkgroundPic = loadGif("images/background.gif");
	batteryPic = loadImage("images/battery.png");
	cyborgGif = loadGif("images/cyborg.gif");
	gunPic = loadImage("images/gun.png");
	//load sound files here
	scored = loadSound("sound/score.mp3")
}

function setup(){
	// if width of screen.. canvas size
	createCanvas(700, 400);
	numberofBatteries = int(random(1,4));
	numberofGuns = int(random(1,3));
	numberofCyborgs = int(random(1,2));

	//Instantiate battery ovjects
	for (var i = 0; i<numberofBatteries; i++) {
		//changed x position to random(100,width-20) because we should leave space for runner
		var tempBat = new Batteries(random(100,width-20),ground);
		batteryArray.push(tempBat);
	}
	//Instantiate gun objects
	for (var i = 0; i<numberofGuns; i++) {
		//changed x position to random(100,width-20) because we should leave space for runner
		var tempGun = new Guns(random(100,width-20),ground);
		gunArray.push(tempGun);
	}
	//Instantiate cyborg objects
	for (var i = 0; i <numberofCyborgs;i++) {
		//changed x position to random(150,width-20) because we should leave space for runner
		//and make sure that runner has time to jump over cyborg
		var tempCyborg = new Cyborgs(random(150,width-20,ground));
		cyborgArray.push(tempCyborg);
	}
}


function draw() {
	background(0);
	image(bkgroundPic, 0, 0);

	fill(0);
	rectMode(CORNER);
	rect(0,0,width,height); //what is this for? it's going to cover the whole canvas?

	//Display and update each battery object
	for (var i=0; i<batteryArray.length;i++) {
		batteryArray[i].display();
		batteryArray[i].move();
		batteryArray[i].checkCollision(x,y); //if kouki picks up battery

		//When the battery is off screen, add a new battery
		if (batteryOffScreen == true) {
			batteryArray.splice(i,1);
			var tempBat = new batteries (random(100,width-20), ground); //changed min x to 100
			batteryArray.push(tempBat);
		}
	}

	//Display and update each gun object
	for (var i=0; i<gunArray.length;i++) {
		gunArray[i].display();
		gunArray[i].move();
		gunArray[i].checkCollision(x,y); //check if kouki picks up gun

		//When the gun is off screen, add a new gun
		if (gunOffScreen == true) {
			gunArray.splice(i,1);
			var tempGun = new Gun (random(50,width-20), ground);
			gunArray.push(tempGun);
		}
	}
	//Display and update each cyborg object
	for (var i =0; i<cyborgArray.length;i++) {
		cyborgArray[i].display();
		cyborgArray[i].move();
		cyborgArray[i].checkCollision();

		//When the cyborg is off screen, add a new cyborg
		if (cyborgOffScreen == true) {
			cyborgArray.splice(i,1);
			var tempCyborg = new cyborgs(random(20,width-20),ground);
			cyborgArray.push(tempCyborg);
		}
	}

  // Display hits and misses
  noStroke();
  textSize(20);
  text("Assets: " + points, 650, 20);
  text("Lives: " + life, 650, 35);

}

/*
add class Runner here

	//if lifes == 0, game over
*/

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

class Cyborgs{
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

