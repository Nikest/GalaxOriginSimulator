import { System, Planet, Moon } from 'GameModules/Astro';
import { getNamesInStyle, INamesStyle } from 'GameModules/Services';
import { onColonization } from 'GameModules/Text';
import { systemRater } from 'GameModules/Civilization';

interface ICivilization {
    names: INamesStyle
    system: System;
}


export class Civilization implements ICivilization {
    names: INamesStyle;
    system: System;
    private eventListeners = {};

    constructor(system: System) {
        this.names = getNamesInStyle();
        this.system = system;
    }

    colonizeSystem() {
        this.system.forEach((body: Planet | Moon) => {
            if (body.class === 'star') {
                body.name = this.names.getStarName();
                body.rate = systemRater.rateStar(body);
                return;
            }

            if (body.class === 'planet') {
                body.name = this.names.getPlanetName();
                body.rate = systemRater.ratePlanet(body);
                return;
            }

            if (body.class === 'moon') {
                body.name = this.names.getPlanetName();
                body.rate = systemRater.rateMoon(body);
            }
        });

        const colonyShipName = this.names.getMale();

        const historyMessage = onColonization(colonyShipName, this.system, this.names);
        this.eventListeners['historyMessage'].forEach(fn => fn(historyMessage));
    }

    addEventListeners(eventName: string, fn: Function) {
        this.eventListeners[eventName] ? this.eventListeners[eventName].push(fn) : this.eventListeners[eventName] = [fn]
    }
}
