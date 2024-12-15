
// original image, to use as reference for pixel colors
let oImg;

// display image, to modify and display on canvas
let mImg;
let picker1;
let picker2;
let picker3;
let slider;
let SIMILARITY_VALUE = 60;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, 200);
  mImg.resize(0, 200);

  slider = createSlider(0, 100);
  slider.position(10, 10);
  slider.size(80);
  // we'll read pixel color info from the oImg, so let's load its pixels
  oImg.loadPixels();

  // TODO: setup sliders and other DOM/html elements here
  picker1 = createColorPicker('red');
  picker1.position(0, 100); 
  picker2 = createColorPicker('deeppink');
  picker2.position(0, 200);
  picker3 = createColorPicker('yellow');

  picker3.position(0, 300);
}

function draw() {
  // we'll modify and display the mImg object, so let's load its pixels
  mImg.loadPixels();

  SIMILARITY_VALUE=slider.value()
  for (let idx = 0; idx < oImg.pixels.length; idx += 4) {

// let c1=color(oImg.pixels[idx + 0],oImg.pixels[idx + 1],oImg.pixels[idx + 2])
if(isSimilar(oImg.pixels[idx + 0],oImg.pixels[idx + 1],oImg.pixels[idx + 2],picker1.value())){
  mImg.pixels[idx + 0] = 58;
  mImg.pixels[idx + 1] = 119;
  mImg.pixels[idx + 2] = 43;
}
if(isSimilar(oImg.pixels[idx + 0],oImg.pixels[idx + 1],oImg.pixels[idx + 2],picker2.value())){
  mImg.pixels[idx + 0] = 255;
  mImg.pixels[idx + 1] = 50;
  mImg.pixels[idx + 2] = 143;
}
if(isSimilar(oImg.pixels[idx + 0],oImg.pixels[idx + 1],oImg.pixels[idx + 2],picker3.value())){
  mImg.pixels[idx + 0] = 158;
  mImg.pixels[idx + 1] = 219;
  mImg.pixels[idx + 2] = 243;
}
  }
  // TODO: do any filtering and pixel modifications here.
  //       This involves a for loop of some kind.
  //       Remember to read from the oImg pixels and write to the mImg.

  // we'll display the updated mImg, so let's update its pixels
  mImg.updatePixels();

  // draw the display image
  let h = height;
  let w = h * mImg.height/mImg.width;
  image(mImg, 0, 0, w, h);
}
function isSimilar(r1, g1, b1, colorB){

  let r2 = red(colorB);
  let g2 = green(colorB);
  let b2 = blue(colorB);
  if(abs(r1 - r2) + abs(g1 - g2) + abs(b1 - b2) < SIMILARITY_VALUE){
return true
}
return false
}