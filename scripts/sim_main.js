var stars = [];
var planets = [];
var ships = [];
var kspcanvas;
var center_object = false;
var center_object_ref;
var focus_mode = false;
//This is only really configured for a singular star system. Probably good enough, KSP doesn't have two stars anyway

//Position of camera in true frame
var camera_pos = [0,0]
function setup() {
  kspcanvas = createCanvas(windowWidth,windowHeight);
  background(255,255,255);
  kspcanvas.parent('gamedisplay')
  angleMode(DEGREES);
  stars.push(new star(250*pf,250*pf, 2*pow(10,30), 90, {"color": "#FF5D73"}));
  //EARTH
  planets.push(new planet((250+1.496*1000)*pf, 250*pf, pow(10,1), 10, {"color": "#6D9DC5"}, {}))
  planets.push(new planet(800*pf, 200*pf, pow(10,27), 40, {"color": "#CD9DC5"}, {}))
  planets.push(new planet(90*pf, 90*pf, pow(10,1), 20, {"color": "#fD0DC5"}, {"semi_major_axis": 220*pf}))
  planets.push(new planet(150*pf, 230*pf, pow(10,1), 10, {"color": "#6D9DC5"}, {"semi_major_axis": 90.9*pf}))
  planets.push(new planet(350*pf, 200*pf, pow(10,1), 10, {"color": "#D6DBB2"}, {"semi_major_axis": 300*pf}))
  
  
  
  
  ships.push(new ship(800*pf,208*pf, 10, 2, {"color":"#AEECEF"}, {"semi_major_axis": 500*pf}))
  ships[0].vx -= 6500
  
  rectMode(CENTER);
  //We make a ship with the almost the same orbital parameters as one planet
  //The following makes it go in orbit of that planet
  background("#494949");
  //ships[0].vx -= -55/10
  //Camera starts at middle
  camera_pos[0]=windowWidth*pf/2;
  camera_pos[1] = windowHeight*pf/2;
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
  return (pow((x2-x1), 2) + pow((y2-y1), 2)) * pf * pf
}
function sqdist_real(x1,y1,x2,y2) {
  return (pow((x2-x1), 2) + pow((y2-y1), 2))
}