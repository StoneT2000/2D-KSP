$(document).on("ready", function () {

});

function key_functions (){
  var scale_factor = 1;
  if (keyIsDown(16)) {
    scale_factor = 2;
  }
  if (keyIsDown(87)){
    origin[1]+=2*scale_factor;
  }
  if (keyIsDown(83)){
    origin[1]-=2*scale_factor;
  }
  if (keyIsDown(68)){
    origin[0]-=2*scale_factor;
  }
  if (keyIsDown(65)){
    origin[0]+=2*scale_factor;
  }
  if (keyIsDown(61)){
    zoom+=0.01*scale_factor;
  }
  if (keyIsDown(173)){
    zoom-=0.01*scale_factor;
  }
}