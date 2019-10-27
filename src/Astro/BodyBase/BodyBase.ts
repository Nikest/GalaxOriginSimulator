import { Barycenter } from 'Astro';

export interface IBodyBase {
    radius: number;
    mass: number;
    type: string;
    name: string;
    class: string;
    barycenter: Barycenter | null;
    farOrbit: number;
    setBarycenter(barycenter: Barycenter)
}

export abstract class BodyBase implements IBodyBase {
    radius = 0;
    mass = 0;
    type = '';
    name = '';
    class = '';
    farOrbit = 0;
    barycenter: Barycenter = null;

    setBarycenter(barycenter: Barycenter) {
        this.barycenter = barycenter;
    }

    setSatellite(satellite: BodyBase) {
        this.barycenter.orbits.push(new Barycenter(satellite, this.barycenter))
    }
}
