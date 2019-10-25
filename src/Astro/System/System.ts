import { Star, Planet, Barycenter, Moon } from 'Astro';
import { rand, getNamesInStyle } from 'Services';

interface ISystem {
    name: string;
    system: Barycenter;
}

export class System implements ISystem {
    name = '';
    system: Barycenter;

    constructor() {
        const names = getNamesInStyle();
        const mainStar = Star.randomStar(names.getStarName());
        const mainCenter = new Barycenter(mainStar, null);

        const planets = (new Array(rand(1, 8))).fill(0).map(() => {
            return new Barycenter(
                Planet.randomPlanet(names.getPlanetName()),
                mainCenter
            )
        });

        planets.forEach((b) => {
            b.centralBody.setSatellite(Moon.randomMoon(names.getPlanetName()))
        });

        mainCenter.setToOrbits(planets);
        this.system = mainCenter
    }
}
