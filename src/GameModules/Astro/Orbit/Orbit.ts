import { Barycenter } from 'GameModules/Astro';

export interface IOrbit {
    x: number;
    y: number;
    A: number;
    B: number;
    v: number;
    e: number;
    F: number;
    barycenter: Barycenter;
}

const G = 6.67408 * 10e-11;
export class Orbit implements IOrbit {
    x = 0;
    y = 0;
    A = 0;
    B = 0;
    v = 0;
    e = 0;
    F = 0;
    t = 0;
    barycenter: Barycenter;

    constructor(radius: number, barycenter: Barycenter) {
        this.A = radius;
        this.B = radius;
        this.barycenter = barycenter;
        if (barycenter.centralBody.class === 'planet') {
            const M = barycenter.outer.centralBody.mass / 10;
            const m = barycenter.centralBody.mass / 10;
            const Rmeters = radius * 1000;
            this.v = Math.sqrt( ( G * (M + m) ) / Rmeters) / 1000;
        }
    }
}

export class OrbitsArray extends Array {
    constructor(props) {
        super(...props)
    }
}
