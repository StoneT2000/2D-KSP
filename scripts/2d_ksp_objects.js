const G = 0.001;
const TC = 1;
var frame_rate = 60;
//Everything is minified by 1000

//Display sizes are not proportional to mass or volume in any case
function star(posx, posy, mass, radius, looks) {
  this.vx = 0;
  this.vy = 0;
  this.mass = mass;
  this.pos = createVector(posx,posy);
  this.display = function() {
    fill(looks['color']);
    ellipse(posx, posy, radius, radius);
    
  }
}

function planet(posx,posy, mass, radius, looks, params) {
  this.display = function() {
    fill(looks['color']);
    noStroke();
    ellipse(this.pos.x, this.pos.y, radius, radius);
  }

  this.pos = createVector(posx,posy);
  this.init_angle = lineAngle(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y);
  this.dist_sun = sqrt(sqdist(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y));
  this.semi_major_axis = 50*sqrt(2);
  this.relx = posx-stars[0].pos.x
  this.rely = posy-stars[0].pos.y
  
  if (params){
    if (params['semi_major_axis']){
      this.semi_major_axis = params['semi_major_axis']
    }
  }
  
  
  this.semi_minor_axis = sqrt((this.rely*this.rely)/(1-(this.semi_major_axis*this.semi_major_axis/this.relx*this.relx)))
  
  this.init_v = sqrt(G * stars[0].mass * ((2/this.dist_sun) - (1/this.semi_major_axis)))
  this.vx = this.init_v * sin(this.init_angle);
  this.vy = this.init_v * cos(this.init_angle);
  var factor = this.dist_sun/this.semi_major_axis
  var diffsm = this.dist_sun - this.semi_major_axis;
  //this.focus2 = [stars[0].pos.x+this.relx/factor,stars[0].pos.y+this.rely/factor];

  
  //this.centerx = stars[0].pos.x+this.linear_eccentricity;
  this.centerx = stars[0].pos.x + diffsm*cos(this.init_angle)
  this.centery = stars[0].pos.y - diffsm*sin(this.init_angle)
  
  this.linear_eccentricity = sqrt(sqdist(this.centerx,this.centery,stars[0].pos.x,stars[0].pos.y));
  this.eccentrictiy = this.linear_eccentricity/this.semi_major_axis;
  this.semi_minor_axis = sqrt(pow(this.semi_major_axis,2)*(1-pow(this.eccentrictiy,2)))
    this.update = function() {
    //This is applying velocity, no corrections
    //console.log(this.vy, this.vy)
    this.pos = this.pos.add(this.vx,this.vy)
    
    var sq_dist_star = (sqdist(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y))
    //console.log(sq_dist_star)
    //Apply centripetal acceleration
    var acc_dir = lineAngle(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y)
    var acc = G*stars[0].mass / (sq_dist_star)
    var acc_x = -acc*cos(acc_dir);
    var acc_y = acc*sin(acc_dir);
    this.vx += acc_x;
    this.vy += acc_y;
    
  }

  this.correct_parameters = function () {
    
  }
  this.outline_path = function () {
    noFill();
    stroke(255);
    //ellipse(this.focus2[0],this.focus2[1],20,20)
    translate(this.centerx,this.centery)
    rotate(-this.init_angle)
    ellipse(0,0,this.semi_major_axis*2,this.semi_minor_axis*2)
    rotate(this.init_angle)
    translate(-this.centerx,-this.centery)
    
    //rotate(angle)
    //ellipse(250,290, this.semi_major_axis*2, 90)
  }

  
}
var angle = 10;