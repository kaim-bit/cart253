/**
 * Art Jam
 * Kai Maquivar
 * 
 * a portrait of me! with some other fun mechanics
 */

"use strict";

/**
 * setting up the canvas to draw on
*/
function setup() {
    createCanvas(600,600)
}
// draws the backround color
function backround_draw()
{
    background(100,0,0)
}

//secret skeleton draw
function secret_skeleton()
{
    //spine
    push()
    noStroke()
    fill(255,255,255)
    rect(300,200,20,400)

    // collar bone
    push()
    stroke('white')
    strokeWeight(10);
    fill(255,255,255)
    line(220,250,300,220)
    pop()

     push()
    stroke('white')
    strokeWeight(10);
    fill(255,255,255)
    line(400,250,320,220)
    pop()

    //ribcage
    fill(255,255,255)
    rect(210,250,200,10)

    fill(255,255,255)
    rect(210,270,200,10)

    fill(255,255,255)
    rect(210,290,200,10)

    fill(255,255,255)
    rect(210,310,200,10)

    fill(255,255,255)
    rect(210,330,200,10)

    fill(255,255,255)
    rect(210,360,200,10)

    fill(255,255,255)
    rect(210,390,200,10)
    pop()

    //hips
    push()
    noStroke()
    fill(255,255,255)
    rect(210,550,200,100)
    
    fill(100,0,0)
    ellipse(240,590,20,50)

    fill(100,0,0)
    ellipse(380,590,20,50)
    pop()

        // head
    //jaw


    noStroke()
    fill(255,255,255)
    ellipse(310,150,80,130)
    pop()

    
    

   

    //skull
    fill(255,255,255)
    ellipse(310,130,90)
    
     fill(0,0,0)
    ellipse(290,130,15)
     fill(0,0,0)
    ellipse(330,130,15)

    push()
    noStroke()
    fill(0,0,0)
    rect(290,170,40,5)
    push()











   

    


}
/**
 * every frame creating and coloring shapes
*/
function draw() 
{
 backround_draw()
 secret_skeleton()
}