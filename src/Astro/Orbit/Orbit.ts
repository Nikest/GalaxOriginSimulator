import { Barycenter } from 'Astro';

export interface IOrbit {
    x: number;
    y: number;
    A: number;
    B: number;
}

export class Orbit implements IOrbit {
    x = 0;
    y = 0;
    A = 0;
    B = 0;

    constructor() {

    }
}

export class OrbitsArray extends Array {
    constructor(props) {
        super(...props)
    }
}
