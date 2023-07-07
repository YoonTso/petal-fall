export function getRandom(option: string): number {
    let ret: number;
    switch (option) {
        case "x":
            ret = Math.random() * window.innerWidth;
            break;
        case "y":
            ret = Math.random() * window.innerHeight;
            break;
        case "s":
            ret = Math.max(0.5, Math.random());
            break;
        case "r":
            ret = Math.random() * 2 * Math.PI;
            break;
    }
    return ret;
}
