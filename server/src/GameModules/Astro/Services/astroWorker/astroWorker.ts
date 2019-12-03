import { rand } from 'GameModules/Services';

const { Worker } = require('worker_threads');

const starMakerPath = './src/GameModules/Astro/Star/worker.starMaker.js';
const planetMakerPath = './src/GameModules/Astro/Planet/worker.planetMaker.js';

export const astroWorker = {
    getStarRandomProps(type?: string) {
        const worker = new Worker(starMakerPath);

        return new Promise(res => {
            worker.on('message', function (data) {
                res(data);
            });

            worker.postMessage({ type });
        });
    },
    getPlanetRandomProps(props): Promise<any> {
        const worker = new Worker(planetMakerPath);

        return new Promise(res => {
            worker.on('message', function (data) {
                res(data);
            });

            worker.postMessage(props);
        });
    },
    getMoonsTemplateCount(planetType, mapFn) {
        if (planetType === 'selena') return [];

        if (planetType === 'subterra') return [];

        if (planetType === 'terra') {
            const precount =  +(rand(0, 10) < 4);
            const count = precount ? rand(0, 4) : 0;
            return Array(count).fill(0).map(mapFn)
        }

        if (planetType === 'superterra') {
            const precount =  +(rand(0, 10) < 5);
            const count = precount ? rand(0, 4) : 0;
            return Array(count).fill(0).map(mapFn)
        }

        if (planetType === 'neptunian') {
            const precount =  +(rand(0, 10) < 6);
            const count = precount ? rand(0, 4) : 0;
            return Array(count).fill(0).map(mapFn)
        }

        if (planetType === 'jovian') {
            const precount =  +(rand(0, 10) < 8);
            const count = precount ? rand(0, 4) : 0;
            return Array(count).fill(0).map(mapFn)
        }
    }
};
