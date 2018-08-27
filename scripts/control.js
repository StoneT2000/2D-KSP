function key_functions() {
  var scale_factor = 1;
  if (keyIsDown(16)) {
    scale_factor = 2;
  }
  if (keyIsDown(87)) {
    origin[1] += 2 * scale_factor;
    center_object = false;
    camera_pos[1] -= 2 * scale_factor;
  }
  if (keyIsDown(83)) {
    origin[1] -= 2 * scale_factor;
    center_object = false;
    camera_pos[1] += 2 * scale_factor;
  }
  if (keyIsDown(68)) {
    origin[0] -= 2 * scale_factor;
    center_object = false;
    camera_pos[0] += 2 * scale_factor;
  }
  if (keyIsDown(65)) {
    origin[0] += 2 * scale_factor;
    camera_pos[0] -= 2 * scale_factor;
  }
  if (keyIsDown(61)) {
    zoom += 0.02 * scale_factor;
    origin[0] = (windowWidth / 2) / zoom - camera_pos[0];
    origin[1] = (windowHeight / 2) / zoom - camera_pos[1];
    orbit_path_weight = 1 / zoom

  } else {

  }
  if (keyIsDown(173)) {
    zoom -= 0.02 * scale_factor;
    origin[0] = (windowWidth / 2) / zoom - camera_pos[0];
    origin[1] = (windowHeight / 2) / zoom - camera_pos[1];
    orbit_path_weight = 1 / zoom
  }

}
var offsetx = 0;
var offsety = 0;
var anchor = [0, 0];

function follow_object(space_object) {
  center_object=true;
  //offsetx = -100*zoom;
  //offsety = -100*zoom;
  origin[0] = (windowWidth / 2) / zoom - space_object.pos.x + offsetx;
  origin[1] = (windowHeight / 2) / zoom - space_object.pos.y + offsety;
  camera_pos[0] = space_object.pos.x;
  camera_pos[1] = space_object.pos.y;
}
$(document).on("ready", function () {

});