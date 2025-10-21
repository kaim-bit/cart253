/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const cannon = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    cannonball: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};
const pill = {
    manager: 0,
    pick: 0,
    x: 0,
    y: 0
}
const cannonPill =
{
    x: 50,
    y: 200, // Will be random
    size: 30,
    speed: 3,
    hitCount: 0,
    sizeBuff: 50,
    lastingRate: 0
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    resetCannonPill()

    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveCannon();
    moveCannonBall();
    drawCannon();
    drawCannonPill();
    checkCannonBallFlyOverlap();
    checkCannonBallPillOverlap()
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

function drawCannonPill() {
    push();
    noStroke();
    fill("green");
    ellipse(cannonPill.x, cannonPill.y, cannonPill.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
    fly.speed = random(4, 6)
}

function resetCannonPill() {
    cannonPill.x = 2000;
    cannonPill.y = 5000;
}


function spawnPill() {
    pill.pick = 1
    pill.x = random(10, 400)
    pill.y = random(10, 400)

    //spawns cannon pill
    if (pill.pick == 1) {
        cannonPill.x = pill.x
        cannonPill.y = pill.y
    }
}

/**
 * Moves the frog to the mouse position on x
 */
function moveCannon() {
    cannon.body.x = mouseX;
}

/**
 * Handles moving the rock based on where the frog is
 */
function moveCannonBall() {
    // Tongue matches the frog's x

    // If the rock is idle, it doesn't do anything
    if (cannon.cannonball.state === "idle") {
        // rock matches the frog's x
        cannon.cannonball.x = cannon.body.x;
    }
    // If the tongue is outbound, it moves up
    else if (cannon.cannonball.state === "outbound") {
        cannon.cannonball.y += -cannon.cannonball.speed;
        // The tongue bounces back if it hits the top
        if (cannon.cannonball.y <= 0) {
            cannon.cannonball.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (cannon.cannonball.state === "inbound") {
        cannon.cannonball.y += cannon.cannonball.speed;
        // The tongue stops if it hits the bottom
        if (cannon.cannonball.y >= height) {
            cannon.cannonball.state = "idle";
        }
    }

}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawCannon() {
    // Draw the tongue tip
    push();
    fill("gray");
    noStroke();
    ellipse(cannon.cannonball.x, cannon.cannonball.y, cannon.cannonball.size);
    pop();


    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(cannon.body.x, cannon.body.y, cannon.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkCannonBallFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(cannon.cannonball.x, cannon.cannonball.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < cannon.cannonball.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        pill.manager += 1;
        // Bring back the cannonball
        cannon.cannonball.state = "inbound";
        if (pill.manager % 10 === 0) {
            spawnPill()
        }
        // makes the pill wear off after 5 flys killed
        if (cannon.cannonball.size == cannonPill.sizeBuff) {
            cannonPill.lastingRate += 1
            if (cannonPill.lastingRate === 5) {
                cannon.cannonball.size = 20
            }
        }
    }
}

function checkCannonBallPillOverlap() {
    // Get distance from tongue to fly
    const cPillD = dist(cannon.cannonball.x, cannon.cannonball.y, cannonPill.x, cannonPill.y);
    // Check if it's an overlap
    const cPillEaten = (cPillD < cannon.cannonball.size / 2 + cannonPill.size / 2);

    if (cPillEaten) {
        // Bring back the tongue
        cannon.cannonball.state = "inbound";
        // gives size buff to cannonball
        cannon.cannonball.size = cannonPill.sizeBuff;
        resetCannonPill()
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (cannon.cannonball.state === "idle") {
        cannon.cannonball.state = "outbound";
    }
}