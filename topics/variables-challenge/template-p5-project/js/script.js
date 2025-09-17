/**
 * Variables challenge
 * Kai Maquivar
 * 
 * challenge of changing variables 
 */

/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
}
let annoyingBird = {
    x: 0,
    y: 300,
    size:50,
    birdSpeed: 1,
    wingSize: 50,
    wingX: -2,
    wingY: -1,
    

    fill: 
    {
    r:200,
    g:20,
    b:20,
    wingColor: 
    {
     r: 180,
     b: 10,
     g: 10
    }
    }

}
let skyshade = 
 {
    r: 50,
    g: 100,
    b: 200
}

let shadeRate = 1
let birdFlap = undefined

let shakeRange = 
    {
        xMin: 197,
        xMax: 203,
        yMin: 197,
        yMax: 203,
    }
    let shake = undefined
/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
 function shake()
    {
     shakeV= {
        x: random(-1,1),
        y: random(-1,1),
        RAGE: 0.1
        }
    }
  

}
//backround color changing to black 
function changingBac() {
    skyshade.b -= shadeRate
  skyshade.g -= shadeRate
  skyshade.r -= shadeRate
  background(skyshade.r, skyshade.g, skyshade.b);
}

// his shaking visable rage
function seethingRAGE()
{
    
    mrFurious.x += shake.x
    mrFurious.y += shake.y
}

function limiter() {
    mrFurious.y = constrain(mrFurious.x,(shakeRange.xMin - shake.RAGE),(shakeRange.xMax + shake.RAGE))
    mrFurious.x = constrain(mrFurious.y, (shakeRange.yMin - shake.RAGE), (shakeRange.yMax + shake.RAGE))
}

// his angry flap pattern
function birdPath()
{
    annoyingBird.x += annoyingBird.birdSpeed
    annoyingBird.y += random(-5,5)
}
//making the angry bird
function birdDraw()
{
ellipse(annoyingBird.x, annoyingBird.y, annoyingBird.size)
rect((annoyingBird.x - annoyingBird.wingX),(annoyingBird.y - annoyingBird.wingy),annoyingBird.wingSize)
}
/**
 * Draw (and update) Mr. Furious
 */
function draw()
 {
  changingBac();
  birdPath();
  birdDraw();
  shake()
  seethingRAGE();
  limiter();
  
 
  

  
  
  
  
  //decreases shades of green and blue
  mrFurious.fill.g -= shadeRate
  mrFurious.fill.b -= shadeRate

  constrain(mrFurious.r, 200,(200 + shake.RAGE))
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
}