/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";
const lineG = {
    x: 0,
    y: 0,
    length: 0,
    strokeChange: 25,
    lineChange: 50

}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("red");


    for (let i = 0; i < 20; i++) {

        fill("green")
        let r = random(0.1, 0.2)
        let s = random(-100, 100)


        if (i % 2 == 0) {

            strokeWeight(lineG.strokeChange * i * r);
            stroke(2)
        }
        else {
            strokeWeight(lineG.strokeChange * i * r);
            stroke(lineG.strokeChange * i, 0, 0);
        }
        line((lineG.lineChange * i), 0, (lineG.lineChange * i), height);

        line(0, (lineG.lineChange * i), (lineG.lineChange * i), height);


    }
}