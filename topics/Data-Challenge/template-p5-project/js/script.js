/**
 * Terrible New Car
 * Pippin Barr And Kai Maquivar
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let nonsenseData = undefined;
let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "en";


let carName;
/**
 * Load the car and dinosaur data
 */
function preload() {
    langData = loadJSON("Lang/lang.json")
    dinosaurData = loadJSON("Lang/dinosaurs.json")
    carData = loadJSON("Lang/cars.json")
    nonsenseData = loadJSON("Lang/flib.json")
}

/**
 * Create the canvas
*/

function langSwitch() {
    if (lang === "fr") {
        carName = langData.fr
    }
    else {
        if (lang === "en") {
            carName = langData.en
        }
    }
}



function setup() {
    createCanvas(600, 400);


    langSwitch()
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2);
    pop();
}


function generateCarName() {
    let d = random(0, carData.cars.length)
    d = int(d)

    let c = random(0, carData.cars.length)
    c = int(c)

    let n = random(0, nonsenseData.nonsense.length)
    n = int(n)

    console.log(carData.cars[c] + nonsenseData.nonsense[n] + dinosaurData.dinosaurs[d])
}
/**
 * Generate a new car name
 */
function mousePressed() {
    generateCarName()
}