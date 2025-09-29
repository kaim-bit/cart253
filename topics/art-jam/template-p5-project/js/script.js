/**
 * Art Jam
 * Kai Maquivar
 * 
 * a portrait of me! with some other fun mechanics
 * 
 * 
 * hover over the middle of the tshirt to pick up, quickly swipe off of it to drop
 * every full clock rotation the clock gets faster
 */

"use strict";

/**
 * setting up the canvas to draw on
*/
function setup() {
    createCanvas(600, 400)
}
// draws the backround color
function backround_draw() {
    background(100, 0, 0)
}

//secret skeleton draw
function drawSkeleton() {
    //spine
    push()
    noStroke()
    fill(255, 255, 255)
    rect(300, 200, 20, 400)
    pop()

    // collar bone
    push()
    stroke('white')
    strokeWeight(10);
    fill(255, 255, 255)
    line(220, 250, 300, 270)
    pop()

    push()
    stroke('white')
    strokeWeight(10);
    fill(255, 255, 255)
    line(400, 250, 320, 270)
    pop()

    //ribcage
    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 250, 200, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 270, 200, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 290, 200, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 310, 200, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 330, 200, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 360, 200, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 390, 200, 10)
    pop()

    //hips
    push()
    noStroke()
    fill(255, 255, 255)
    rect(210, 550, 200, 100)
    pop()

    push()
    noStroke()
    fill(100, 0, 0)
    ellipse(240, 590, 20, 50)
    pop()

    push()
    noStroke()
    fill(100, 0, 0)
    ellipse(380, 590, 20, 50)
    pop()

    // head
    //jaw

    push()
    noStroke()
    fill(255, 255, 255)
    ellipse(310, 150, 80, 130)
    pop()

    //skull
    push()
    noStroke()
    fill(255, 255, 255)
    ellipse(310, 130, 90)
    pop()

    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(290, 130, 15)
    pop()

    push()
    noStroke()
    fill(0, 0, 0)
    ellipse(330, 130, 15)
    pop()

    push()
    noStroke()
    fill(0, 0, 0)
    rect(290, 170, 40, 5)
    pop()



}
//draws the face
function faceDraw() {

    //neck
    push()
    noStroke()
    fill("tan")
    rect(285, 200, 50, 50)
    pop()

    //face skin
    push()
    noStroke()
    fill(255, 215, 174)
    ellipse(310, 145, 100, 135)
    pop()

    //ears
    push()
    noStroke()
    fill(255, 215, 174)
    ellipse(260, 145, 20, 30)
    pop()

    push()
    noStroke()
    fill(255, 215, 174)
    ellipse(360, 145, 20, 30)
    pop()

    //lips

    push()
    noStroke()
    fill(150, 0, 0)
    ellipse(310, 180, 25, 10)
    pop()

    push()
    stroke(80, 0, 0)
    strokeWeight(2);
    line(320, 180, 300, 180)


    //eyes
    push()
    noStroke()
    fill(255, 255, 255)
    ellipse(290, 130, 20, 10)
    pop()

    push()
    noStroke()
    fill(255, 255, 255)
    ellipse(330, 130, 20, 10)
    pop()

    // pupils
    push()
    noStroke()
    fill("#140d07")
    ellipse(330, 130, 10, 5)
    pop()

    push()
    noStroke()
    fill("#140d07")
    ellipse(290, 130, 10, 5)
    pop()
}


// preloads the image for the hair
let img;
function preload() {
    img = loadImage("hair.png")
}

//puts the hair in the drawing
function hairDraw() {
    image(img, 50, -170, 500, 500)

}

// tshirt variables
const tshirt = {
    x: 308,
    y: 340,
    width: 210,
    height: 200,
    lineYOff: 32,
    centerOff: 100,
    tshirtX1Nudge: 5
};
//drawing the tshirt
function tshirtDraw() {
    //shirt itself
    push()
    noStroke()
    fill(34, 139, 34)
    rectMode(CENTER)
    rect(tshirt.x, tshirt.y, tshirt.width, tshirt.height)
    pop()


    // cutting of the tshirt

    // LINE STUFF -  basically because i wanted to have the cursor to go to the middle of the tshirt before moving, and have the tshirt cut lines follow the main tshirt block, i just did some math to make it follow, its overly complicated and lowkey ugly

    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(100, 255, 255)
    line(430 + ((tshirt.x - tshirt.width) - tshirt.centerOff), 250 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff, 350 + (tshirt.x - tshirt.width) - tshirt.centerOff, 230 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff)
    pop()

    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(255, 255, 255)
    line(270 + ((tshirt.x - tshirt.width)) - tshirt.centerOff, 230 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff, 150 + (tshirt.x - tshirt.width) - tshirt.centerOff, 255 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff)
    pop()

    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(255, 255, 255)
    line(460 + ((tshirt.x - tshirt.width) + tshirt.tshirtX1Nudge) - tshirt.centerOff, 400 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff, 390 + (tshirt.x - tshirt.width) - tshirt.centerOff, 200 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff)
    pop()


    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(255, 255, 255)
    line(130 + ((tshirt.x - tshirt.width) + tshirt.tshirtX1Nudge) - tshirt.centerOff, 400 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff, 230 + (tshirt.x - tshirt.width) - tshirt.centerOff, 200 + ((tshirt.y - tshirt.height) - tshirt.lineYOff) - tshirt.centerOff)
    pop()


}



/*
 * every frame creating and coloring shapes
*/
function draw() {
    // cool cursor setting
    cursor(CROSS);
    //backround
    backround_draw()
    //skeleton
    drawSkeleton()
    //tshirt
    tshirtDraw()
    //face
    faceDraw()
    //cursor movement
    moveUser()
    //visual cursor
    drawUser()
    //tshirt movement
    moveTshirt()
    //clock
    drawClock()
    //clock mech
    moveClockHand()
    //hair
    hairDraw()






}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}

//user variables
const user =
{
    x: 10, // will be mouseX
    y: 10, // will be mouseY
    size: 25,
    fill: "#000000"
};

//drawing the cursor
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

// moves clockhand around clock
function moveClockHand() {
    //constrains the clock hands so they dont fly off the screen
    clock.clockhandY = constrain(clock.clockhandY, 50, 150)
    clock.clockhandX = constrain(clock.clockhandX, 475, 575)
    //constrains the speed of the clock
    clock.tick = constrain(clock.tick, 1, 15)


    // clock logic, 3 booleans to control the 4 sections of the clock(TR,BR,BL,TL), HalfManager is to deny the logic from going back because some segements need to have the same bolean arguments as others


    if (clock.twelveToSixY && clock.nineToThree && clock.clockHalfManager) {
        clock.clockhandY += clock.tick
        clock.clockhandX += clock.tick
        if (clock.clockhandX >= 575 && clock.clockhandY >= 100) {
            clock.nineToThree = false
            clock.twelveToSixY = true
            clock.clockHalfManager = true
        }
    }
    if (clock.twelveToSixY && !clock.nineToThree && clock.clockHalfManager) {
        clock.clockhandY += clock.tick
        clock.clockhandX -= clock.tick
        if (clock.clockhandX <= 525 && clock.clockhandY >= 150) {
            clock.nineToThree = false
            clock.twelveToSixY = false
            clock.clockHalfManager = false
        }
    }
    if (!clock.twelveToSixY && !clock.nineToThree && !clock.clockHalfManager) {
        clock.clockhandY -= clock.tick
        clock.clockhandX -= clock.tick
        if (clock.clockhandX <= 475 && clock.clockhandY <= 100) {
            clock.nineToThree = false
            clock.twelveToSixY = true
            clock.clockHalfManager = false
        }
    }
    if (clock.twelveToSixY && !clock.nineToThree && !clock.clockHalfManager) {
        clock.clockhandY -= clock.tick
        clock.clockhandX += clock.tick
        if (clock.clockhandX >= 525 && clock.clockhandY <= 50) {
            clock.nineToThree = true
            clock.twelveToSixY = true
            clock.clockHalfManager = true
            clock.tick += 0.5
        }
    }
}

// clock variables
const clock =
{

    clockhandStrokeWeight: 2,
    clockhandYStag: 100,
    clockhandXStag: 525,
    clockhandY: 50,
    clockhandX: 525,

    tick: 1,

    twelveToSixY: true,
    nineToThree: true,
    clockHalfManager: true


}

//draws the clock
function drawClock() {
    push()
    ellipse(525, 100, 100)
    fill(255, 255, 255)
    pop()

    push()
    stroke(20, 20, 0)
    strokeWeight(clock.clockhandStrokeWeight);
    line(clock.clockhandXStag, clock.clockhandYStag, clock.clockhandX, clock.clockhandY)
    pop()
}

// this gets the position to the tshirt and starts the process of manipulating the location
function moveTshirt() {
    const d = dist(tshirt.x, tshirt.y, user.x, user.y)
    const overL = (d < user.size / 2 + tshirt.width / 2);

    if (overL) {
        tshirt.x += (user.x - tshirt.x) / 4
        tshirt.y += (user.y - tshirt.y) / 4
    }
}

