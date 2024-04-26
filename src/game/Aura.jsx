class Aura {
    constructor(hue, bright) {
        this.hue = this.validateHue(hue);
        this.bright = this.validateBright(bright);
    }

    validateHue(hue) {
        if (typeof hue !== 'number' || hue < 0 || hue > 359) {
            throw new Error('Hue must be a number between 0 and 359.');
        }
        return hue;
    }

    validateBright(bright) {
        if (typeof bright !== 'number' || bright < 0 || bright > 20) {
            throw new Error('Brightness must be a number between 0 and 20.');
        }
        return bright;
    }

    calculateComplementaryHue() {
        return (this.hue + 180) % 360;
    }

    calculateComplementaryRange() {
        const complementaryHue = this.calculateComplementaryHue();
        const lowerRange = (complementaryHue - 30);
        const upperRange = (complementaryHue + 30);
        if (lowerRange < 0) {
            lowerRange += 360;
        }
        if (upperRange > 359) {
            upperRange -= 360;
        }
        return [lowerRange, upperRange];
    }

    getRandomComplementaryHueInRange() {
        const [lowerRange, upperRange] = this.calculateComplementaryRange();
        return Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange;
    }
}

export function getColorName(hue) {
    const colors = [
        { range: [0, 20], name: 'Red' },
        { range: [20, 30], name: 'Vermilion' },
        { range: [30, 36], name: 'Orange' },
        { range: [36, 43], name: 'Amber' },
        { range: [43, 65], name: 'Yellow' },
        { range: [65, 80], name: 'Olive' },
        { range: [80, 90], name: 'Puke Green' },
        { range: [90, 110], name: 'Chartreuse Green' },
        { range: [110, 130], name: 'Green' },
        { range: [130, 148], name: 'Spring Green' },
        { range: [148, 180], name: 'Cyan' },
        { range: [180, 210], name: 'Azure' },
        { range: [210, 260], name: 'Blue' },
        { range: [260, 290], name: 'Purple' },
        { range: [290, 310], name: 'Magenta' },
        { range: [310, 322], name: 'Pink' },
        { range: [322, 330], name: 'Rose' },
        { range: [330, 360], name: 'Red' },
    ];

    const colorObj = colors.find(color => hue >= color.range[0] && hue < color.range[1]);
    return colorObj ? colorObj.name : 'Invalid hue value';
}

export function getBrightName(brightness) {
    const brightnessLevels = [
        { range: [0, 2], name: 'Pitch Dark' },
        { range: [3, 7], name: 'Dimly Lit' },
        { range: [8, 12], name: 'Soft Glow' },
        { range: [13, 17], name: 'Radiant' },
        { range: [18, 20], name: 'Star Bright' },
    ];

    const levelObj = brightnessLevels.find(level => brightness >= level.range[0] && brightness <= level.range[1]);
    return levelObj ? levelObj.name : 'Invalid brightness value';
}

export default Aura;
