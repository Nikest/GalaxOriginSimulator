import { Barycenter } from 'Astro';

export interface IBodyBase {
    radius: number;
    mass: number;
    type: string;
    name: string;
    class: string;
    barycenter: Barycenter | null;
    farOrbit: number;
    rate: number;
    setBarycenter(barycenter: Barycenter)
}

export abstract class BodyBase implements IBodyBase {
    radius = 0;
    mass = 0;
    type = '';
    rate = 0;
    private _NAME = '';
    get name() {
        return this._NAME
    }
    set name(val: string) {
        this._NAME = val;
        this.updated();
    }
    class = '';
    farOrbit = 0;
    barycenter: Barycenter = null;

    setBarycenter(barycenter: Barycenter) {
        this.barycenter = barycenter;
    }

    setSatellite(satellite: BodyBase) {
        this.barycenter.orbits.push(new Barycenter(satellite, this.barycenter))
    }

    init() { this.calculateSelf() }
    calculateSelf() {}

    updated() { this.barycenter && this.barycenter.updated(this) }
}
