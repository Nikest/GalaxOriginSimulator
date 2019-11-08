import * as NoiseWorker from './noise.worker.js';
import { Star, Planet } from 'GameModules/Astro';

export const TexturesGenerator = {
    makeStarTexturesData(star: Star): Promise<ImageData> {
        const size = Int32Array.BYTES_PER_ELEMENT * (300 * 300 * 4);
        const sharedBuffer = new SharedArrayBuffer(size);
        const sharedArray = new Int32Array(sharedBuffer);

        const noiseWorker = new NoiseWorker();
        const noiseprops = {
            sharedBuffer,
            starType: star.type,
            starColor: star.color,
            starRadius: star.radius,
            method: 'sphere',
            size: 300
        };

        return new Promise<ImageData>(res => {
            noiseWorker.onmessage = () => {
                const imageData = new ImageData(Uint8ClampedArray.from(sharedArray), 300, 300);

                noiseWorker.terminate();
                res(imageData);
            };
            noiseWorker.postMessage(noiseprops)
        })
    },
    makePlanetTexturesData(planet: Planet): Promise<ImageData> {
        const size = Int32Array.BYTES_PER_ELEMENT * (300 * 300 * 4);
        const sharedBuffer = new SharedArrayBuffer(size);
        const sharedArray = new Int32Array(sharedBuffer);

        const noiseWorker = new NoiseWorker();
        const noiseprops = {
            sharedBuffer,
            planetType: planet.type,
            planetRadius: planet.radius,
            method: 'sphere',
            size: 300
        };

        return new Promise<ImageData>(res => {
            noiseWorker.onmessage = () => {
                const imageData = new ImageData(Uint8ClampedArray.from(sharedArray), 300, 300);

                noiseWorker.terminate();
                res(imageData);
            };
            noiseWorker.postMessage(noiseprops)
        })
    },
};
