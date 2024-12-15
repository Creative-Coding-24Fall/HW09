
let bodySegmentation;
let video;
let segmentation;
let options1 = {
  maskType: "background",
};
let faceMesh;
let faces = [];
let options2 = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let buddhaLight=0;
function preload() {
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", options1);
  faceMesh = ml5.faceMesh(options2);
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySegmentation.detectStart(video, gotResults);
  faceMesh.detectStart(video, gotFaces);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  image(video, 0, 0);
  blendMode(ADD);
  noStroke();
  let hue = map(cos(frameCount * 0.05), -1, 1, 0, 50);

  for (let i = 0; i < faces.length; i++) {
    if(faces[i].lips.width / faces[i].lips.height < 1.3) {
      buddhaLight = lerp(buddhaLight, 240, 0.09);
    }else {
      buddhaLight = lerp(buddhaLight, 0, 0.09);
    }
    
    let noseX = faces[i].keypoints[0].x;
    let noseY = faces[i].keypoints[0].y;
    fill(hue, 80, 80, 20);
    push();
    translate(noseX, noseY);
    for(let j = 0; j < 20; j++) {
      noStroke();
      ellipse(0, 0, map(j, 0, 20, buddhaLight * 0.5, buddhaLight * 2));
    }
    pop();
  }

  blendMode(BLEND);
   if (segmentation) {
    video.mask(segmentation.mask);
    image(video, 0, 0);
   }

}

// callback function for body segmentation
function gotResults(result) {
  segmentation = result;
}
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
