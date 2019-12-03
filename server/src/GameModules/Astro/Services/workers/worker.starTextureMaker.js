const workerThreads = require('worker_threads');
const Noise = require('./src/GameModules/Astro/Services/Noise/Noise.js');

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


workerThreads.parentPort.on('message', (data) => {
    const f = (data.radius / 695510) * 1.5;

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
                        ...props,
                        perm: mainLayer.perm,
                        permMod12: mainLayer.permMod12,
                    }
                }
            ],
        },
        arraysRGBA: {
            colorMap: [],
            alphaChannel: null,
            bumpMap: null,
        }
    };

    workerThreads.parentPort.postMessage(handled);
});