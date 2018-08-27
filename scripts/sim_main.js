var stars = [];
var planets = [];
var ships = [];
var kspcanvas;
function setup() {
  kspcanvas = createCanvas(windowWidth,windowHeight);
  background(255,255,255);
  kspcanvas.parent('gamedisplay')
    angleMode(DEGREES);
  stars.push(new star(250,250, 100000, 20, {"color": "#FF5D73"}));
  planets.push(new planet(320, 270, 10, 10, {"color": "#CD9DC5"}))
  //planets.push(new planet(350, 250, 10, 10, {"color": "#fD0DC5"}))
  background("#494949");
}

function draw() {
  
  
  stroke(255);
  noFill();
  //ellipse(250,250,200);
  noStroke();
  for (var i = 0; i < stars.length; i++) {
    stars[i].display();
  }
  
  for (var i = 0; i < planets.length; i++){
    if (i>=0){
      planets[i].update();
    }
    //planets[i].update_r();
    planets[i].display();
    //planets[i].outline_path();
  }

}

function lineAngle(x1, y1, x2, y2) {
  var angleconstant = 0;
  if (x2 - x1 >= 0) {
    angleconstant = 0;
    if (y2 - y1 >= 0) {
      angleconstant = 360;
    }
  } else {
    var angleconstant = 180;
  }
  return -atan((y2 - y1) / (x2 - x1)) + angleconstant;
}
function sqdist(x1,y1,x2,y2){
  return (pow((x2-x1), 2) + pow((y2-y1), 2))
}