import { Orbit } from 'GameModules/Astro';

const earth = {
    mass: 5.972e24,
    radius: 6371
};

const hour = 3600;
const day = 86400;
const year = 31536000;

function timeComputing(seconds) {
    let secondsCount = seconds;
    const res = ['', ''];

    if (secondsCount / year >= 1) {
        const years = Math.trunc(secondsCount / year);
        secondsCount -= year * years;

        res[0] = years + ' лет'
    }

    if (secondsCount / day >= 1) {
        const days = Math.trunc(secondsCount / day);
        res[1] = days + ' дней'
    }

    return res.join(' ');
}

export const planetDescriptor = {
    getRadius(size: number) {
        return (size / earth.radius).toFixed(2)
    },
    getMass(mass: number) {
        return (mass / earth.mass).toFixed(2)
    },
    getGravity(gravity: number) {
        return gravity.toFixed(2)
    },
    getType(type: string) {
        if (type === 'selena') return 'Селена';
        if (type === 'minioceanid') return 'Мини океанида';
        if (type === 'subterra') return 'Суб терра';
        if (type === 'suboceanid') return 'Суб океанида';
        if (type === 'terra') return 'Терра';
        if (type === 'oceanid') return 'Океанида';
        if (type === 'superterra') return 'Супер земля';
        if (type === 'superoceanid') return 'Супер океанида';
        if (type === 'neptunian') return 'Нептун';
        if (type === 'jovian') return 'Газовый гигант';
    },
    getZone(orbitZone: number) {
        if (orbitZone === 0) return 'В горячей зоне';
        if (orbitZone === 1) return 'В зоне обитаемости';
        if (orbitZone === 2) return 'В холодной зоне';
    },
    getOrbitRadius(radius: number) {
        if (radius > 1.496e6) {
            return (radius / 1.496e8).toPrecision(2) + ' АЕ'
        }
        return radius.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' KM'
    },
    getOrbitTime(orbit: Orbit) {
        const orbitLong = Math.PI * (((orbit.A + orbit.B) / 2) * 2);
        const seconds = orbitLong / orbit.v;
        return timeComputing(seconds);
    }
};
