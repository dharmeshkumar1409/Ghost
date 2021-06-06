var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ghost, ghostImg;
var spikes, spikesImg;
var bg, bgImage;

var score = 0;

var spikegroup;
var gameOver, restart;

function preload() {
    ghostImg = loadImage("ghost.png");
    spikesImg = loadImage("spikes.png");
    bgImg = loadImage("bg.jpg");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(1000, 400);

    bg = createSprite(750, 400, 20, 20);
    bg.addImage(bgImg);
    bg.scale = 1.5;
    bg.velocityX = -5;

    ghost = createSprite(250, 250, 50, 50);
    ghost.addImage(ghostImg);
    ghost.scale = 0.07;
    camera.position.x = 500;
    camera.position.y = 200;
    // ghost.debug = true;
    ghost.setCollider("circle", 100, 5, 950);

    spikeGroup = createGroup();

    gameOver = createSprite(550, 200);
    gameOver.addImage(gameOverImg);

    restart = createSprite(550, 350);
    restart.addImage(restartImg);

    gameOver.scale = 1;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

}

function draw() {
    background("grey");

    if (gameState === PLAY) {
        bg.velocityX = -(6 + 4 * score / 10);

        if (bg.x < 0) {
            bg.x = bg.width / 2;
        }

        if (keyDown(UP_ARROW) && ghost.y >= 90) {
            ghost.y -= 20;
        }

        if (keyDown(DOWN_ARROW) && ghost.y <= 310) {
            ghost.y += 20;
        }

        if (ghost.isTouching(spikeGroup)) {
            gameState = END;
        }
        score += Math.round(frameCount % 60 === 0);
        spawnSpikes();
    } else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        bg.velocityX = 0;
        spikeGroup.setVelocityXEach(0);
        spikeGroup.setLifetimeEach(-1);

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    drawSprites();

    fill("white");
    textSize(30);
    text("Score : " + score, 750, 50);

}

function spawnSpikes() {
    if (frameCount % 60 === 0) {
        spikes = createSprite(1200, 40, 50, 50);
        spikes.addImage(spikesImg);
        spikes.scale = 0.17;
        // spikes.debug = true;
        spikes.setCollider("circle", 0, 0, 380);
        spikes.velocityX = -5;
        spikes.y = Math.round(random(20, 350));
        spikes.velocityX = -(6 + 5 * score / 10);
        spikes.lifetime = 300;
        spikeGroup.add(spikes);
    }
}

function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    spikeGroup.destroyEach();

    score = 0;

}