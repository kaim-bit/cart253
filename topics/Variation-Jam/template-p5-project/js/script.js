/**
 * Variation Jam
 * Kai Maquivar
 * 
 * This is a Rock paper scissors theme varation, the first game being the original, second being..., third being...
 */

"use strict";
// main game state
let gameState = "Menu"
// mouse state so no "double click"
let gameStateMouse = "Menu"
// randomized color variable for the win state, done like this so it will only happen once each win
let winColor;
//particle array
const particles = []

//funny lines for game three question randomization
const questionLibrary = {
    //first part
    questionTextA: [
        "mr pippin hates people, so he collects rocks to be his friends, so he collects",
        "kai is so strong and muscular, if he picked up",
        "pippin sadly has no one to talk to, he collects rocks as a hobby to cope with this, so he grabs",
        "pippin walks into a bar, he buys",
        "mr kai decides its time steal mr pippins rock friends, he steals",
        "pippin wants to load up on rocks to throw at everyone that cares about him, so he grabs",
        "pippin decides its best to go to rock rehab, but he doesnt want to cold turkey it so as a final hoorah he decides to grab",
        "Kai has had enough of this assignment, he wants to collect rocks instead so he grabs",
    ],
    //second part
    questionTextB: [
        "rocks, then he sadly picks up",
        "rocks, even though he hates himself, he picks up",
        "rocks, he decides its best to stock some more for later so he grabs",
        "rocks, he NEEDS more... so he grabs",
        "rocks, he sobs as he grabs",
        "rocks, even though his partner is BEGGING him not to, he grabs",
        "rocks, he really wants to stop but he picks up"
    ],
    endQuestionText: "more, how many rocks does he have?"
}


// the users mouse
const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 10,
    fill: "#000000"
}
// the scissor, bad name but it makes sense if you think about it
const paperPlayer = {
    moveX: 0,
    stepX: 100,
    moveY: 0,
    stepY: 100,
    x: 100,
    y: 100,
    size: 50,
}
// the paper that the paper player eats, i called it food because originally it was eating it
const paperFood = {
    x: 2000,
    y: 2000,
    size: 50,
}
// the poison for the paper player
const paperPoison = {
    poisonCount: [],
    size: 50,
}
// menu variables
const menuVariables = {
    //menu button variables
    M1X: 200,
    M2X: 600,
    M3X: 1000,
    infoX: 50,
    returnX: 1150,


    M1Y: 200,
    M2Y: 200,
    M3Y: 200,
    infoY: 50,
    returnY: 50,


    size: 150,
}
//variables for game one
const gameOneVariables = {
    //state for inside the game for the selection feature
    gameOneState: "Start",
    playerChoice: undefined, // decided when player clicks on obj
    computerChoice: undefined, // not decided yet
    computerChance: 0.33,
    timerSpeed: -50,
    timerY: 810,
    timerYS: -810,
    computerPicked: false
}
// variables for game two
const gameTwoVariables = {
    score: 0,
    eaten: false,

}
//variables for game three
const gameThreeVariables = {
    score: 0,
    question: "",
    correctAnswer: 0,
    playerInput: ""
}

// like the menu variables, the buttons for the game one choice between rock paper and scissors
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

// all the items for the pre load
let gameTwoBackround
let foodImg
let poisonImg
let rMImg
let pMImg
let sMImg
let rImg
let pImg
let sImg
let funFont
let coolFont
let gameThreeBackround

/**
 * loads the images and fonts before use
 */
function preload() {

    coolFont = loadFont('assets/JellyjampersonaluseBold-Rpjev.otf')
    funFont = loadFont('assets/Extracalories-rgx88.otf')
    gameThreeBackround = loadImage('assets/images/gameThreeBackround.png')
    rImg = loadImage('assets/images/rock.png')
    pImg = loadImage('assets/images/paper.png')
    sImg = loadImage('assets/images/scissors.png')
    rMImg = loadImage('assets/images/rockmenu.png')
    pMImg = loadImage('assets/images/papermenu.png')
    sMImg = loadImage('assets/images/scissorsM.png')
    poisonImg = loadImage('assets/images/paperPoison.png')
    foodImg = loadImage('assets/images/foodpaper.png')
    gameTwoBackround = loadImage('assets/images/backroundforpaper.png')

}

/**
 * sets up all things needed for game to run smoothly
*/
function setup() {
    frameRate(60)
    createCanvas(1200, 800)

    for (let i = 0; i < 5000; i++) {
        // Create a particle
        const particle = createParticle()
        // Add it to the array
        particles.push(particle)
    }

}
/**
 * creates the particles
 */
function createParticle() {
    // some states have diffrent effects so that is handled here
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
        }
        return newParticle
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
        }
        return newParticle
    }


}
/**
 * draws a cursor used for the selection of buttons
 */
function drawUser() {
    user.x = mouseX
    user.y = mouseY
    push()
    noStroke()
    fill("black")
    ellipse(user.x, user.y, user.size)
}
/**
 * menu choice for rock game
 */
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
/**
 * menu choice for the paper game
 */
function drawMenu2Choice() {
    push()
    noStroke()
    fill("darkgrey")
    ellipse(menuVariables.M2X, menuVariables.M2Y, menuVariables.size + 10)
    pop()
    push()
    noStroke()
    fill("black")
    ellipse(menuVariables.M2X, menuVariables.M2Y, menuVariables.size)
    image(pMImg, menuVariables.M2X - 65, menuVariables.M2Y - 65, 130, 130)

}
/**
 * menu choice for the scissor game
 */
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
/**
 * menu choice for the Instructions
 */
function drawMenuInfoChoice() {
    push()
    noStroke()
    fill("darkgrey")
    ellipse(menuVariables.infoX, menuVariables.infoY, menuVariables.size - 70)
    pop()
    push()
    noStroke()
    fill("black")
    ellipse(menuVariables.infoX, menuVariables.infoY, menuVariables.size - 75)
    textSize(20)
    textFont(coolFont)
    fill("white")
    text("Info", menuVariables.infoX - 20, menuVariables.infoY + 5)
}
/**
 * the text for the menu
 */
function drawMenuText() {

    push()
    noStroke()
    fill("white")
    textFont(funFont)
    textSize(90)
    text("Variation Jam", 25, 500)
    pop()
}
/**
 * all of the instructions with the corresponding images
 */
function drawInstructions() {

    image(rMImg, 40, 40, 150, 150)
    push()
    noStroke()
    fill("orange")
    textFont(coolFont)
    textSize(20)
    text("Just your normal rock paper scissors game, select your option and pray the odds are in your favor, if not, no worries just try again.", 300, 125, 800, 800)
    pop()

    image(pMImg, 35, 300, 150, 150)
    push()
    noStroke()
    fill("orange")
    textFont(coolFont)
    textSize(20)
    text("Just a boring old test, about rocks and scissors, answer ten and i will call it a day", 300, 350, 800, 800)
    pop()

    image(sMImg, 40, 600, 150, 150)
    push()
    noStroke()
    fill("orange")
    textFont(coolFont)
    textSize(20)
    text("you are assigned to cut twenty pieces of paper, be careful because you need to make sure not to hit the rocks", 300, 650, 800, 800)
    pop()

}
/**
 * draws the win state stuff
 */
function drawWin() {
    push()
    noStroke()
    fill("orange")
    textFont(coolFont)
    textSize(100)
    text("You Won", 390, 300)
    pop()
}
/**
 * draws the lose state stuff
 */
function drawLose() {
    push()
    noStroke()
    fill("white")
    textFont(coolFont)
    textSize(100)
    text("you lost...", 380, 300)
    pop()
}
/**
 * draws the return button to go back to the menu
 */
function drawMenuButton() {
    push()
    noStroke()
    fill("grey")
    ellipse(menuVariables.returnX, menuVariables.returnY, menuVariables.size - 70)
    pop()
    push()
    noStroke()
    fill("black")
    ellipse(menuVariables.returnX, menuVariables.returnY, menuVariables.size - 72)
    pop()
    push()
    noStroke()
    fill("white")
    textFont(coolFont)
    textSize(18)
    text("Return", menuVariables.returnX - 35, menuVariables.returnY + 5, 800, 800)
    pop()
}
/**
 * draws the scissor choice for the game one selection
 */
function drawSChoice() {
    push()
    noStroke()
    fill("palegreen")
    ellipse(gameOneChoiceVariables.SChoiceX, gameOneChoiceVariables.SChoiceY, gameOneChoiceVariables.SChoiceW)
    pop()

}
/**
 * draws the rock choice for the game one selection
 */
function drawRChoice() {
    push()
    noStroke()
    fill("palegreen")
    ellipse(gameOneChoiceVariables.RChoiceX, gameOneChoiceVariables.RChoiceY, gameOneChoiceVariables.RChoiceW)

}
/**
 * draws the paper choice for the game one selection
 */
function drawPChoice() {
    push()
    noStroke()
    fill("palegreen")
    ellipse(gameOneChoiceVariables.PChoiceX, gameOneChoiceVariables.PChoiceY, gameOneChoiceVariables.PChoiceW)
}
/**
 * draws the text for the game one choice selection 
 */
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
/**
 * draws the timer block for the computer choice to be seen
 */
function drawTimer() {
    push()
    noStroke()
    fill("palegreen")
    rect(600, gameOneVariables.timerY, 20,)
    pop()
}
/**
 *  draws the timer that decides if its a win or lose
 */
function drawSecretTimer() {
    push()
    noStroke()
    fill("red")
    rect(600, gameOneVariables.timerYS, 20,)
    pop()
}
/**
 * draws the scissor boy for the paper game
 */
function drawPaperPlayer() {
    push()
    noStroke()
    fill("red")
    ellipse(paperPlayer.x, paperPlayer.y, paperPlayer.size - 49)
    image(sMImg, paperPlayer.x - 25, paperPlayer.y - 25, 50, 50)
    pop()
}
/**
 * draws the paper for the scissor in the paper game
 */
function drawFood() {
    push()
    noStroke()
    fill("white")
    ellipse(paperFood.x, paperFood.y, paperFood.size - 49)
    image(foodImg, paperFood.x - 25, paperFood.y - 25, 50, 50)
    pop()
}
/**
 * draws the evil paper(poison) for the scissor in the paper game
 */
function drawPoison() {
    for (let i = 0; i < paperPoison.poisonCount.length; i++) {
        let paperP = paperPoison.poisonCount[i]
        push()
        noStroke()
        fill("orange")
        ellipse(paperP.x, paperP.y, paperPoison.size - 49)
        image(poisonImg, paperP.x - 25, paperP.y - 25, 50, 50)
        pop()
    }
}


/**
 * every frame draws the scene
*/
function draw() {
    /**
     * the menu state of the game
     */
    if (gameState === "Menu") {
        gameStateMouse = "Menu"
        background('white')

        // makes the particles
        for (const particle of particles) {
            updateParticle(particle)
            drawParticle(particle)
        }
        drawMenu1Choice()
        drawMenu2Choice()
        drawMenu3Choice()
        drawMenuInfoChoice()
        drawMenuText()

    }
    /**
     * the rock game state
     */
    if (gameState === "GameOne") {

        if (gameOneVariables.gameOneState === "Start") {
            //changes the state of the mouse to select the choices
            gameStateMouse = "GameOne"
            background("black")
            drawSChoice()
            drawPChoice()
            drawRChoice()
            drawUser()
            // makes the particles
            for (const particle of particles) {
                updateParticle(particle)
                drawParticle(particle)
            }
            imageMode(CORNER)
            let imgSize
            //adds the images over the choices
            image(rImg, 110, 200, imgSize, imgSize)
            image(pImg, 500, 200, imgSize, imgSize)
            image(sImg, 940, 200, imgSize, imgSize)
            drawTextChoice()
        }
        /**
     * the game state inside of the rock game after selection
     */
        if (gameOneVariables.gameOneState === "Game") {

            background("black")
            // makes timers and tick rate
            drawSecretTimer()
            let timeS = 20
            gameOneVariables.timerYS += timeS
            drawTimer()
            let time = 40
            gameOneVariables.timerY -= time
            //if timer ends
            if (gameOneVariables.timerY > 0) {
                //logic for the showing of player choice
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
                /**
* checks to see if computer picked and if not does -
*/
                if (!gameOneVariables.computerPicked) {
                    const c = random(0, 1)
                    // computer choice generater
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
                // shows the coputer choice after the first timer
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
            //resets
            if (gameOneVariables.timerYS > 800) {
                gameOneVariables.timerY = 810
                gameOneLoseLogic()
            }
        }
    }



    /**
   * the scissor game state of the game
   */
    if (gameState === "GameTwo") {
        background("black")
        image(gameTwoBackround, 0, 0, 1200, 800)
        scoreCount()
        checkPoisonTouch()
        eatPaperLogic()
        drawFood()
        drawPoison()
        spawnFood()
        spawnPoison()
        drawPaperPlayer()


    }
    /**
  * the paper game state of the game
  */
    if (gameState === "GameThree") {
        background("black")
        image(gameThreeBackround, 0, 0, 1200, 800)
        fill("black")
        textFont(BOLD)

        //draws the questions
        text(gameThreeVariables.question, 375, height / 2 - 50, 500, 500)
        text(gameThreeVariables.playerInput, width / 2, height / 2 + 40)
    }
    /**
  * the loser state of the game
  */
    if (gameState === "Lost") {
        background("black")
        for (const particle of particles) {
            updateParticle(particle)
            drawParticle(particle)
        }
        drawLose()
        drawMenuButton()
    }
    /**
     * the winner state of the game
     */
    if (gameState === "Won") {

        background(winColor.r, winColor.g, winColor.b)
        for (const particle of particles) {
            updateParticle(particle)
            drawParticle(particle)
        }
        drawWin()
        drawMenuButton()
    }
    /**
     * the instruction state of the game
     */
    if (gameState === "Instructions") {
        background("red")
        for (const particle of particles) {
            updateParticle(particle)
            drawParticle(particle)
        }
        drawInstructions()
        drawMenuButton()
    }



}
/**
  * sets up the win state and also is how to access the win state
  */
function GameWon() {
    //randomizes the colors of the win state
    winColor = {
        r: int(random(0, 255)),
        g: int(random(0, 255)),
        b: int(random(0, 255)),

        particleR: int(random(0, 255)),
        particleG: int(random(0, 255)),
        particleB: int(random(0, 255)),
    }
    gameState = "Won"
    gameStateMouse = "Menu"
}
/**
  * updates the particles of movement in certain ways depending of what state the players in, your water code that i used
  */
function updateParticle(particle) {
    if (gameState === "Menu") {
        let l = random(-10, 10)
        particle.x += particle.velocity.x * 0.1
        particle.y += particle.velocity.y * 7

        // Wrap if needed
        if (particle.x < 0) {
            particle.x = width
        }
        else if (particle.x > width) {
            particle.x = 0
        }
        if (particle.y < 0) {
            particle.y = height
        }
        else if (particle.y > height) {
            particle.y = 0
        }
    }
    else if (gameState === "GameOne") {
        let l = random(-10, 10)
        particle.x += particle.velocity.x * 0.05
        particle.y += particle.velocity.y * 0

        // Wrap if needed
        if (particle.x < 0) {
            particle.x = width
        }
        else if (particle.x > width) {
            particle.x = 0
        }
        if (particle.y < 0) {
            particle.y = height
        }
        else if (particle.y > height) {
            particle.y = 0
        }

    }
    else if (gameState === "Instructions") {
        let l = random(-10, 10)
        particle.x += particle.velocity.x * -2
        particle.y += particle.velocity.y * 5

        // Wrap if needed
        if (particle.x < 20) {
            particle.x = width
        }
        else if (particle.x > width) {
            particle.x = 0
        }
        if (particle.y < 0) {
            particle.y = height
        }
        else if (particle.y > height) {
            particle.y = 0
        }


    }
    else if (gameState === "Won") {
        let l = random(-2, 2)
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y


        if (particle.x < 0) {
            particle.x = width
        }
        else if (particle.x > width) {
            particle.x = 0
        }
        if (particle.y < 0) {
            particle.y = height
        }
        else if (particle.y > height) {
            particle.y = 0
        }
    }
    else if (gameState === "Lost") {
        let l = random(-2, 2)
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        if (particle.x < 0) {
            particle.x = width
        }
        else if (particle.x > width) {
            particle.x = 0

            if (particle.y < 0) {
                particle.y = height
            }
            else if (particle.y > height) {
                particle.y = 0
            }
        }
    }
}
/**
  * draws the particle, diffrent in diffrent states of the game
  */
function drawParticle(particle) {
    push()
    noStroke()
    let r = 0
    let g = 0
    let b = 0
    if (gameState === "Menu") {
        r = 0
        g = 0
        b = 24
    } else if (gameState === "GameOne") {
        if (gameOneVariables.gameOneState === "Start") {
            r = 0
            g = 0
            b = 0
        } else if (gameOneVariables.gameOneState === "Game") {
            r = 0
            g = 150
            b = 200
        }
    }
    else if (gameState === "Instructions") {
        r = 0
        g = 0
        b = 24
        particle.size = random(2, 100)
    }
    else if (gameState === "Won") {
        r = winColor.particleR
        g = winColor.particleG
        b = winColor.particleR
        particle.size = random(2, 50)
    }
    else if (gameState === "Lost") {
        r = 200
        g = 0
        b = 0
        particle.size = random(2, 10)
    }
    fill(r, g, b, 200)
    ellipse(particle.x, particle.y, particle.size)
    pop()
}
/**
  * manages the start of the scissor
  */
function startGameThree() {
    gameThreeVariables.score = 0
    generateQuestion()
    gameState = "GameThree"
}
/**
  * generates the questions for paper game(gameThree)
  */
function generateQuestion() {
    // pick two random numbers for the actual math question
    let a = int(random(1, 10))
    let b = int(random(1, 10))

    //had to look up how to do this but o boy was it worth it, makes it basically mesh to create a big question
    let fragmentA = questionLibrary.questionTextA[
        int(random(questionLibrary.questionTextA.length))
    ]

    let fragmentB = questionLibrary.questionTextB[
        int(random(questionLibrary.questionTextB.length))
    ]
    //combines the fragments and numbers to make a amazing question
    gameThreeVariables.question = `${fragmentA} ${a} ${fragmentB} ${b} ${questionLibrary.endQuestionText}` // had to look up how to do this, so worth it

    gameThreeVariables.correctAnswer = a + b

    gameThreeVariables.playerInput = ""
}
/**
  * counts and displays the score for the scissor game (gameTwo), also manages win condition
  */
function scoreCount() {
    if (gameTwoVariables.score >= 20) {
        GameWon()
    }
    push()
    noStroke()
    fill("black")
    textFont("BOLD")
    textSize(30)
    text(gameTwoVariables.score + "/20", 1100, 15, 1200, 1200)
    pop()
}
/**
  * key detections, handles what happens if keys are pressed
  */
function keyPressed() {

    if (keyCode === BACKSPACE) {
        gameThreeVariables.playerInput = gameThreeVariables.playerInput.slice(0, -1)
        return
    }

    if (keyCode === ENTER) {

        if (int(gameThreeVariables.playerInput) === gameThreeVariables.correctAnswer) {
            gameThreeVariables.score += 1

            if (gameThreeVariables.score >= 10) {
                GameWon()
                return
            }

            generateQuestion() // makes the next problem
        } else {
            gameState = "Lost"
        }

        return
    }
    // keys 0-9 detection
    if (key >= '0' && key <= '9') {
        gameThreeVariables.playerInput += key
    }


    if (key === 'w' && paperPlayer.y > 100) {
        paperPlayer.y -= 100
    }
    if (key === 's' && paperPlayer.y < 700) {
        paperPlayer.y += 100
    }
    if (key === 'a' && paperPlayer.x > 100) {
        paperPlayer.x -= 100
    }
    if (key === 'd' && paperPlayer.x < 1100) {
        paperPlayer.x += 100
    }
}

/**
  * spawns the paper for the scissor man to "eat" in random spots
  */
function spawnFood() {
    let spawnPosX
    let spawnPosY
    if (paperFood.y === 2000) {
        spawnPosX = int(random(1, 11))
        spawnPosY = int(random(1, 8))
        paperFood.x = 100 * spawnPosX
        paperFood.y = 100 * spawnPosY
    }
}
/**
  * spawns the poison in a random spot for the scissor boy to avoid
  */
function spawnPoison() {
    let spawnPosX = int(random(1, 11))
    let spawnPosY = int(random(1, 8))
    if (gameTwoVariables.eaten) {
        paperPoison.poisonCount.push({
            x: 100 * spawnPosX,
            y: 100 * spawnPosY
        })
        gameTwoVariables.eaten = false
    }


    /**
  * handles the game one losing conditions
  */
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
            gameStateMouse = "Menu"
            gameState = "Lost"
        }
        if (newChoice === "Scissors") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            GameWon()
        }
    }

    if (gameOneVariables.playerChoice === "Paper") {
        console.log(gameOneVariables.computerChoice)
        let newChoice = gameOneVariables.computerChoice

        if (newChoice === "Rock") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            GameWon()
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
            gameStateMouse = "Menu"
            gameState = "Lost"
        }

    }
    if (gameOneVariables.playerChoice === "Scissors") {
        console.log(gameOneVariables.computerChoice)
        let newChoice = gameOneVariables.computerChoice

        if (newChoice === "Rock") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            gameStateMouse = "Menu"
            gameState = "Lost"
        }

        if (newChoice === "Paper") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.playerChoice = undefined
            GameWon()
        }

        if (newChoice === "Scissors") {
            gameOneVariables.timerYS = -410
            gameOneVariables.computerPicked = false
            gameOneVariables.computerChoice = undefined
        }
    }
}
/**
  * stops paper food from spawning inside of the paper poison
  */
function spawnFoodSafely() {
    let spawnPosX
    let spawnPosY
    let safe = false

    if (!safe) {
        spawnPosX = int(random(1, 11))
        spawnPosY = int(random(1, 7))

        paperFood.x = 100 * spawnPosX
        paperFood.y = 100 * spawnPosY

        safe = true
        for (let i = 0; i < paperPoison.poisonCount.length; i++) {
            const p = paperPoison.poisonCount[i]
            const d = dist(p.x, p.y, paperFood.x, paperFood.y)
            if (d < paperFood.size / 2 + paperPoison.size / 2) {
                safe = false
                break // looked up a vid for this guy.. heh
            }
        }
    }
}
/**
  * checks if the player ever touches poison and what happens if they do
  */
function checkPoisonTouch() {
    for (let i = 0; i < paperPoison.poisonCount.length; i++) {
        const p = paperPoison.poisonCount[i]

        const c = dist(paperPlayer.x, paperPlayer.y, p.x, p.y)
        const touchingPoison = c < (paperPlayer.size / 2 + paperPoison.size / 2)

        if (touchingPoison) {
            paperPlayer.x = 100
            paperPlayer.y = 100
            gameTwoVariables.score = 0
            paperPoison.poisonCount = []
            gameState = "Lost"
        }
    }
}
/**
  * handles what happens if player touches paper food
  */
function eatPaperLogic() {
    const dToFood = dist(paperPlayer.x, paperPlayer.y, paperFood.x, paperFood.y)
    const overFood = (dToFood < paperPlayer.size / 2 + paperFood.size / 2)

    if (overFood) {
        gameTwoVariables.score += 1
        gameTwoVariables.eaten = true
        spawnFoodSafely()
    }

    for (let i = 0; i < paperPoison.poisonCount.length; i++) {
        const p = paperPoison.poisonCount[i]
        const dToPoison = dist(p.x, p.y, paperFood.x, paperFood.y)
        const foodOverPoison = (dToPoison < paperFood.size / 2 + paperPoison.size / 2)

        if (foodOverPoison) {
            let spawnPosX = int(random(1, 11))
            let spawnPosY = int(random(1, 8))

            paperFood.x = 100 * spawnPosX
            paperFood.y = 100 * spawnPosY
        }
    }
}
/**
  * all button detection seperated for states of the game
  */
function mouseClicked() {
    if (gameStateMouse === "Menu") {
        const dToRockM = dist(menuVariables.M1X, menuVariables.M1Y, mouseX, mouseY)
        const dToPaperM = dist(menuVariables.M2X, menuVariables.M2Y, mouseX, mouseY)
        const dToScissorsM = dist(menuVariables.M3X, menuVariables.M3Y, mouseX, mouseY)
        const dToInstructions = dist(menuVariables.infoX, menuVariables.infoY, mouseX, mouseY)
        const dToMenuButton = dist(menuVariables.returnX, menuVariables.returnY, mouseX, mouseY)

        const overRockM = (dToRockM < menuVariables.size / 2 + user.size / 2)
        const overPaperM = (dToPaperM < menuVariables.size + 100 / 2 + user.size / 2)
        const overScissorsM = (dToScissorsM < menuVariables.size / 2 + user.size / 2)
        const overInstructions = (dToInstructions < menuVariables.size - 70 / 2 + user.size / 2)
        const overMenuButton = (dToMenuButton < menuVariables.size - 70 / 2 + user.size / 2)

        if (overRockM) {
            gameOneVariables.gameOneState = "Start"
            gameState = "GameOne"
        }
        else if (overPaperM) {
            startGameThree()
        }
        else if (overScissorsM) {
            gameState = "GameTwo"
        }
        else if (overInstructions) {
            gameState = "Instructions"
        }
        else if (overMenuButton) {
            gameState = "Menu"
        }
    }

    if (gameStateMouse === "GameOne") {
        const dToRock = dist(gameOneChoiceVariables.RChoiceX, gameOneChoiceVariables.RChoiceY, mouseX, mouseY)
        const dToPaper = dist(gameOneChoiceVariables.PChoiceX, gameOneChoiceVariables.PChoiceY, mouseX, mouseY)
        const dToScissors = dist(gameOneChoiceVariables.SChoiceX, gameOneChoiceVariables.SChoiceY, mouseX, mouseY)


        const overRock = (dToRock < gameOneChoiceVariables.RChoiceW / 2 + user.size / 2)
        const overPaper = (dToPaper < gameOneChoiceVariables.PChoiceW / 2 + user.size / 2)
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

