//this is the group javascript file
var batteryArray, cyborgArray, gunArray;
var batteryPic,cyborgGif, gunPic, background;
var batteryX,batteryY,numberofBatteries;
var speed; //this will be the speed at which the ground, batteries, and cyborg will move

function preload(){
	batteryPic = loadImage("battery.png");
}

function setup(){
	// if width of screen.. canvas size..
	createCanvas (500,500);
	numberofBatteries = int(random (0,5));
}

function draw() {
	background(0);

	for (var i; i<numberofBatteries;i++) {
		// rule for generating position
		batteryX = random (20,480);
		batteryY = 400; //position above ground
		// randomized time for generating position e.g. frames ellaped 50
		new batteries(batteryX,batteryY);
		batteryArray.push([batteryX,batteryY]);
		if (i== numberofBatteries-1) {
			batteryArray.split(0,-1);
			numberofBatteries = int(random (0,5));
		}
	}

}

class batteries {
	constructor(x,y){
		batteryX = this.x;
		batteryY = this.y;
	}

	display(){
		image(batteryPic,batteryX,batteryY,20,40);
	}
	move () {
		batteryX -=speed;
	}
	update() {
		//delete batteries that have been picked up
		//collision
		if (batteryX <0) {
			//delete batteries that have disappeared
			 batteryX = width;
		}

	}
}

class guns{

}

class cyborgs{

}

