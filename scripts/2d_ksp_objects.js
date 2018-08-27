const G = 0.01;
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
    ellipse(this.pos.x, this.pos.y, radius, radius);
  }
  this.pos = createVector(posx,posy);
  this.init_angle = lineAngle(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y);
  this.dist_sun = sqrt(sqdist(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y));
  this.semi_major_axis = 140;
  this.init_v = sqrt(G * stars[0].mass * ((2/this.dist_sun) - (1/this.semi_major_axis)))
  this.vx = this.init_v * sin(this.init_angle);
  this.vy = -this.init_v * cos(this.init_angle);
  this.update = function() {
    //This is applying velocity, no corrections
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
  this.centerx ;
  this.centery;
  this.outline_path = function () {
    
  }

  
}