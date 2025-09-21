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

    
    fill(255,255,255)
    rect(210,250,200,20)

    fill(255,255,255)
    rect(210,300,200,20)

    fill(255,255,255)
    rect(210,350,200,20)

    


}
/**
 * every frame creating and coloring shapes
*/
function draw() 
{
 backround_draw()
 secret_skeleton()
}