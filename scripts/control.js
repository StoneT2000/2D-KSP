function key_functions() {
  var scale_factor = 1;
  if (keyIsDown(16)) {
    scale_factor = 3;
  }
  //S
  if (keyIsDown(87)) {
    origin[1] += 2 * scale_factor;
    center_object = false;
    camera_pos[1] -= 2 * scale_factor * pf;
  }
  //W
  if (keyIsDown(83)) {
    origin[1] -= 2 * scale_factor;
    center_object = false;
    camera_pos[1] += 2 * scale_factor * pf;
  }
  //D
  if (keyIsDown(68)) {
    origin[0] -= 2 * scale_factor;
    center_object = false;
    camera_pos[0] += 2 * scale_factor * pf;
  }
  //A
  if (keyIsDown(65)) {
    origin[0] += 2 * scale_factor;
    center_object = false;
    camera_pos[0] -= 2 * scale_factor * pf;
  }
  //= sign
  if (keyIsDown(61)) {
    zoom += 0.01 * scale_factor;
    origin[0] = (windowWidth / 2) / zoom - camera_pos[0]/pf;
    origin[1] = (windowHeight / 2) / zoom - camera_pos[1]/pf;
    
    //Make orbital path outline of a equal size regardless of zoom
    orbit_path_weight = 1 / zoom

  } else {

  }
  //- sign
  if (keyIsDown(173)) {
    if (zoom > 0.5){
      zoom -= 0.01 * scale_factor;
      origin[0] = (windowWidth / 2) / zoom - camera_pos[0]/pf;
      origin[1] = (windowHeight / 2) / zoom - camera_pos[1]/pf;
      orbit_path_weight = 1 / zoom
    }
    
  }

  
  //SHIP CONTROLS with ARROW KEYS
  //UP
  
  if (keyIsDown(38)){
    ships[0].vy -= 0.01*speedF
  }
  //RIGHT
  if (keyIsDown(39)){
    ships[0].vx +=0.01*speedF
  }
  //DOWN
  if (keyIsDown(40)){
    ships[0].vy += 0.01*speedF;
  }
  //LEFT
  if (keyIsDown(37)){
    ships[0].vx -= 0.01*speedF;
  }

}
var speedF = 10;
function keyTyped() {
  if (key === '.') {
    if (physics_delta < 4) {
      physics_delta++;
    } else if (physics_delta < 20) {
      physics_delta += 2;
    } else {
      physics_delta += 10;
    }
    document.getElementById('speed_display').innerText = physics_delta + "x"
  }
  if (key === ',') {
    if (physics_delta > 0){
      if (physics_delta < 4) {
        physics_delta--;
      } else if (physics_delta < 20) {
        physics_delta -= 2;
      } else {
        physics_delta -= 10;
      }
    }
    document.getElementById('speed_display').innerText = physics_delta + "x"
  }
}

var offsetx = 0;
var offsety = 0;
var anchor = [0, 0];

function follow_object(space_object) {
  center_object_ref = space_object;
  center_object=true;
  //offsetx = -100*zoom;
  //offsety = -100*zoom;
  origin[0] = (windowWidth / 2) / zoom - space_object.pos.x/pf + offsetx;
  origin[1] = (windowHeight / 2) / zoom - space_object.pos.y/pf + offsety;
  camera_pos[0] = space_object.pos.x;
  camera_pos[1] = space_object.pos.y;
}

//Returns the true mouseX based on the coordinate system in place
function real_mouseX() {
  return camera_pos[0] + (mouseX - windowWidth/2)*pf/zoom;
}
function real_mouseY() {
  return (camera_pos[1] + (mouseY - windowHeight/2)*pf/zoom);
}
function mouseClicked() {
  for (var i = 0; i < stars.length; i++){
    if (sqdist_real(real_mouseX(),real_mouseY(),stars[i].pos.x,stars[i].pos.y) <= pow(stars[i].radius*pf, 2)) {
      follow_object(stars[i]);
      return;
    }
  }
  for (var i = 0; i < planets.length; i++){
    if (sqdist_real(real_mouseX(),real_mouseY(),planets[i].pos.x,planets[i].pos.y) <= pow(planets[i].radius*pf, 2)) {
      follow_object(planets[i]);
      return;
    }
  }
  for (var i = 0; i < ships.length; i++){
    if (sqdist_real(real_mouseX(),real_mouseY(),ships[i].pos.x,ships[i].pos.y) <= pow(ships[i].radius*pf, 2)) {
      follow_object(ships[i]);
      return;
    }
  }
}


$(document).on("ready", function () {

});