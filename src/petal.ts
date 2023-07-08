import { getRandom } from "./utils";

export default class Petal {
    constructor(
        private x: number,
        private y: number,
        private s: number,
        private r: number,
        private target: HTMLImageElement
    ) {}
    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.r);
        context.drawImage(this.target, 0, 0, 40 * this.s, 40 * this.s);
        context.restore();
    }
    update() {
        this.x = this.x + 0.5 * (-0.5 + Math.random() * 1) - 1.7;
        this.y = this.y + 1.5 + Math.random() * 0.7;
        this.r = this.r + Math.random() * 0.03;

        if (
            this.x > window.innerWidth ||
            this.x < 0 ||
            this.y > window.innerHeight ||
            this.y < 0
        ) {
            this.r = getRandom("r");
            if (Math.random() > 0.4) {
                this.x = getRandom("x");
                this.y = 0;
                this.s = getRandom("s");
                this.r = getRandom("r");
            } else {
                this.x = window.innerWidth;
                this.y = getRandom("y");
                this.s = getRandom("s");
                this.r = getRandom("r");
            }
        }
    }
}
