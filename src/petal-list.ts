import Petal from "./petal";
import { getRandom } from "./utils";

export default class PetalList {
    private petals: Petal[] = [];
    private controller: number;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    constructor(target: HTMLImageElement) {
        this.init(target);
    }

    init(target: HTMLImageElement) {
        this.initCanvas();
        this.initPetals(target);
        this.start();
    }

    initCanvas() {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.style.position = "absolute";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.top = "0";
        canvas.style.left = "0";
        this.context = canvas.getContext("2d");
        this.canvas = canvas;
    }

    initPetals(target: HTMLImageElement) {
        for (let i = 0; i < 50; i++) {
            const x = getRandom("x");
            const y = getRandom("y");
            const s = getRandom("s");
            const r = getRandom("r");
            const petal = new Petal(x, y, s, r, target);
            petal.draw(this.context);
            this.petals.push(petal);
        }
    }

    start() {
        this.controller = requestAnimationFrame(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.petals.forEach((petal) => {
                petal.update();
            });
            this.petals.forEach((petal) => {
                petal.draw(this.context);
            });
            this.controller = requestAnimationFrame(this.start.bind(this));
        });
    }

    stop() {
        cancelAnimationFrame(this.controller);
    }
}
