var stars = [];
var planets = [];
var ships = [];
var kspcanvas;
var center_object = true;


//Position of camera in true frame
var camera_pos = [0,0]
function setup() {
  kspcanvas = createCanvas(windowWidth,windowHeight);
  background(255,255,255);
  kspcanvas.parent('gamedisplay')
  angleMode(DEGREES);
  stars.push(new star(250,250, 100000, 20, {"color": "#FF5D73"}));
  planets.push(new planet(400, 200, 10, 10, {"color": "#CD9DC5"}, {"semi_major_axis": 200}))
  //planets.push(new planet(350, 250, 10, 10, {"color": "#fD0DC5"}))
  background("#494949");
  
  //Camera starts at middle
  camera_pos[0]=windowWidth/2;
  camera_pos[1] = windowHeight/2;
}

//Used to translate the objects in the true frame to a relative frame
var origin = [0,0]

//Zoom level
var zoom = 1;

function draw() {
  
  if (center_object){
    follow_object(planets[0])
  }
  
  
  translate(origin[0],origin[1])
  
  background("#494949");
  
  noFill();
  noStroke();
  for (var i = 0; i < stars.length; i++) {
    stars[i].display();
  }
  
  for (var i = 0; i < planets.length; i++){
    if (i>=0){
      planets[i].update();
    }
    //planets[i].update_r();
    //Outline orbital path based on initial conditions and no decay
    planets[i].outline_path();
    //Display planet
    planets[i].display();
    
  }
  //Run through and check what keys are pressed and perform relevant functions
  key_functions();
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