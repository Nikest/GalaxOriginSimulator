import { Barycenter } from 'Astro';

export interface IBodyBase {
    size: number;
    mass: number;
    type: string;
    name: string;
    class: string;
    barycenter: Barycenter | null;
    setBarycenter(barycenter: Barycenter)
}

export abstract class BodyBase implements IBodyBase {
    size = 0;
    mass = 0;
    type = '';
    name = '';
    class = '';
    barycenter: Barycenter = null;

    setBarycenter(barycenter: Barycenter) {
        this.barycenter = barycenter;
    }

    setSatellite(satellite: BodyBase) {
        this.barycenter.orbits.push(new Barycenter(satellite, this.barycenter))
    }
}
