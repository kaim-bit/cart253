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
        size: 35,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};


const menu = {
    state: "Start",
    background: "cyan"
}

const allScores = {
    flyPassed: 0,
    flyHit: 0,
    highscore: 0,
    gameLost: false
}

const startButton = {
    x: 200,
    y: 200,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }
}

const menuButton = {
    x: 200,
    y: 200,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }

}

const instructionButton = {
    x: 200,
    y: 180,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }

}

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 10,
    fill: "#000000"
};
// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3 // will change
};

const pill = {
    manager: 0,
    pick: 0,
    x: 0,
    y: 0,
    lastingRate: 0
}
const cannonPill =
{
    x: 50,
    y: 200, // Will be random
    size: 30,
    speed: 3,
    hitCount: 0,
    sizeBuff: 70,
}

const speedPill =
{
    x: 50,
    y: 200, // Will be random
    size: 30,
    speed: 40,
    sizeBuff: 50,
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    resetCannonPill()
    resetSpeedPill()

    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {

    if (menu.state === "Start") {
        allScores.gameLost = false
        background(menu.background)
        const p = random();

        if (p < 0.1) {
            startButton.velocity.x = random(-3, 3);
            startButton.velocity.y = random(-3, 3);
        }
        startButton.x += startButton.velocity.x;
        startButton.y += startButton.velocity.y;

        startButton.x = constrain(startButton.x, 0, 560)
        startButton.y = constrain(startButton.y, 0, 380)

        const i = random();

        if (i < 0.1) {
            instructionButton.velocity.x = random(-3, 3);
            instructionButton.velocity.y = random(-3, 3);
        }
        instructionButton.x += instructionButton.velocity.x;
        instructionButton.y += instructionButton.velocity.y;

        instructionButton.x = constrain(instructionButton.x, 0, 560)
        instructionButton.y = constrain(instructionButton.y, 0, 380)
        menuLogic()
        moveUser()
        drawUser()
        drawStartButton()
        drawInstructionButton()
    }
    if (menu.state === "Instructions") {
        background("#87ceeb");

        const s = random();

        if (s < 0.1) {
            menuButton.velocity.x = random(-3, 3);
            menuButton.velocity.y = random(-3, 3);
        }
        menuButton.x += menuButton.velocity.x;
        menuButton.y += menuButton.velocity.y;

        menuButton.x = constrain(menuButton.x, 0, 560)
        menuButton.y = constrain(menuButton.y, 0, 380)

        moveUser()
        drawMenuButton()
        instructionsLogic()


    }

    if (menu.state === "Game") {
        background("cyan");
        moveFly();
        drawFly();
        moveCannon();
        moveCannonBall();
        drawCannon();
        drawCannonPill();
        drawSpeedPill();
        checkCannonBallFlyOverlap();
        checkCannonBallPillOverlap()
        drawScore()
        drawHits()
        if (allScores.gameLost) {
            allScores.highscore = allScores.flyHit
            allScores.flyHit = 0
            allScores.flyPassed = 0
            allScores.gameLost = true
            menu.state = "Start"
        }


    }

}





function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}
function drawStartButton() {
    fill("black");
    rect(startButton.x, startButton.y, startButton.size)

    text("Start", startButton.x - 2, startButton.y - 20, 40)
}
function drawMenuButton() {
    fill("red");
    rect(menuButton.x, menuButton.y, menuButton.size)
    noStroke()

    text("Menu", menuButton.x - 5, menuButton.y - 20, 40)
}
function drawInstructionButton() {
    fill("yellow");
    rect(instructionButton.x, instructionButton.y, instructionButton.size)
    noStroke()

    fill("black")
    text("Instructions", instructionButton.x - 20, instructionButton.y - 20, 40)
}

function drawScore() {
    push()
    textSize(20)
    textStyle(BOLD)
    fill("black")
    text(allScores.flyHit + " FLIES KILLED!", 250, 30, 200)
    pop()
}
function drawHits() {
    push()
    textSize(40)
    textStyle(BOLD)
    fill("red")
    text(allScores.flyPassed, 580, 193, 10)
    text("_", 590, 197, 10)
    text("20", 580, 240, 10)
    pop()

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
        allScores.flyPassed += 1
        resetFly();
        if (allScores.flyPassed == 5) {
            allScores.gameLost = true
        }
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



/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
    fly.speed = random(4, 6)
}

function drawSpeedPill() {
    push();
    noStroke();
    fill("red");
    ellipse(speedPill.x, speedPill.y, speedPill.size);
    pop();
}

function resetSpeedPill() {
    speedPill.x = 2000;
    speedPill.y = 5000;
}

function drawCannonPill() {
    push();
    noStroke();
    fill("green");
    ellipse(cannonPill.x, cannonPill.y, cannonPill.size);
    pop();
}
function resetCannonPill() {
    cannonPill.x = 2000;
    cannonPill.y = 5000;
}


function spawnPill() {
    pill.pick = random(0, 1)

    pill.x = random(10, 630)
    pill.y = random(10, 390)

    //spawns cannon pill
    if (pill.pick >= 0.5) {
        cannonPill.x = pill.x
        cannonPill.y = pill.y
    }

    if (pill.pick <= 0.49) {
        speedPill.x = pill.x
        speedPill.y = pill.y
    }
}

/**
 * Moves the frog to the mouse position on x
 */
function moveCannon() {
    cannon.body.x = mouseX;
}

function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
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

function menuLogic() {
    // Calculate distance between circles' centres
    const dToStart = dist(startButton.x, startButton.y, user.x, user.y);
    const dToInstruct = dist(instructionButton.x, instructionButton.y, user.x, user.y)

    const overStart = (dToStart < startButton.size / 2 + user.size / 2);
    const overInstruct = (dToInstruct < instructionButton.size / 2 + user.size / 2);
    if (overStart) {
        menu.state = "Game"
    }
    if (overInstruct) {
        menu.state = "Instructions"
    }
}

function instructionsLogic() {
    const dToMenu = dist(menuButton.x, menuButton.y, user.x, user.y)
    const overMenu = (dToMenu < menuButton.size / 2 + user.size / 2);
    if (overMenu) {
        menu.state = "Start"
    }
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
        allScores.flyHit += 1
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
            pill.lastingRate += 1
            if (pill.lastingRate === 5) {
                cannon.cannonball.size = 35
                pill.lastingRate = 0
            }
        }
        if (cannon.cannonball.speed == speedPill.speed) {
            pill.lastingRate += 1
            if (pill.lastingRate === 5) {
                cannon.cannonball.speed = 20
                pill.lastingRate = 0
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

    const sPillD = dist(cannon.cannonball.x, cannon.cannonball.y, speedPill.x, speedPill.y);
    // Check if it's an overlap
    const sPillEaten = (sPillD < cannon.cannonball.size / 2 + speedPill.size / 2);

    if (sPillEaten) {
        // Bring back the tongue
        cannon.cannonball.state = "inbound";
        // gives size buff to cannonball
        cannon.cannonball.speed = speedPill.speed;
        resetSpeedPill()
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