import { Star, Planet, Barycenter, Moon } from 'Astro';
import { astroWorker } from 'Astro/Services';
import { rand, getNamesInStyle } from 'Services';

interface ISystem {
    name: string;
    system: Barycenter;
}

export class System implements ISystem {
    name = '';
    system: Barycenter;

    static makeRandomSystem(): Promise<System> {
        return new Promise(res => {
            const names = getNamesInStyle();

            Star.makeRandomStar(names.getStarName()).then(star => {
                const mainCenter = new Barycenter(star, null);

                const planetsPromices = astroWorker.getPlanetsTemplateCount(() => {
                    return Planet.makeRandomPlanet(names.getPlanetName())
                });

                Promise.all(planetsPromices).then((planetsArray: Planet[]) => {
                    const planets = planetsArray.map((planet) => {
                        return new Barycenter(planet, mainCenter)
                    });

                    const moonsPromices = planets.map((b: Barycenter) => {
                        return Promise.all(astroWorker.getMoonsTemplateCount(b.centralBody.type, () => {
                            return Moon.makeRandomMoon(names.getPlanetName(), b.centralBody.type)
                        }))
                    });

                    Promise.all(moonsPromices).then(moons => {
                        moons.forEach((moonArray: Moon[], i: number) => {
                            if (moonArray.length > 0) {
                                moonArray.forEach((moon: Moon) => {
                                    planets[i].centralBody.setSatellite(moon)
                                });
                            }
                        });

                        mainCenter.setToOrbits(planets);
                        const system = new System(mainCenter);

                        res(system);
                    });
                });
            });
        })
    }

    constructor(system: Barycenter) {

        /*const mainStar = Star.randomStar(names.getStarName());
        const mainCenter = new Barycenter(mainStar, null);

        const planets = (new Array(rand(1, 8))).fill(0).map(() => {
            return new Barycenter(
                Planet.randomPlanet(names.getPlanetName()),
                mainCenter
            )
        });

        planets.forEach((b) => {
            (new Array(rand(0, 4))).fill(0).forEach(() => {
                b.centralBody.setSatellite(Moon.randomMoon(names.getPlanetName()))
            });
        });

        mainCenter.setToOrbits(planets);
        this.system = mainCenter*/

        this.system = system;
        this.name = system.centralBody.name;
    }
}
