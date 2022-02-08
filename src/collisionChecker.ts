import { BALL_SIZE, BALL_SPEED, BRICK_HEIGHT, BRICK_IMAGES, BRICK_WIDTH, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_WIDTH } from "./setup";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Size } from "./types";
import { CanvasView } from "./view/CanvasView";

export class CollisionChecker {
    private wallSize: Size;
    constructor(wallSize: Size) {
        this.wallSize = wallSize;
    }
    collisionBallWithWall(ball: Ball, paddle: Paddle, paddleHeight: number, paddleWidth: number): boolean {
        if (ball.getPos.x + BALL_SIZE < this.wallSize.width
            && ball.getPos.x > 0
            && ball.getPos.y > 0
            && ball.getPos.y < this.wallSize.height
        ) {
            this.collisionBallWithPaddle(ball, paddle, paddleHeight, paddleWidth)

            return false
        } else {
            if (ball.getPos.x >= this.wallSize.width
                || ball.getPos.x <= 0) {
                ball.setSpeed({ x: -ball.getSpeed.x, y: ball.getSpeed.y })
            }
            if (ball.getPos.y <= 0) {
                ball.setSpeed({ x: ball.getSpeed.x, y: -ball.getSpeed.y })
            }
            return true;
        }
    }
    collisionBallWithPaddle(ball: Ball, paddle: Paddle, paddleHeight: number, paddleWidth: number) {
        if (ball.getPos.y + BALL_SIZE === paddle.getPos.y &&
            ball.getPos.x + BALL_SIZE >= paddle.getPos.x && ball.getPos.x <= paddle.getPos.x + paddleWidth
        ) {
            ball.setSpeed({ x: ball.getSpeed.x, y: -ball.getSpeed.y })
        } else if (ball.getPos.y + BALL_SIZE > paddle.getPos.y && ball.getPos.y + BALL_SIZE <= paddle.getPos.y + PADDLE_HEIGHT &&
            ball.getPos.x + BALL_SIZE >= paddle.getPos.x && ball.getPos.x <= paddle.getPos.x + paddleWidth) {
            ball.setSpeed({ x: -ball.getSpeed.x, y: -ball.getSpeed.y })
        }
    }

    collisionBallWithBrick(ball: Ball, brick: Brick): boolean {
        if (
            ball.getPos.x + BALL_SIZE > brick.getPos.x + BALL_SPEED
            && ball.getPos.x < brick.getPos.x + BRICK_WIDTH - BALL_SPEED
            && ball.getPos.y + BALL_SIZE > brick.getPos.y
            && ball.getPos.y < brick.getPos.y + BRICK_HEIGHT

        ) {
            //Change ball direction
            ball.setSpeed({ x: ball.getSpeed.x, y: -ball.getSpeed.y });
            return true
        } else if (
            (ball.getPos.x + BALL_SIZE >= brick.getPos.x &&
                ball.getPos.x <= brick.getPos.x + BRICK_WIDTH) &&
            ball.getPos.y + BALL_SIZE > brick.getPos.y
            && ball.getPos.y < brick.getPos.y + BRICK_HEIGHT
        ) {
             //Change ball direction
            ball.setSpeed({ x: -ball.getSpeed.x, y: -ball.getSpeed.y });
            return true
        }
        return false;
    }
    collisionBallWithBrickList(ball: Ball, brick: Brick[], context : CanvasView) {
        for (let i = 0; i < brick.length; i++) {
            if (this.collisionBallWithBrick(ball, brick[i])) {
                brick[i].setLevel();
                context.setScore();
                if (brick[i].getLevel === 0) {
                    //remove brick with enrgy equal 0
                    brick.splice(i, 1);
                }else{
                    brick[i].setImage(BRICK_IMAGES[brick[i].getLevel])
                }
                break;
            }
        }
    }
    collisitonPaddleWithWall(paddle: Paddle, context: CanvasView) {
        if (paddle.getMoveRight) {
            if (paddle.getPos.x + PADDLE_WIDTH < context.getCanvas.width) {
                paddle.makeMove({ x: PADDLE_SPEED, y: PADDLE_SPEED })
            }
        } else if (paddle.getMoveLeft) {
            if (paddle.getPos.x > 0) {
                paddle.makeMove({ x: -PADDLE_SPEED, y: PADDLE_SPEED })
            }
        }
    }
}