import * as StarWorker from './starType.worker.js';
import * as PlanetWorker from './planetType.worker.js';
import * as PlanetSubTypeWorker from './planetSubType.worker.js';
import { rand } from 'Services';
import { Barycenter } from "Astro";

const systemSize = [
    [0, 30, 1],
    [31, 45, 2],
    [46, 54, 3],
    [55, 60, 4],
    [61, 78, 5],
    [78, 85, 6],
    [86, 90, 7],
    [91, 97, 8],
    [98, 100, 9],
];


export const astroWorker = {
    getStarRandomProps() {
        const worker = new StarWorker();

        return new Promise(res => {
            worker.onmessage = (data) => res(data);
            worker.postMessage(null)
        });
    },
    getPlanetRandomProps(props) {
        const worker = new PlanetWorker();

        return new Promise(res => {
            worker.onmessage = (data) => res(data);
            worker.postMessage(props)
        });
    },
    getPlanetsTemplateCount(mapFn) {
        const randPercent = rand(0, 100);

        const templateCount = systemSize.find(s => {
            return randPercent >= s[0] && randPercent <= s[1]
        })[2];

        return (new Array(templateCount)).fill(0).map(mapFn)
    },
    getMoonsTemplateCount(planetType, mapFn) {
        if (planetType === 'selena') return [];

        if (planetType === 'subterra') return [];

        if (planetType === 'terra') {
            const precount =  +(rand(0, 10) < 4);
            const count = precount ? rand(0, 4) : 0;
            return (new Array(count)).fill(0).map(mapFn)
        }

        if (planetType === 'superterra') {
            const precount =  +(rand(0, 10) < 5);
            const count = precount ? rand(0, 4) : 0;
            return (new Array(count)).fill(0).map(mapFn)
        }

        if (planetType === 'neptunian') {
            const precount =  +(rand(0, 10) < 6);
            const count = precount ? rand(0, 4) : 0;
            return (new Array(count)).fill(0).map(mapFn)
        }

        if (planetType === 'jovian') {
            const precount =  +(rand(0, 10) < 8);
            const count = precount ? rand(0, 4) : 0;
            return (new Array(count)).fill(0).map(mapFn)
        }
    },
    calculatePlanetSubType(habitableZone, type, orbitRadius) {
        const worker = new PlanetSubTypeWorker();

        const habitable = [habitableZone[0], habitableZone[1]];
        return new Promise((res) => {
            worker.onmessage = (data) => res(data);
            worker.postMessage({habitable, type, orbitRadius})
        })
    },
    generateOrbitsRadius(barycenter: Barycenter) {
        const randF = rand(60, 92);
        const firstOrbitRadius = barycenter.centralBody.radius * (barycenter.centralBody.class === 'planet' ? randF / 10 : randF);

        barycenter.orbits.forEach((o, i) => {
            const radius = (i === 0) ? firstOrbitRadius : (barycenter.orbits[i - 1].selfOrbit.A * (rand(170, 198) / 100));
            o.setOrbitRadius(radius);
        })
    },
};
