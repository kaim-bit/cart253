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
    createCanvas(600, 400)
}
// draws the backround color
function backround_draw() {
    background(100, 0, 0)
}

//secret skeleton draw
function secret_skeleton() {
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
function faceDraw() {

    //neck
    push()
    noStroke()
    fill("tan")
    rect(285, 200, 50, 60)
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



const tshirt = {
    x: 205,
    y: 230,
    width: 205,
    height: 200,
    lineYOff: 32
};
function tshirtDraw() {
    //shirt itself
    push()
    noStroke()
    fill(34, 139, 34)
    rect(tshirt.x, tshirt.y, tshirt.width, tshirt.height)
    rect(CENTER)
    pop()


    // cutting of the tshirt
    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(100, 255, 255)
    line(430 + ((tshirt.x - tshirt.width)), 250 + ((tshirt.y - tshirt.height) - tshirt.lineYOff), 350 + (tshirt.x - tshirt.width), 230 + ((tshirt.y - tshirt.height) - tshirt.lineYOff))
    pop()

    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(255, 255, 255)
    line(270 + ((tshirt.x - tshirt.width)), 230 + ((tshirt.y - tshirt.height) - tshirt.lineYOff), 150 + (tshirt.x - tshirt.width), 255 + ((tshirt.y - tshirt.height) - tshirt.lineYOff))
    pop()

    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(255, 255, 255)
    line(470 + ((tshirt.x - tshirt.width) + 5), 400 + ((tshirt.y - tshirt.height) - tshirt.lineYOff), 400 + (tshirt.x - tshirt.width), 200 + ((tshirt.y - tshirt.height) - tshirt.lineYOff))
    pop()

    push()
    stroke(100, 0, 0)
    strokeWeight(31);
    fill(255, 255, 255)
    line(130 + ((tshirt.x - tshirt.width) + 5), 400 + ((tshirt.y - tshirt.height) - tshirt.lineYOff), 230 + (tshirt.x - tshirt.width), 200 + ((tshirt.y - tshirt.height) - tshirt.lineYOff))
    pop()


}

//drawHair(){

//}

/*
 * every frame creating and coloring shapes
*/
function draw() {
    backround_draw()
    secret_skeleton()
    faceDraw()



    moveUser()
    tshirtDraw()
    drawUser()
    moveTshirt()






}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}

const user =
{
    x: 10, // will be mouseX
    y: 10, // will be mouseY
    size: 25,
    fill: "#000000"
};

function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

function moveTshirt() {
    const d = dist(tshirt.x, tshirt.y, user.x, user.y)
    const overL = (d < user.size / 4 + tshirt.height / 4);

    if (overL) {
        tshirt.x += (user.x - tshirt.x) / 4
        tshirt.y += (user.y - tshirt.y) / 4
    }
}

