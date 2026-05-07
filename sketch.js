//We need a variable to hold our image
let img;

let fit = {
  x: 0,
  y: 0,
  w: 0,
  h: 0
};

//We will divide the image into segments
let numSegments = 50;

//We will store the segments in an array
let segments = [];

//lets add a variable to switch between drawing the image and the segments
let drawSegments = true;

//lets load the image from disk
function preload() {
  img = loadImage('/assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  //We will make the canvas the same size as the image using its properties
  createCanvas(windowWidth, windowHeight);
  calculateFit();

  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  for(let row = 0; row < numSegments; row++){
      for(let col = 0; col < numSegments; col++){
        segments.push(new ImageSegments(row, col));
      }
  }
  //We can use the width and height of the image to calculate the size of each segment

  /*
  Divide the original image into segments, we are going to use nested loops
  */

  /*for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      //We will use the x and y position to get the colour of the pixel from the image
      //lets take it from the centre of the segment
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
       let segment = new ImageSegment(segXPos,segYPos,segmentWidth,segmentHeight,segmentColour);
       segments.push(segment);
    }
  }*/
}

function draw() {


  background(220);

  image(img, fit.x, fit.y, fit.w, fit.h);
  if (drawSegments) {
    //lets draw the segments to the canvas
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    //lets draw the image to the canvas
    image(img, fit.x, fit.y, fit.w, fit.h);
  }
}

function calculateFit(){
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  if (imgAspect > canvasAspect){
    fit.w = width;
    fit.h = width / imgAspect;
  }
  else{
    fit.h = height;
    fit.w = height * imgAspect;
  }

  fit.x = (width - fit.w) / 2;
  fit.y = (height - fit.h) / 2;
}

class ImageSegments {
  constructor(row, col){
    this.row = row;
    this.col = col;

    this.color = this.sampleColor();
  }

sampleColor(){
  let sampleW = img.width / numSegments;
  let sampleH = img.height / numSegments;

  let x = this.col * sampleW+ sampleW / 2;
  let y = this.row * sampleH+ sampleH / 2;

  return img.get(x,y);
}

draw(){
  let w = fit.w / numSegments;
  let h = fit.h / numSegments;

  let x = fit.x + this.col * w;
  let y = fit.y + this.row * h;

  stroke(0);
  fill(this.color);
  rect(x, y, w, h);
}
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  calculateFit();
}

function keyPressed() {
  if (key == " ") {
    //this is a neat trick to invert a boolean variable,
    //it will always make it the opposite of what it was
    drawSegments = !drawSegments;
  }
}


//Here is our class for the image segments, we start with the class keyword
class ImageSegment {

  constructor(srcImgSegXPosInPrm,srcImgSegYPosInPrm,srcImgSegWidthInPrm,srcImgSegHeightInPrm,srcImgSegColourInPrm) {
    //these parameters are used to set the internal properties of an instance of the segment
    //These parameters are named as imageSource as they are derived from the image we are using
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
  }

  draw() {
    //lets draw the segment to the canvas, for now we will draw it as an empty rectangle so we can see it
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
  }
}