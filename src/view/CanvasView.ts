import { LEVEL } from "~/setup";
import { Ball } from "~/sprites/Ball";
import { Brick } from "~/sprites/Brick";
import { Paddle } from "~/sprites/Paddle";
export class CanvasView {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private score: number;
    private level: number;
    private scoreDisplay: HTMLElement | null;
    private displayInfo: HTMLElement | null;
    constructor() {
        this.canvas = document.getElementById("playField") as HTMLCanvasElement;
        this.context = this.canvas?.getContext("2d");
        this.score = 0;
        this.level = 1;
        this.scoreDisplay = document.getElementById("score");
        this.displayInfo = document.getElementById("info");
    }
    clearCanvas(): void {
        this.context?.clearRect(0, 0, this.canvas?.width, this.canvas?.height);
    }
    drawStuff(stuff: Ball | Brick | Paddle): void {
        if (stuff) {
            this.context?.drawImage(
                stuff.getImg,
                stuff.getPos.x,
                stuff.getPos.y,
                stuff.getSize.width,
                stuff.getSize.height
            )
        }
    }
    checkLoose(ball: Ball): boolean {
        if ((ball.getPos.y >= this.canvas.height)) {
            if (this.displayInfo) {
                this.displayInfo.innerHTML = "You Loose";
                return true
            }
        }
        return false;
    }
    checkWin(bricks: Brick[]): boolean {
        if (bricks.length === 0) {
            if (this.displayInfo) {
                this.displayInfo.innerHTML = "You Win";
                if (this.level < LEVEL.length) {
                    this.setLevel();
                }
            }
            return true
        }
        return false;
    }
    drawBrick(brickList: Brick[]): void {
        brickList.forEach((item: Brick, index: number) => {
            this.drawStuff(item)
        })
    }
    setScore(): void {
        this.score += 1;
        if (this.scoreDisplay) {
            this.scoreDisplay.innerHTML = this.score.toString();
        }
    }
    setLevel(): void {
        this.level += 1;
    }
    get getCanvas(): HTMLCanvasElement {
        return this.canvas
    }
} 