import { BodyBase, Orbit, OrbitsArray } from 'Astro';

export interface IBarycenter {
    selfOrbit: Orbit;
    centralBody: BodyBase | null,
    orbits: Barycenter[],
    outer: Barycenter | null;
}

export class Barycenter implements IBarycenter {
    centralBody: BodyBase = null;
    orbits: Barycenter[] = [];
    selfOrbit = new Orbit();
    outer = null;

    constructor(centralBody: BodyBase, outer: Barycenter | null, orbits: Barycenter[] = []) {
        this.centralBody = centralBody;
        this.centralBody.setBarycenter(this);
        this.outer = outer;
        this.orbits = orbits
    }

    setToOrbits(orbits: Barycenter[]) {
        this.orbits = orbits
    }
}
