const workerThreads = require('worker_threads');

const { types, mainSequenceRangeInStar, typesTemplates, earth, mainSequenceRangeInPlanet } = require('./planetValues');
const { percent, rand } = require('./math');

function makeRandomType(orbitZone) {
    const pRange = rand(0, 10000);

    const typeTemplate = mainSequenceRangeInStar.find(t => {
        return pRange >= (t.count[0] * 100) && pRange <= (t.count[1] * 100)
    }).typeTemplate;

    let additional = 0;

    if(orbitZone > 0) {
        additional = rand(0, 10) < 4 ? 1 : 0;
    }

    const type = typesTemplates[typeTemplate][additional];

    if (orbitZone === 2) {
        type.typeRegular = (type.typeRegular === 'water' || type.typeRegular === 'oceanid') ? 'ice' : type.typeRegular
    }

    return type;
}

function makeRandomTypeMoon(planetType, orbitZone) {
    const availableTypes = mainSequenceRangeInPlanet.filter(t => {
        return !!t.available.find(a => a === planetType)
    });

    const mRange = rand(0, availableTypes[availableTypes.length - 1].count[1]);

    const typeTemplate = availableTypes.find(t => {
        return mRange >= t.count[0] && mRange <= t.count[1]
    }).typeTemplate;

    let additional = 0;

    if(orbitZone > 0) {
        additional = rand(0, 10) < 4 ? 1 : 0;
    }

    const type = typesTemplates[typeTemplate][additional];

    if (orbitZone === 2) {
        type.typeRegular = (type.typeRegular === 'water' || type.typeRegular === 'oceanid') ? 'ice' : type.typeRegular
    }

    return type;
}

function getMoonsTemplateCount(planetType) {
    if (planetType === 'selena') return 0;

    if (planetType === 'subterra') return 0;

    if (planetType === 'terra') {
        const precount =  +(rand(0, 10) < 4);
        return precount ? rand(0, 4) : 0;
    }

    if (planetType === 'superterra') {
        const precount =  +(rand(0, 10) < 5);
        return precount ? rand(0, 4) : 0;
    }

    if (planetType === 'neptunian') {
        const precount =  +(rand(0, 10) < 6);
        return precount ? rand(0, 4) : 0;
    }

    if (planetType === 'jovian') {
        const precount =  +(rand(0, 10) < 8);
        return precount ? rand(0, 4) : 0;
    }
}

function calculateOrbitZone(habitableZone, orbitRadius) {
    const radius = orbitRadius / 1.496e8;

    if (radius < habitableZone[0]) return 0;
    if (radius > habitableZone[1]) return 2;
    return 1;
}

function calculateWaterLevel(typeRegular) {
    const waterPlanet = ['oceanid', 'water', 'ice'];

    if (waterPlanet.findIndex(t => typeRegular === t) >= 0) {
        return 100;
    }

    return rand(20, 80);
}

function calculateSnowLine(typeRegular, habitablePercent, waterLevel) {
    const hPercent = habitablePercent > 100 ? 100 : habitablePercent;

    if (typeRegular === 'ice') return 100;

    if (typeRegular === 'water') return 0;

    if (typeRegular === 'oceanid') return hPercent;

    return percent(hPercent, waterLevel) + 20;
}

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

function initMoon(props) {
    const moonType = makeRandomTypeMoon(props.planetType);
    const semiParam = rand(1, 10) * 10;
    const typeTemplate = types.find(t => moonType.type === t.type);

    const moonProps = {
        orbitZone: props.orbitZone,
        percentInHabitable: props.percentInHabitable,
        type: moonType.type,
        typeRegular: moonType.typeRegular,
        water: 0,
        snowLine: 0,
    };

    Object.keys(typeTemplate).forEach(key => {
        const value = typeTemplate[key];

        if (typeof value !== 'string') {
            const from = value[0];
            const to = value[1];
            const range = to - from;

            moonProps[key] = percent(range, semiParam) + from;
        }
    });

    moonProps.gravity = (moonProps.mass / earth.mass) / ( (moonProps.radius / earth.radius) * 2);

    if (props.orbitZone !== 0) {
        moonProps.percent = props.percentInHabitable;
        moonProps.water = calculateWaterLevel(moonProps.typeRegular);
        moonProps.snowLine = calculateSnowLine(moonProps.typeRegular, props.percentInHabitable, moonProps.water)
    }

    return moonProps;
}

function init(props) {
    const orbitZone = calculateOrbitZone(props.habitableZone, props.orbitRadius);
    const planetType = makeRandomType(orbitZone);
    const semiParam = rand(1, 10) * 10;
    const typeTemplate = types.find(t => planetType.type === t.type);

    const planetProps = {
        orbitZone,
        type: planetType.type,
        typeRegular: planetType.typeRegular,
        name: `${props.name}-${names[props.order]}`,
        water: 0,
        snowLine: 0,
        moons: 0,
    };

    Object.keys(typeTemplate).forEach(key => {
        const value = typeTemplate[key];

        if (typeof value !== 'string') {
            const from = value[0];
            const to = value[1];
            const range = to - from;

            planetProps[key] = percent(range, semiParam) + from;
        }
    });

    planetProps.gravity = (planetProps.mass / earth.mass) / ( (planetProps.radius / earth.radius) * 2);

    if (planetProps.orbitZone !== 0) {

        const habitableLength = props.habitableZone[1] - props.habitableZone[0];
        const habitablePercent = 100 / habitableLength;
        const percent = habitablePercent * ((props.orbitRadius / 1.496e8) - props.habitableZone[0]);

        planetProps.percentInHabitable = percent;
        planetProps.water = calculateWaterLevel(planetType.typeRegular);
        planetProps.snowLine = calculateSnowLine(planetType.typeRegular, percent, planetProps.water)
    }

    planetProps.moons = getMoonsTemplateCount(planetProps.type);

    return planetProps;
}

workerThreads.parentPort.on('message', (props) => {
    const planetProps = props.moon ? initMoon(props) : init(props);

    workerThreads.parentPort.postMessage(planetProps);
});