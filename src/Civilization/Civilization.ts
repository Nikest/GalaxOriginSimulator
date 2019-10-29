import { System } from 'Astro';
import { getNamesInStyle, INamesStyle } from 'Services'
import { onColonization } from 'Text';

interface ICivilization {
    names: INamesStyle
    system: System;
}

export class Civilization implements ICivilization {
    names: INamesStyle;
    system: System;

    constructor(system: System) {
        this.names = getNamesInStyle();
        this.system = system;
    }

    colonizeSystem() {
        this.system.system.centralBody.name = this.names.getStarName();
        this.system.system.orbits.forEach(barycenter => {
            barycenter.centralBody.name = this.names.getPlanetName();
            barycenter.orbits.forEach(barycenter => barycenter.centralBody.name = this.names.getPlanetName())
        });

        const colonyShipName = this.names.getMale();

        console.log(onColonization(colonyShipName))
    }
}
