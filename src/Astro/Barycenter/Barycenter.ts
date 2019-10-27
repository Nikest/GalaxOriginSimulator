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
    selfOrbit: Orbit;
    outer = null;

    constructor(centralBody: BodyBase, outer: Barycenter | null, orbitRadius: number = 0) {
        this.centralBody = centralBody;
        this.centralBody.setBarycenter(this);
        this.outer = outer;
        this.selfOrbit = new Orbit(orbitRadius, this);
    }

    setToOrbits(orbits: Barycenter[]) {
        this.orbits = orbits
    }

    setOrbitRadius(radius: number) {
        this.selfOrbit = new Orbit(radius, this);
    }
}
