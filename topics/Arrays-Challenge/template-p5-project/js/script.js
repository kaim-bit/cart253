/**
 * Boingo
 * Pippin Barr
 * edited by kai, benedict
 * A ball that bounces around on the canvas
 */



/**
 * Create the canvas and the ball
 */

const ballS = [];
function setup() {
    // Create the canvas
    createCanvas(400, 400);
    // Create the ball
    for (let r = 0; r < 10; r++) {
        let ball = createBall(200, 200);
        ballS.push(ball);
    }
    frameRate(1)

}

/**
 * Creates a random ball
 */
function createBall(x, y,) {
    // Create a ball object with appropriate properties
    const direction = {
        x: mouseX + pmouseX,
        y: mouseY + pmouseY,
    }
    const newBall = {
        // Position and dimensions

        x: x,
        y: y,
        size: 10,
        // Colour
        fill: "#000000",
        // Movement
        velocity: {
            x: direction.x,
            y: direction.y
        }
    };
    return newBall;
}

/**
 * Moves and draws the ball
 */
function draw() {

    background("#87ceeb");
    for (let i = 0; i < ballS.length; i++) {
        moveBall(ballS[i]);
        bounceBall(ballS[i]);
        drawBall(ballS[i]);
    }

    let ball = createBall(mouseX, mouseY);
    console.log(pmouseX, pmouseY, mouseX, mouseY)
    console.log(ball)
    ballS.push(ball);
}

/**
 * Moves the ball according to its velocity
 */
function moveBall(ball) {
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function bounceBall(ball) {
    // Check if the ball has reached the left or right
    const bounceX = (ball.x > width || ball.x < 0);
    // Check if the ball has reached the top or bottom
    const bounceY = (ball.y > height || ball.y < 0);

    // Handle bouncing horizontally
    if (bounceX) {
        ball.velocity.x *= -1;
        ball.fill = color(random(255), random(255), random(255));
    }
    // Handle bouncing vertically
    if (bounceY) {
        ball.velocity.y *= -1;
        ball.fill = color(random(255), random(255), random(255));
    }
}

/**
 * Draw the ball on the canvas
 */
function drawBall(ball) {
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.size);
    pop();
}

function mousePressed() {
    createBall(mouseX, mouseY);
    for (let i = 0; i < 1000; i++) {
        let ball = createBall(mouseX, mouseY);
        ballS.push(ball);
    }

}