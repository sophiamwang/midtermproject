//this is the group javascript file
var batteryArray= [];
var cyborgArray= []; 
var gunArray = [];
var batteryPic,cyborgGif, gunPic, background;
var batteryX,batteryY,numberofBatteries;
var ground; //this is the pixel height of the ground 
var speed; //this will be the speed at which the ground, batteries, and cyborg will move

function preload(){
	batteryPic = loadImage("battery.png");
}

function setup(){
	// if width of screen.. canvas size..
	createCanvas (500,500);
	numberofBatteries = int(random(1,5));
	ground = 400; 
	speed = 3;

	for (var i = 0; i<numberofBatteries; i++) {
		var temp = new batteries(random(20,width-20),ground);
		batteryArray.push(temp)
	}
}

function draw() {
	background(0);

	for (var i; i<numberofBatteries;i++) {
		batteryArray[i].move();
		batteryArray[i].display();
	}
	//check if it is off screen and remove if it is
	for (var i; i<numberofBatteries;i++){
		if (batteryArray[i][0] < 0 ){
			batteryArray.splice(i,1);
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
}


class guns{

}

class cyborgs{

}

