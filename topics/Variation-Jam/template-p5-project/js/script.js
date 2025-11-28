/**
 * Variation Jam
 * Kai Maquivar
 * 
 * This is a Rock paper scissors theme varation, the first game being the original, second being..., third being...
 */

"use strict";
let gameState = "Menu"
let gameStateMouse = "Menu"
const particles = []
const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 10,
    fill: "#000000"
}

const menuVariables = {
    M1X: 200,
    M2X: 600,
    M3X: 1000,

    M1Y: 200,
    M2Y: 400,
    M3Y: 600,

    size: 150,
}
const gameOneVariables = {
    gameOneState: "Start",
    playerChoice: undefined, // decided when player clicks on obj
    computerChoice: undefined, // not decided yet
    computerChance: 0.33,
    timerSpeed: -50,
    timerY: 810,
    timerYS: -810,
    computerPicked: false
}

const gameOneChoiceVariables = {
    newCanvasOffset: 400,
    RChoiceX: 200,
    RChoiceY: 300,
    RChoiceW: 300,

    PChoiceX: 600,
    PChoiceY: 300,
    PChoiceW: 300,

    SChoiceX: 1000,
    SChoiceY: 300,
    SChoiceW: 300,
}

let rMImg;
let pMImg;
let sMImg;
let rImg;
let pImg
let sImg
let funFont
let coolFont
function preload() {
    coolFont = loadFont('assets/JellyjampersonaluseBold-Rpjev.otf')
    funFont = loadFont('assets/Extracalories-rgx88.otf')
    rImg = loadImage('assets/images/rock.png');
    pImg = loadImage('assets/images/paper.png');
    sImg = loadImage('assets/images/scissors.png');
    rMImg = loadImage('assets/images/rockmenu.png');
    pMImg = loadImage('assets/images/papermenu.png');
    sMImg = loadImage('assets/images/scissorsM.png');

}

/**
 * sets up all things needed for game to run smoothly
*/
function setup() {
    frameRate(30);
    createCanvas(1200, 800)
    for (let i = 0; i < 5000; i++) {
        // Create a particle
        const particle = createParticle();
        // Add it to the array
        particles.push(particle);
    }

}

function createParticle() {
    if (gameState === "GameOne") {
        let i = random(-20, 20)
        const newParticle = {
            x: i * random(0, width),
            y: random(0, height),
            size: random(10, 20),
            velocity: {
                x: i + random(-3, 3,),
                y: 3
            }
        };
        return newParticle;
    }
    else if (gameState === "Menu") {
        let i = random(10, -10)
        let c = random(2, 1)
        const newParticle = {
            x: i * random(0, width),
            y: c * random(0, height),
            size: random(10, 20),
            velocity: {
                x: i + random(-3, 20,),
                y: 3
            }
        };
        return newParticle;
    }


}

function drawUser() {
    user.x = mouseX
    user.y = mouseY
    push()
    noStroke()
    fill("black")
    ellipse(user.x, user.y, user.size)
}
function drawMenu1Choice() {
    push()
    noStroke()
    fill("darkgrey")
    ellipse(menuVariables.M1X, menuVariables.M1Y, menuVariables.size + 10)
    pop()
    push()
    noStroke()
    fill("black")
    ellipse(menuVariables.M1X, menuVariables.M1Y, menuVariables.size)
    pop()
    image(rMImg, menuVariables.M1X - 50, menuVariables.M1Y - 60, 100, 100)

}

function drawMenu2Choice() {
    push()
    noStroke()
    fill("darkgrey")
    ellipse(menuVariables.M2X, menuVariables.M2Y, menuVariables.size + 110)
    pop()
    push()
    noStroke()
    fill("black")
    ellipse(menuVariables.M2X, menuVariables.M2Y, menuVariables.size + 100)
    image(pMImg, menuVariables.M2X - 100, menuVariables.M2Y - 95, 200, 200)

}

function drawMenu3Choice() {
    push()
    noStroke()
    fill("darkgrey")
    ellipse(menuVariables.M3X, menuVariables.M3Y, menuVariables.size + 10)
    pop()
    push()
    noStroke()
    fill("black")
    ellipse(menuVariables.M3X, menuVariables.M3Y, menuVariables.size)
    image(sMImg, menuVariables.M3X - 70, menuVariables.M3Y - 75, 150, 150)
}

function drawMenuText() {

    push()
    noStroke()
    fill("white")
    textFont(funFont)
    textSize(100)
    text("Variation", 270, 150)
    pop()

    push()
    noStroke()
    fill("white")
    textFont(funFont)
    textSize(100)
    text("Jam", 800, 300)
    pop()
}
function drawSChoice() {
    push()
    noStroke()
    fill("palegreen")
    ellipse(gameOneChoiceVariables.SChoiceX, gameOneChoiceVariables.SChoiceY, gameOneChoiceVariables.SChoiceW)
    pop()

}

function drawRChoice() {
    push()
    noStroke()
    fill("palegreen")
    ellipse(gameOneChoiceVariables.RChoiceX, gameOneChoiceVariables.RChoiceY, gameOneChoiceVariables.RChoiceW)

}

function drawPChoice() {
    push()
    noStroke()
    fill("palegreen")
    ellipse(gameOneChoiceVariables.PChoiceX, gameOneChoiceVariables.PChoiceY, gameOneChoiceVariables.PChoiceW)
}

function drawTextChoice() {
    push()
    noStroke()
    fill("palegreen")
    textFont("BOLD")
    textSize(30)
    text("You See Three Choices, Two Could Mean Your Death.", 250, 700, 1200, 1200)
    pop()

    push()
    noStroke()
    fill("palegreen")
    textFont(funFont)
    textSize(30)
    text("rock", 145, 80)
    pop()

    push()
    noStroke()
    fill("palegreen")
    textFont(funFont)
    textSize(30)
    text("paper", 530, 80)
    pop()

    push()
    noStroke()
    fill("palegreen")
    textFont(funFont)
    textSize(30)
    text("scissors", 890, 80)
    pop()

}
function drawTimer() {
    push()
    noStroke()
    fill("palegreen")
    rect(600, gameOneVariables.timerY, 20,)
    pop()
}

function drawSecretTimer() {
    push()
    noStroke()
    fill("red")
    rect(600, gameOneVariables.timerYS, 20,)
    pop()
}
/**
 * every frame draws the scene
*/
function draw() {
    if (gameState === "Menu") {
        background('white');


        for (const particle of particles) {
            updateParticle(particle);
            drawParticle(particle);
        }
        drawMenu1Choice()
        drawMenu2Choice()
        drawMenu3Choice()
        drawMenuText()

    }
    if (gameState === "GameOne") {

        if (gameOneVariables.gameOneState === "Start") {
            gameStateMouse = "GameOne"
            background("black")
            drawSChoice()
            drawPChoice()
            drawRChoice()
            drawUser()

            for (const particle of particles) {
                updateParticle(particle);
                drawParticle(particle);
            }
            imageMode(CORNER);
            let imgSize
            image(rImg, 110, 200, imgSize, imgSize)
            image(pImg, 500, 200, imgSize, imgSize)
            image(sImg, 940, 200, imgSize, imgSize)
            drawTextChoice()
        }
        if (gameOneVariables.gameOneState === "Game") {

            background("black")
            drawSecretTimer()
            let timeS = 20
            gameOneVariables.timerYS += timeS
            drawTimer()
            let time = 40
            gameOneVariables.timerY -= time
            if (gameOneVariables.timerY > 0) {

                if (gameOneVariables.playerChoice === "Rock") {
                    image(rImg, 160, 300, 200, 200)
                }
                else if (gameOneVariables.playerChoice === "Paper") {
                    image(pImg, 160, 300, 200, 200)
                }
                else if (gameOneVariables.playerChoice === "Scissors") {
                    image(sImg, 160, 300, 200, 200)
                }
            }
            else {
                if (gameOneVariables.playerChoice === "Rock") {
                    image(rImg, 160, 300, 200, 200)
                }
                else if (gameOneVariables.playerChoice === "Paper") {
                    image(pImg, 160, 300, 200, 200)
                }
                else if (gameOneVariables.playerChoice === "Scissors") {
                    image(sImg, 160, 300, 200, 200)
                }

                if (!gameOneVariables.computerPicked) {
                    const c = random(0, 1)

                    if (c <= gameOneVariables.computerChance) {
                        gameOneVariables.computerChoice = "Rock"
                    }
                    else if (c <= gameOneVariables.computerChance * 2) {
                        gameOneVariables.computerChoice = "Paper"
                    }
                    else {
                        gameOneVariables.computerChoice = "Scissors"
                    }
                    gameOneVariables.computerPicked = true
                }

                if (gameOneVariables.computerChoice === "Rock") {
                    image(rImg, 960, 300, 200, 200)
                }
                else if (gameOneVariables.computerChoice === "Paper") {
                    image(pImg, 960, 300, 200, 200)
                }
                else if (gameOneVariables.computerChoice === "Scissors") {
                    image(sImg, 960, 300, 200, 200)
                }
            }
            if (gameOneVariables.timerYS > 800) {
                gameOneVariables.timerY = 810
                gameOneLoseLogic()
            }
        }
        if (gameOneVariables.gameOneState === "Lost") {
            background("red")
        }
        if (gameOneVariables.gameOneState === "Won") {
            background("green")
        }
    }




    if (gameState === "GameTwo") {

    }
    if (gameState === "GameThree") {

    }

    if (gameState === "Lost") {

    }



}

function updateParticle(particle) {
    if (gameState === "Menu") {
        let l = random(-10, 10)
        particle.x += particle.velocity.x * 0.1;
        particle.y += particle.velocity.y * 7;

        // Wrap if needed
        if (particle.x < 0) {
            particle.x = width;
        }
        else if (particle.x > width) {
            particle.x = 0;
        }
        if (particle.y < 0) {
            particle.y = height;
        }
        else if (particle.y > height) {
            particle.y = 0;
        }
    }
    if (gameState === "GameOne") {
        let l = random(-10, 10)
        particle.x += particle.velocity.x * 0.05;
        particle.y += particle.velocity.y * 0;

        // Wrap if needed
        if (particle.x < 0) {
            particle.x = width;
        }
        else if (particle.x > width) {
            particle.x = 0;
        }
        if (particle.y < 0) {
            particle.y = height;
        }
        else if (particle.y > height) {
            particle.y = 0;
        }
    }

}

function drawParticle(particle) {
    push();
    noStroke();
    let r = 200, g = 0, b = 0;
    if (gameState === 'Menu') {
        r = 0; g = 0; b = 24;
    } else if (gameState === 'GameOne') {
        if (gameOneVariables.gameOneState === 'Start') {
            r = 0; g = 0; b = 0;
        } else if (gameOneVariables.gameOneState === 'Game') {
            r = 0; g = 150; b = 200;
        }
    }
    fill(r, g, b, 200);
    ellipse(particle.x, particle.y, particle.size);
    pop();
}
function gameOneLoseLogic() {

    if (gameOneVariables.playerChoice === "Rock") {
        console.log(gameOneVariables.computerChoice)
        let newChoice = gameOneVariables.computerChoice
        if (newChoice === "Rock") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.computerChoice = undefined
        }
        if (newChoice === "Paper") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameOneVariables.gameOneState = "Lost"
        }
        if (newChoice === "Scissors") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameOneVariables.gameOneState = "Won"
        }
    }

    if (gameOneVariables.playerChoice === "Paper") {
        console.log(gameOneVariables.computerChoice)
        let newChoice = gameOneVariables.computerChoice

        if (newChoice === "Rock") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameOneVariables.gameOneState = "Won"
        }

        if (newChoice === "Paper") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.computerChoice = undefined
        }

        if (newChoice === "Scissors") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameOneVariables.gameOneState = "Lost"
        }

    }
    if (gameOneVariables.playerChoice === "Scissors") {
        console.log(gameOneVariables.computerChoice)
        let newChoice = gameOneVariables.computerChoice

        if (newChoice === "Rock") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameOneVariables.gameOneState = "Lost"
        }

        if (newChoice === "Paper") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameOneVariables.gameOneState = "Won"
        }

        if (newChoice === "Scissors") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.computerChoice = undefined
        }
    }
}

function mouseClicked() {
    if (gameStateMouse === "Menu") {
        const dToRockM = dist(menuVariables.M1X, menuVariables.M1Y, mouseX, mouseY);
        const dToPaperM = dist(menuVariables.M2X, menuVariables.M2Y, mouseX, mouseY)
        const dToScissorsM = dist(menuVariables.M3X, menuVariables.M3Y, mouseX, mouseY)

        const overRockM = (dToRockM < menuVariables.size / 2 + user.size / 2);
        const overPaperM = (dToPaperM < menuVariables.size + 100 / 2 + user.size / 2);
        const overScissorsM = (dToScissorsM < menuVariables.size / 2 + user.size / 2)

        if (overRockM) {
            gameOneVariables.gameOneState = "Start"
            gameState = "GameOne"
        }
        else if (overPaperM) {
            gameState = "GameOne"
        }
        else if (overScissorsM) {
            gameState = "GameOne"
        }
    }

    if (gameStateMouse === "GameOne") {
        const dToRock = dist(gameOneChoiceVariables.RChoiceX, gameOneChoiceVariables.RChoiceY, mouseX, mouseY);
        const dToPaper = dist(gameOneChoiceVariables.PChoiceX, gameOneChoiceVariables.PChoiceY, mouseX, mouseY)
        const dToScissors = dist(gameOneChoiceVariables.SChoiceX, gameOneChoiceVariables.SChoiceY, mouseX, mouseY)


        const overRock = (dToRock < gameOneChoiceVariables.RChoiceW / 2 + user.size / 2);
        const overPaper = (dToPaper < gameOneChoiceVariables.PChoiceW / 2 + user.size / 2);
        const overScissors = (dToScissors < gameOneChoiceVariables.SChoiceW / 2 + user.size / 2)
        if (overRock) {
            gameOneVariables.playerChoice = "Rock"
            gameOneVariables.gameOneState = "Game"
        }
        else if (overPaper) {
            gameOneVariables.playerChoice = "Paper"
            gameOneVariables.gameOneState = "Game"
        }
        else if (overScissors) {
            gameOneVariables.playerChoice = "Scissors"
            gameOneVariables.gameOneState = "Game"
        }
    }

}

