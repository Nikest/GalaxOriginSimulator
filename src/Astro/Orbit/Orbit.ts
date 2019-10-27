import { Barycenter } from 'Astro';

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

export class Orbit implements IOrbit {
    x = 0;
    y = 0;
    A = 0;
    B = 0;
    v = 0;
    e = 0;
    F = 0;
    barycenter: Barycenter;

    constructor(radius: number, barycenter: Barycenter) {
        this.A = radius;
        this.B = radius;
        this.barycenter = barycenter;
    }
}

export class OrbitsArray extends Array {
    constructor(props) {
        super(...props)
    }
}
