//this is the group javascript file
var batteryArray= [];
var cyborgArray= []; 
var gunArray = [];
var batteryPic,cyborgGif, gunPic, background;
var batteryX,batteryY,numberofBatteries;
var cyborgX,cyborgY, numberofCyborgs;
var ground = 400; //this is the pixel height of the ground 
var speed = 3; //this will be the speed at which the ground, batteries, and cyborg will move
var batteryOffScreen = false;
var cyborgOffScreen = false;
var life = 5;

function preload(){
	batteryPic = loadImage("battery.png");
	cyborgGif = loadGif("images/cyborg.gif");
}

function setup(){
	// if width of screen.. canvas size..
	createCanvas (500,500);
	numberofBatteries = int(random(1,5));
	numberofCyborgs = int(random(1,2));

	for (var i = 0; i<numberofBatteries; i++) {
		var temp = new batteries(random(20,width-20),ground);
		batteryArray.push(temp);
	}
/*
	for (var i = 0; i <numberofCyborgs;i++) {
		var temp = new cyborgs(random(20,width-20,ground));
		cyborgArray.push(temp);
	}
*/
}

function draw() {
	image(cyborgGif, 0, 0);
	fill(0);
	rectMode(CORNER);
	rect(0,0,width,height);

	for (var i=0; i<batteryArray.length;i++) {
		batteryArray[i].display();
		batteryArray[i].move();

	}

	for (var i=0; i<batteryArray.length;i++) {
		//when the battery is off screen, add a new battery
		if (batteryOffScreen == true) {
			batteryArray.splice(i,1);
			var temp = new batteries (random(20,width-20), ground);
			batteryArray.push(temp);

		}
		// else if the kouki picks up the battery remove it from array and add a new 
	}

	/* for (var i =0; i<cyborgArray.length;i++) {
		cyborgArray[i].display();
		cyborgArray[i].move();
	}

	for (var i=0; i<cyborgArray.length;i++) {
		if (cyborgOffScreen == true) {
			cyborgArray.splice(i,1);
			var temp = new cyborgs(random(20,width-20),ground);
			cyborgArray.push(temp);
		}
	}
	*/
}

class batteries {
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
	}	
	
}


class cyborgs{
	constructor (x,y) {
		this.x = x;
		this.y = y;
	}
	display() {
		imageMode(CENTER);
		image(cyborgGif,this.x,this.y,30,60);
	}
	move () {
		this.x -=speed;
		if (this.x <0) {
			cyborgOffScreen = true;
		}
		else {
			cyborgOffScreen = false;
		}
	}
}

class guns{

}

