let controller: number;
let img = new Image();
img.src = "./images/petal.png";

class Petal {
    constructor(
        public x: number,
        public y: number,
        public s: number,
        public r: number
    ) {}

    draw(cxt: CanvasRenderingContext2D) {
        cxt.save();
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
        cxt.restore();
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

class PetalList {
    list: Petal[] = [];
    push(petal: Petal) {
        this.list.push(petal);
    }

    update() {
        for (let i = 0, len = this.list.length; i < len; i++) {
            this.list[i].update();
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0, len = this.list.length; i < len; i++) {
            this.list[i].draw(ctx);
        }
    }
}

function getRandom(option: string): number {
    switch (option) {
        case "x":
            return Math.random() * window.innerWidth;
        case "y":
            return Math.random() * window.innerHeight;
        case "s":
            return Math.random();
        case "r":
            return Math.random() * 6;
    }
    return 0;
}

function init() {
    const canvas = document.createElement("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const petalList = new PetalList();
    for (let i = 0; i < 50; i++) {
        const petal = new Petal(
            getRandom("x"),
            getRandom("y"),
            getRandom("s"),
            getRandom("r")
        );
        petal.draw(ctx);
        petalList.push(petal);
    }
    controller = requestAnimationFrame(function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalList.update();
        petalList.draw(ctx);
        controller = requestAnimationFrame(loop);
    });
}

img.onload = init;
