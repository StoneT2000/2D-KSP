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
function planet(posx, posy, mass, radius, looks, stats) {
  //looks array contains color, shape, etc.
  //stats arrray can contain eccentricity, semi-major-axis, semi-lactus-rectum, aphelion, perihelion
  
  this.display = function() {
    fill(looks['color']);
    ellipse(this.pos.x, this.pos.y, radius, radius);
    
  }
  //e = 0 implies circular orbit
  
  
  this.pos = createVector(posx,posy);
  this.init_angle = lineAngle(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y);
  this.dist_sun = sqrt(sqdist(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y));
  
  //this.semi_major_axis = this.semi_lactus_rectum/ (1-this.eccentricity*this.eccentricity);
  this.semi_major_axis = this.dist_sun + 0.01;
  //the semi_major_axis, along with the current distance to sun < semi_major_axis, and initial angle, determine the ellipse.
  this.relx = posx-stars[0].pos.x
  this.rely = posy-stars[0].pos.y
  
  this.semi_minor_axis = sqrt((this.semi_major_axis*this.semi_major_axis*this.rely*this.rely)/(this.semi_major_axis*this.semi_major_axis-this.relx*this.relx))
  this.eccentricity = sqrt(1 - (this.semi_minor_axis*this.semi_minor_axis)/(this.semi_major_axis*this.semi_major_axis));
  
  if (stats){
    if (stats['semi_major_axis'] !== undefined){
      this.semi_major_axis = stats['semi_major_axis'];
    }
  }
  //Note, 2/this.dist_sun > 1/this.semi_major_axis
  
  //Deriving minor with major and eccentricity
  //this.semi_minor_axis = sqrt(this.semi_major_axis * this.semi_major_axis * (1 - this.eccentricity * this.eccentricity));
  this.linear_eccentricity = this.semi_major_axis * this.eccentricity//sqrt(this.semi_major_axis * this.semi_major_axis + this.semi_minor_axis * this.semi_minor_axis);
  this.semi_lactus_rectum = this.semi_minor_axis * this.semi_minor_axis / this.semi_major_axis
  
  this.centerx = stars[0].pos.x +this.linear_eccentricity;
  this.centery = stars[0].pos.y ;
  
  this.stableorbit = true;
  
  //For stable orbits, establish initial speeds. These speeds are calculated using the current distance to sun, and the semi-major-axis.
  var init_v = sqrt(G*stars[0].mass*((2/this.dist_sun)-1/this.semi_major_axis));
  console.log(init_v)
  this.vx = init_v * sin(this.init_angle);
  this.vy = -init_v * cos(this.init_angle);
  
  
  //This method for changing velocity and updating position is very prone to error over time. But it makes it easy to perform orbital maneuvers and change velocities. Maybe add a error correction function
  this.update = function() {
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
  
  this.period = (sqrt(((4*3.141*3.141)/(stars[0].mass * G)) * pow(this.semi_major_axis,3)))/frame_rate;
  this.outline_path = function () {
    noFill();
    stroke(255);
    ellipse(this.centerx,this.centery, this.semi_major_axis*2, this.semi_minor_axis*2);
  }
  this.calculate_orbital_parameters = function () {
    var c_v_mag2 = this.vx*this.vx + this.vy*this.vy
    //c:calculated
    var c_dist_sun = sqrt(sqdist(stars[0].pos.x, stars[0].pos.y, this.pos.x,this.pos.y));

    var c_semi_major_axis = 1/ ((2/c_dist_sun)-(c_v_mag2/(G*stars[0].mass)))
    var c_eccentricity = 0;
    var c_semi_lactus_rectum;
    console.log(c_v_mag2,c_dist_sun,c_semi_major_axis);
    //var ap =
    //var pe = 
  }
  this.change_orbital_parameters = function(parameter, value) {
    if (parameter == "eccentricity" && value < 1 && value >= 0) {
      this.eccentricity = value;
    }
  }
}
