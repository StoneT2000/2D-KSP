var stars = [];
var planets = [];
var ships = [];
var kspcanvas;
var center_object = false;
var center_object_ref;
//This is only really configured for a singular star system. Probably good enough, KSP doesn't have two stars anyway

//Position of camera in true frame
var camera_pos = [0,0]
function setup() {
  kspcanvas = createCanvas(windowWidth,windowHeight);
  background(255,255,255);
  kspcanvas.parent('gamedisplay')
  angleMode(DEGREES);
  stars.push(new star(250,250, 100000, 90, {"color": "#FF5D73"}));
  planets.push(new planet(800, 200, 100000, 30, {"color": "#CD9DC5"}, {"semi_major_axis": 500}))
  planets.push(new planet(90, 90, 6660, 20, {"color": "#fD0DC5"}, {"semi_major_axis": 220}))
  planets.push(new planet(150, 230, 3330, 10, {"color": "#6D9DC5"}, {"semi_major_axis": 100}))
  planets.push(new planet(350, 200, 3330, 10, {"color": "#D6DBB2"}, {"semi_major_axis": 300}))
  ships.push(new ship(800,230, 10, 10, {"color":"#AEECEF"}, {"semi_major_axis": 500}))
  rectMode(CENTER);
  //We make a ship with the almost the same orbital parameters as one planet
  //The following makes it go in orbit of that planet
  ships[0].vx -= 0.174
  background("#494949");
  
  //Camera starts at middle
  camera_pos[0]=windowWidth/2;
  camera_pos[1] = windowHeight/2;
}

//Used to translate the objects in the true frame to a relative frame
var origin = [0,0]

//Zoom level
var zoom = 1;
var physics_delta = 1;
function draw() {
  
  if (center_object){
    follow_object(center_object_ref)
  }
  
  
  translate(origin[0],origin[1])
  
  background("#494949");
  
  noFill();
  noStroke();
  for (var k = 0; k < physics_delta; k++){
    for (var i = 0; i < planets.length; i++){
      //Update positions and etc.
      planets[i].update();
      

    }
    for (var i = 0; i < ships.length; i++) {
      ships[i].update();
    }
  }
  for (var i = 0; i < planets.length; i++){
    //Outline orbital path based on initial conditions and no decay
    planets[i].outline_path();
    
  }
  for (var i = 0; i < stars.length; i++) {
    noStroke();
    stars[i].display();
  }
  for (var i = 0; i < planets.length; i++){
    planets[i].display();
  }
  for (var i = 0; i < ships.length; i++){
    ships[i].display();
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