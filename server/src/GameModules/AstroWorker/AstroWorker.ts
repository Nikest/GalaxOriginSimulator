import { rand } from 'GameModules/Services';

const { Worker } = require('worker_threads');

const starMakerPath = './src/GameModules/AstroWorker/worker.starMaker.js';
const planetMakerPath = './src/GameModules/AstroWorker/worker.planetMaker.js';

export class AstroWorker {
    getStarRandomProps(type?: string): Promise<any> {
        const worker = new Worker(starMakerPath);

        return new Promise(res => {
            worker.on('message', function (data) {
                res(data);
            });

            worker.postMessage({ type });
        });
    }

    getPlanetRandomProps(props): Promise<any> {
        const worker = new Worker(planetMakerPath);

        return new Promise(res => {
            worker.on('message', function (data) {
                res(data);
            });

            worker.postMessage(props);
        });
    }
}