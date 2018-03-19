var back, guy;




function preload() {

    back = loadAnimation("images/background/1.png", "images/background/2.png", "images/background/3.png","images/background/4.png","images/background/5.png","images/background/6.png","images/background/7.png","images/background/8.png","images/background/9.png","images/background/10.png","images/background/11.png","images/background/12.png","images/background/13.png","images/background/14.png","images/background/15.png","images/background/16.png","images/background/17.png","images/background/18.png","images/background/19.png","images/background/20.png","images/background/21.png","images/background/22.png","images/background/23.png","images/background/24.png","images/background/25.png","images/background/26.png","images/background/27.png","images/background/28.png","images/background/29.png","images/background/30.png","images/background/31.png","images/background/32.png","images/background/33.png","images/background/34.png","images/background/35.png","images/background/36.png","images/background/37.png","images/background/38.png","images/background/39.png","images/background/40.png","images/background/41.png","images/background/42.png","images/background/43.png","images/background/44.png","images/background/45.png","images/background/46.png","images/background/47.png","images/background/48.png");

    guy =loadAnimation("images/guy/1.png","images/guy/2.png","images/guy/3.png","images/guy/4.png","images/guy/5.png","images/guy/6.png","images/guy/7.png","images/guy/8.png","images/guy/9.png","images/guy/10.png","images/guy/11.png","images/guy/12.png","images/guy/13.png","images/guy/14.png","images/guy/15.png","images/guy/16.png","images/guy/17.png","images/guy/18.png","images/guy/19.png");
}

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(0);

    animation(back, 400, 200);
    animation(guy, 400, 200);

}
