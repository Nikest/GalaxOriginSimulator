import { BodyBase, Orbit, System } from 'Astro';
import { rand } from 'Services';

const planetSystemSize = [
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

export interface IBarycenter {
    selfOrbit: Orbit;
    centralBody: BodyBase | null,
    orbits: Barycenter[],
    outer: Barycenter | null;
    system: System | null;
}

export class Barycenter implements IBarycenter {
    centralBody: BodyBase = null;
    orbits: Barycenter[] = [];
    selfOrbit: Orbit;
    outer = null;
    system: System | null;

    constructor(centralBody: BodyBase | null, outer: Barycenter | null, orbitRadius: number = 0) {
        this.centralBody = centralBody;
        centralBody && this.centralBody.setBarycenter(this);
        this.outer = outer;
        this.selfOrbit = new Orbit(orbitRadius, this);
    }

    setSystemLink(system: System) {
        this.system = system;
    }

    updated(data: any) {
        this.outer && this.outer.updated(data);
    }

    setToOrbits(orbits: Barycenter[]) {
        this.orbits = orbits
    }

    setSelfOrbitRadius(radius: number) {
        this.selfOrbit = new Orbit(radius, this);
    }

    setCentralBody(centralBody: BodyBase) {
        this.centralBody = centralBody;
        this.centralBody.setBarycenter(this);
    }

    generateOrbits(count?: number) {
        const randPercent = rand(0, 100);
        const randF = rand(30, 92);
        const firstOrbitRadius =
            this.centralBody.radius * randF;

        const templateCount = planetSystemSize.find(s => {
            return randPercent >= s[0] && randPercent <= s[1]
        })[2];

        this.orbits = Array(typeof count === 'number' ? count : templateCount).fill(0).map((o, i) => {
            return new Barycenter(null, this, 0)
        });

        this.orbits.forEach((b, i) => {
            const radius = (i === 0) ? firstOrbitRadius : (this.orbits[i - 1].selfOrbit.A * (rand(140, 198) / 100));
            b.setSelfOrbitRadius(radius);
        });
    }
}
