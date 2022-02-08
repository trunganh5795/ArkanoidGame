import { Size, Vector } from './types';
// Start here
import BALL_IMAGE from './images/ball.png';
import PADDLE_IMAGE from './images/paddle.png';
import {
    PADDLE_HEIGHT,
    PADDLE_SPEED,
    PADDLE_STARTX,
    PADDLE_WIDTH,
    BALL_STARTX,
    BALL_STARTY,
    BALL_SPEED,
    BALL_SIZE,
    LEVEL,
    BRICK_IMAGES,
    BRICK_WIDTH,
    BRICK_HEIGHT,
    BRICK_ENERGY,
    STAGE_COLS,
    BRICK_PADDING,
} from './setup';
import { Paddle } from './sprites/Paddle';
import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { CollisionChecker } from './collisionChecker';
let btn = document.getElementById("start");
let info = document.getElementById("info");
let levelDisplay = document.getElementById("level");
let scoreDisplay = document.getElementById("score");
let button: HTMLButtonElement | null = document.getElementById("start") as HTMLButtonElement;
const view = new CanvasView();
let brickPos = (index: number): Vector => {
    let x = (index % STAGE_COLS) * BRICK_WIDTH + ((index + 1) % STAGE_COLS) * BRICK_PADDING;
    let y = (Math.floor(index / STAGE_COLS)) * (BRICK_PADDING + BRICK_HEIGHT);
    return { x, y };
}
let createBricks = (level: number): Brick[] => {
    let renderList = LEVEL[level - 1].reduce((brickList: Brick[], item: number, index: number) => {
        if (item === 0) return brickList;
        return [...brickList,
        new Brick(
            BRICK_IMAGES[item],
            brickPos(index)
            ,
            {
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT
            },
            BRICK_ENERGY[item]
        )
        ]
    }, [])

    return renderList
}
let gameRender = (
    context: CanvasView,
    paddle: Paddle,
    ball: Ball,
    brickList: Brick[],
    collisonCheck: CollisionChecker,
    level: number
): void => {
    context.clearCanvas();
    context.drawStuff(paddle);
    context.drawStuff(ball)
    context.drawBrick(brickList)
    let ballCheckCollision = collisonCheck.collisionBallWithWall(ball, paddle, PADDLE_HEIGHT, PADDLE_WIDTH)
    ball.makeMove();
    collisonCheck.collisitonPaddleWithWall(paddle, context);
    collisonCheck.collisionBallWithBrickList(ball, brickList, context)


    if (ballCheckCollision) {
        if (context.checkLoose(ball)) return;
    }
    if (context.checkWin(brickList)) {
        if (level < LEVEL.length) {
            level += 1;
            brickList = createBricks(level);
            ball.setPos({ x: BALL_STARTX, y: BALL_STARTY });
            ball.setSpeed({ x: BALL_SPEED, y: -BALL_SPEED });
            let levelDisplay = document.getElementById("level")
            if (levelDisplay && info) {
                levelDisplay.innerHTML = `Level ${level}/5`
                info.innerHTML = `Press Play`
            }
        } else {
            return
        }

    };
    requestAnimationFrame(() => { gameRender(context, paddle, ball, brickList, collisonCheck, level) })
}
let gameStart = (context: CanvasView) => {

    if (btn && info && levelDisplay && scoreDisplay) {
        btn.innerHTML = "Play Again";
        info.innerHTML = "Press Play";
        levelDisplay.innerHTML = `Level 1/5`;
        scoreDisplay.innerHTML = "0"
    }
    let paddle = new Paddle(
        {
            x: PADDLE_SPEED,
            y: PADDLE_SPEED
        },
        PADDLE_IMAGE,
        {
            x: PADDLE_STARTX,
            y: context.getCanvas.height - PADDLE_HEIGHT
        },
        {
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
        }
    )
    let ball = new Ball(
        {
            x: BALL_SPEED,
            y: -BALL_SPEED
        },
        BALL_IMAGE,
        {
            x: BALL_STARTX,
            y: BALL_STARTY
        },
        {
            width: BALL_SIZE,
            height: BALL_SIZE
        }
    )
    let brickList = createBricks(1);
    let collisonCheck = new CollisionChecker({ width: context.getCanvas.width, height: context.getCanvas.height })
    gameRender(context, paddle, ball, brickList, collisonCheck, 1);
}

button.addEventListener("click", () => {
    gameStart(view);
})