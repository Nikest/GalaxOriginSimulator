const workerThreads = require('worker_threads');
const { Noise } = require('./Noise.js');
const { palettes } = require('./palettes');

function getOctavesForStarProps(type) {
    const octaves = {
        M: 1,
        K: 2,
        G: 3,
        F: 4,
        B: 5,
        A: 6,
        O: 7,
    };

    return octaves[type];
}

function makeStarTexture(props, noise, push) {
    const r = props.starColor[0];
    const rDif = 255 - r;

    const g = props.starColor[1];
    const gDif = 255 - g;

    const b = props.starColor[2];
    const bDif = 255 - b;

    let count = 0;
    for (let y = 0; y < props.size; y += 1) for (let x = 0; x < props.size; x += 1) {
        const n = 100 - noise.spherical2D(props.size, x, y);

        const rPixel = r - (rDif - ((rDif / 100) * n));
        const gPixel = g - (gDif - ((gDif / 100) * n));
        const bPixel = b - (bDif - ((bDif / 100) * n));

        push(rPixel, count); count += 1;
        push(gPixel, count); count += 1;
        push(bPixel, count); count += 1;

        push(255, count); count += 1;
    }
}

workerThreads.parentPort.on('message', (data) => {
    const f = (data.radius / 695510) * 1.5;
    console.log('palettes', palettes);
    const propsMainLayer = {
        frequency: f < 0.35 ? 0.35 : f,
        octaves: getOctavesForStarProps(data.type[0]),
        amplitude: 0.5,
        persistence: 0.9,
        min: 0,
        max: 100
    };

    const mainLayer = new Noise(propsMainLayer);

    const handled = {
        seed: {
            layers: [
                {
                    name: 'mainLayer',
                    data: {
                        ...propsMainLayer,
                        perm: mainLayer.perm,
                        permMod12: mainLayer.permMod12,
                    }
                }
            ],
        },
        arraysRGBA: {
            colorMap: [],
            alphaChannel: [],
            bumpMap: [],
        }
    };

    makeStarTexture(data, mainLayer,(pixel, i) => {
        handled.arraysRGBA.colorMap[i] = pixel;
    });

    workerThreads.parentPort.postMessage(handled);
});