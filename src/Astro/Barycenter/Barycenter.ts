import { BodyBase, Orbit, OrbitsArray } from 'Astro';

export interface IBarycenter {
    selfOrbit: Orbit;
    centralBody: BodyBase | null,
    orbits: OrbitsArray,
    outer: Barycenter | null;
}

export class Barycenter implements IBarycenter {
    centralBody: BodyBase = null;
    orbits: OrbitsArray = [];
    selfOrbit = new Orbit();
    outer = null;

    constructor(centralBody: BodyBase, outer: Barycenter | null, orbits: Barycenter[] = []) {
        this.centralBody = centralBody;
        this.centralBody.setBarycenter(this);
        this.outer = outer;
        this.orbits = new OrbitsArray(orbits)
    }

    setToOrbits(orbits: Barycenter[]) {
        this.orbits = new OrbitsArray(orbits)
    }
}
