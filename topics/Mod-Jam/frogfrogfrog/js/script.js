/**
 * Frogfrogfrog MOD JAM
 * Pippin Barr and Kai Maquivar
 * 
 * A game of shooting flies with cannonballs
 * 
 * Instructions:
 * - Move the cannon with your mouse
 * - Click to shoot a cannonball
 * - kill flies
 * 
 * Made with p5
 * https://p5js.org/
 */
"use strict";

// Our cannon
const cannon = {
    // The cannons body and lip, aswell as the position and size
    body: {
        x: 320,
        y: 520,
        width: 75,
        height: 150
    },
    lip: {
        x: 0,
        y: 100,
        size: 150
    },

    // the cannonballs position, size, speed and state
    cannonball: {
        x: undefined,
        y: 480,
        size: 35,
        speed: 20,
        // Determines how the cannon ball moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
}

// menu variables for the menu
const menu = {
    state: "Start",
    background: "cyan"
}
// all scores
const allScores = {
    flyPassed: 0,
    flyHit: 0,
    highscore: 0,
    gameLost: false
}
// the button for the start of the game
const startButton = {
    x: 200,
    y: 200,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }
}
// the button for the menu 
const menuButton = {
    x: 200,
    y: 200,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }

}
// the button for the instructions menu
const instructionButton = {
    x: 200,
    y: 180,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }

}
// the button for the speed upgrade
const speedShopButton = {
    x: 200,
    y: 180,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }

}
// the button for the size upgrade
const sizeShopButton = {
    x: 200,
    y: 180,
    size: 20,
    velocity: {
        x: 1,
        y: 1
    }

}
// instructions and there dimensions and text
const instructionText = {
    text1x: 220,
    text1y: 25,
    text1size: 200,
    text1text: "CLICK TO SHOOT, DONT LET THE EVIL FLIES IN TO YOUR SHIP, SHOOT THEM WITH YOUR MIGHTY CANNON, THERES PILLS MATEY, GREEN FOR SIZE AND RED FOR SPEED.",

    text2x: 220,
    text2y: 155,
    text2size: 200,
    text2text: "FLIES NEED A BREAK TOO, I WILL HAVE A SHOP OPEN FOR YOU MATEY EVERY 20 FLIES, REMEMBER AYE THESE SCALLYWAGS ARE GOING TO GET MORE ANGRY, AFTERALL WE GOT THEIR LOOT HAHAHAHHAHAHAH!!!",

    text3x: 220,
    text3y: 300,
    text3size: 200,
    text3text: "PLEASE MATEY, WHATEVER YE DO DONT LET THEM FLIES IN, EH I MIGHT BE ABLE TO TAKE DOWN 19 BUT IF 20 GETS THROUGH THE DAMN BLOODY GATE WE ARE FINISHED! GOOD SHOOTING MATEY!!!"

}
// the mouse
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
    speed: 3, // will change
    waveDif: 1
};

//pill variables for the other pills
const pill = {
    manager: 0,
    pick: 0,
    x: 0,
    y: 0,
    lastingRate: 0
}
// size pill
const cannonPill =
{
    x: 50,
    y: 200, // Will be random
    size: 30,
    hitCount: 0,
    sizeBuff: 35,
    on: false
}
// speed pill
const speedPill =
{
    x: 50,
    y: 200, // Will be random
    size: 30,
    speedBuff: 15,
    on: false
}
/**
 * preloads the sounds for use
 */

let cannonballSound
let hitSound
function preload() {
    soundFormats('mp3', 'ogg');
    cannonballSound = loadSound('assets/sounds/powerful-cannon-shot-352459.mp3');
    hitSound = loadSound('assets/sounds/metal-hit-sound-effect-241374.mp3');
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

    /**
     * the menu state of the game
     */
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
        moveUser()
        menuLogic()
        drawUser()
        drawStartButton()
        drawInstructionButton()
    }

    /**
   * the instuctions state of the game
   */
    if (menu.state === "Instructions") {
        background("cyan");
        drawInstructions()

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
        drawUser()
        drawMenuButton()
        instructionsLogic()


    }

    /**
   * the game state of the game
   */
    if (menu.state === "Game") {
        if (allScores.flyPassed == 20) {
            allScores.gameLost = true
            if (allScores.gameLost == true) {
                allScores.highscore = allScores.flyHit
                allScores.flyHit = 0
                allScores.flyPassed = 0
                menu.state = "Lost"
            }
        }
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

    }

    /**
   * the shop state of the game
   */
    if (menu.state === "Shop") {
        background("cyan");
        //flying buttons
        const Ss = random();

        if (Ss < 0.1) {
            sizeShopButton.velocity.x = random(-3, 3);
            sizeShopButton.velocity.y = random(-3, 3);
        }
        sizeShopButton.x += sizeShopButton.velocity.x;
        sizeShopButton.y += sizeShopButton.velocity.y;

        sizeShopButton.x = constrain(sizeShopButton.x, 0, 560)
        sizeShopButton.y = constrain(sizeShopButton.y, 0, 380)

        //flying buttons
        const Sss = random();


        if (Sss < 0.1) {
            speedShopButton.velocity.x = random(-3, 3);
            speedShopButton.velocity.y = random(-3, 3);
        }
        speedShopButton.x += sizeShopButton.velocity.x;
        speedShopButton.y += sizeShopButton.velocity.y;

        speedShopButton.x = constrain(speedShopButton.x, 0, 560)
        speedShopButton.y = constrain(speedShopButton.y, 0, 380)


        drawSizeShopButton()
        drawSpeedShopButton()
        moveUser()
        drawUser()
        shopLogic()
    }

    /**
   * the ending state of the game
   */
    if (menu.state === "Lost") {
        //resets upgrades and buffs
        cannon.cannonball.size = 35
        cannon.cannonball.speed = 20

        background("blue");
        const s = random();

        //flying buttons
        if (s < 0.1) {
            menuButton.velocity.x = random(-3, 3);
            menuButton.velocity.y = random(-3, 3);
        }
        menuButton.x += menuButton.velocity.x;
        menuButton.y += menuButton.velocity.y;

        menuButton.x = constrain(menuButton.x, 0, 560)
        menuButton.y = constrain(menuButton.y, 0, 380)


        moveUser()
        drawUser()
        drawMenuButton()
        instructionsLogic()
    }

}
/**
* draws a circle around the cursor
 */
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}
/**
* draws the start button in the shop and menu
 */
function drawStartButton() {
    fill("black");
    rect(startButton.x, startButton.y, startButton.size)

    text("Start", startButton.x - 2, startButton.y - 20, 40)
}

/**
* draws the menu button in the ending and instructions
 */
function drawMenuButton() {
    fill("red");
    rect(menuButton.x, menuButton.y, menuButton.size)
    noStroke()

    text("Menu", menuButton.x - 5, menuButton.y - 20, 40)
}

/**
* draws the instructions button in the menu
 */
function drawInstructionButton() {
    fill("yellow");
    rect(instructionButton.x, instructionButton.y, instructionButton.size)
    noStroke()

    fill("black")
    text("Instructions", instructionButton.x - 20, instructionButton.y - 20, 40)
}

/**
* draws the speed upgrade button in the shop
 */
function drawSpeedShopButton() {
    push();
    noStroke();
    fill("red");
    ellipse(speedShopButton.x, speedShopButton.y, speedShopButton.size);
    pop();
}

/**
* draws the size upgrade button in the shop
 */
function drawSizeShopButton() {
    push();
    noStroke();
    fill("green");
    ellipse(sizeShopButton.x, sizeShopButton.y, sizeShopButton.size);
    pop();
}

/**
* draws the visual instructions in the instructions state
 */
function drawInstructions() {
    textSize(13)
    textStyle(BOLD)
    fill("black")
    text(instructionText.text1text, instructionText.text1x, instructionText.text1y, instructionText.text1size)

    fill("black")
    text(instructionText.text2text, instructionText.text2x, instructionText.text2y, instructionText.text2size)

    fill("black")
    text(instructionText.text3text, instructionText.text3x, instructionText.text3y, instructionText.text3size)
}

/**
* draws the visual score counter
 */
function drawScore() {
    push()
    textSize(20)
    textStyle(BOLD)
    fill("black")
    text(allScores.flyHit + " FLIES KILLED!", 250, 30, 200)
    pop()
}

/**
* draws the visual loss counter
 */
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
    fly.speed = random(4, 6 + fly.waveDif)
}

/**
 * draws the phisical cannon speed pill
 */
function drawSpeedPill() {
    push();
    noStroke();
    fill("red");
    ellipse(speedPill.x, speedPill.y, speedPill.size);
    pop();
}

/**
 *  basically the visual destruction of the pill, and priming it for its next use
 */
function resetSpeedPill() {
    speedPill.x = 2000;
    speedPill.y = 5000;
}

/**
 * draws the phisical cannon size pill
 */
function drawCannonPill() {
    push();
    noStroke();
    fill("green");
    ellipse(cannonPill.x, cannonPill.y, cannonPill.size);
    pop();
}
/**
 *  basically the visual destruction of the pill, and priming it for its next use
 */
function resetCannonPill() {
    cannonPill.x = 2000;
    cannonPill.y = 5000;
}

/**
 *  handles what pill is spawned and where.
 */
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

/**
 * visually shows cursor movement
 */
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


    // Draw the cannons body
    push();
    fill("gray");
    noStroke();
    rect(cannon.body.x - 40, cannon.body.y - 100, 75, 100)
    pop();

    //draws the lip of the cannon and follows the body
    push();
    fill("black");
    noStroke();
    ellipse(cannon.body.x - 2, cannon.body.y - cannon.lip.y, 71, 10)
    pop();


}

/**
 * scanning to see which button on the menu is being touched, and what to do next if touched
 */
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
/**
 * shop button scanner to determine when it is hovered over and what to do next, hover over green, size increase, hover over red, speed increase
 */
function shopLogic() {
    // Calculate distance between circles' centres
    const dToSpeed = dist(speedShopButton.x, speedShopButton.y, user.x, user.y);
    const dToSize = dist(sizeShopButton.x, sizeShopButton.y, user.x, user.y)

    const overSpeed = (dToSpeed < speedShopButton.size / 2 + user.size / 2);
    const overSize = (dToSize < sizeShopButton.size / 2 + user.size / 2);
    if (overSpeed) {
        cannon.cannonball.speed + 15
        menu.state = "Game"
    }
    if (overSize) {
        cannon.cannonball.size += 15
        menu.state = "Game"
    }
}


/**
 * intructions menu button scanner to determine when it is hovered over and what to do next
 */
function instructionsLogic() {
    const dToMenu = dist(menuButton.x, menuButton.y, user.x, user.y)
    const overMenu = (dToMenu < menuButton.size / 2 + user.size / 2);
    if (overMenu) {
        menu.state = "Start"
    }
}

/**
 * Handles the cannonball and if its overlapping the fly
 */
function checkCannonBallFlyOverlap() {
    // Get distance from ball to fly
    const d = dist(cannon.cannonball.x, cannon.cannonball.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < cannon.cannonball.size / 2 + fly.size / 2);
    if (eaten) {
        hitSound.play()
        allScores.flyHit += 1
        // Reset the fly
        resetFly();
        pill.manager += 1;
        // Bring back the cannonball
        cannon.cannonball.state = "inbound";
        if (allScores.flyHit % 20 === 0) {
            fly.waveDif += 1
            menu.state = "Shop"

        }
        if (pill.manager % 10 === 0) {
            spawnPill()
        }
        // makes the pill wear off after 5 flys killed
        if (cannonPill.on) {
            pill.lastingRate += 1
            if (pill.lastingRate === 5) {
                cannon.cannonball.size -= cannonPill.sizeBuff
                pill.lastingRate = 0
                cannonPill.on = false
            }
        }
        if (speedPill.on) {
            pill.lastingRate += 1
            if (pill.lastingRate === 5) {
                cannon.cannonball.speed -= speedPill.speedBuff
                pill.lastingRate = 0
                speedPill.on = false
            }
        }
    }
}

/**
 * Handles the cannonball and if its overlapping cannon ball pills
 */
function checkCannonBallPillOverlap() {
    // Get distance from tongue to size pill
    const cPillD = dist(cannon.cannonball.x, cannon.cannonball.y, cannonPill.x, cannonPill.y);
    // Check if it's an overlap
    const cPillEaten = (cPillD < cannon.cannonball.size / 2 + cannonPill.size / 2);

    if (cPillEaten) {
        // Bring back the tongue
        cannonPill.on = true
        cannon.cannonball.state = "inbound";
        // gives size buff to cannonball
        cannon.cannonball.size += cannonPill.sizeBuff;
        cannonPill.on = true
        resetCannonPill()
    }

    // Get distance from tongue to speed pill
    const sPillD = dist(cannon.cannonball.x, cannon.cannonball.y, speedPill.x, speedPill.y);
    // Check if it's an overlap
    const sPillEaten = (sPillD < cannon.cannonball.size / 2 + speedPill.size / 2);

    if (sPillEaten) {
        // Bring back the tongue
        cannon.cannonball.state = "inbound";
        // gives speed buff to cannonball
        cannon.cannonball.speed += speedPill.speedBuff;
        speedPill.on = true

        //sends the pill out of the player view
        resetSpeedPill()
    }
}

/**
 * Launch the cannonball on click (if it's not launched yet)
 */
function mousePressed() {
    if (cannon.cannonball.state === "idle") {
        cannon.cannonball.state = "outbound";
        cannonballSound.play()

    }
}