import { BodyBase, Star, Planet, Moon } from 'GameModules/Astro';
import  { rand } from 'GameModules/Services';

export const systemRater = {
    rateStar(star: Star | BodyBase) {
        if (star.barycenter.orbits.length === 0) return 0;
        if (star.barycenter.orbits.length === 1) return rand(0, 20);
        if (star.type[0] === 'M') rand(5, 20);
        if (star.type[0] === 'K') rand(20, 50);
        if (star.type[0] === 'G') rand(70, 100);
        if (star.type[0] === 'F') rand(80, 100);
        if (star.type[0] === 'A') rand(70, 90);
        if (star.type[0] === 'B') rand(40, 60);
        if (star.type[0] === 'O') rand(10, 30);
    },
    ratePlanet(planet: Planet | BodyBase) {
        if (planet.type === 'selena') {
            return [rand(0, 10), rand(60, 100), rand(50, 90)][planet['orbitZone']]
        }
        if (planet.type === 'minioceanid') {
            return [0, 0, rand(50, 70)][planet['orbitZone']]
        }
        if (planet.type === 'subterra') {
            return [rand(0, 10), rand(70, 100), rand(50, 70)][planet['orbitZone']]
        }
        if (planet.type === 'suboceanid') {
            return [0, 0, rand(50, 70)][planet['orbitZone']]
        }
        if (planet.type === 'terra') {
            if (planet['gravity'] <= 1) {
                return [rand(0, 5), rand(90, 100), rand(40, 60)][planet['orbitZone']]
            }
            if (planet['gravity'] <= 1.3) {
                return [rand(0, 3), rand(60, 80), rand(20, 50)][planet['orbitZone']]
            }

            return 0
        }
        if (planet.type === 'oceanid') {
            return [0, 0, rand(5, 10)][planet['orbitZone']]
        }
        if (planet.type === 'superterra') {
            return 0
        }
        if (planet.type === 'superoceanid') {
            return 0
        }
        if (planet.type === 'neptunian') {
            return 0
        }
        if (planet.type === 'jovian') {
            return 0
        }
    },
    rateMoon(moon: Moon) {
        if (moon.type === 'selena') {
            return [rand(0, 10), rand(60, 100), rand(50, 90)][moon.barycenter.centralBody['orbitZone']]
        }
        if (moon.type === 'minioceanid') {
            return [rand(0, 10), rand(60, 100), rand(50, 90)][moon.barycenter.centralBody['orbitZone']]
        }
        if (moon.type === 'subterra') {
            return [rand(0, 10), rand(70, 100), rand(50, 70)][moon.barycenter.centralBody['orbitZone']]
        }
        if (moon.type === 'suboceanid') {
            return [0, 0, rand(50, 70)][moon.barycenter.centralBody['orbitZone']]
        }
        if (moon.type === 'terra') {
            if (moon['gravity'] <= 1) {
                return [rand(0, 5), rand(90, 100), rand(40, 60)][moon.barycenter.centralBody['orbitZone']]
            }
            if (moon['gravity'] <= 1.3) {
                return [rand(0, 3), rand(60, 80), rand(20, 50)][moon.barycenter.centralBody['orbitZone']]
            }

            return 0
        }
        if (moon.type === 'oceanid') {
            return [0, 0, rand(5, 10)][moon.barycenter.centralBody['orbitZone']]
        }
        if (moon.type === 'superterra') {
            return 0
        }
        if (moon.type === 'superoceanid') {
            return 0
        }
    }
};
