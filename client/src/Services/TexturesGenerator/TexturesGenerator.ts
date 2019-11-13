import * as NoiseWorker from './noise.worker.js';

export const TexturesGenerator = {
    makeStarTexturesData(star: any): Promise<ImageData> {
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
    makePlanetTexturesData(planet: any): Promise<ImageData> {
        const size = Int32Array.BYTES_PER_ELEMENT * (300 * 300 * 4);
        const sharedBuffer = new SharedArrayBuffer(size);
        const sharedArray = new Int32Array(sharedBuffer);

        const noiseWorker = new NoiseWorker();
        const noiseprops = {
            sharedBuffer,
            planetType: planet.type,
            planetRadius: planet.radius,
            orbitZone: planet.orbitZone,
            water: planet.water,
            snowLine: planet.snowLine,
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
