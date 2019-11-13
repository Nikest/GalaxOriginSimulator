const workerThreads = require('worker_threads');

function percent(number, percent) {
    return (number / 100) * percent
}

const rand = function(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const terraWarmTypesNames = {
    selena: 'minioceanid',
    subterra: 'suboceanid',
    terra: 'oceanid',
    superterra: 'superoceanid'
};

const terraColdTypesNames = {
    selena: 'miniice',
    subterra: 'subice',
    terra: 'ice',
    superterra: 'ice'
};

const giantColdTypesNames = {
    jovian: 'icegiant',
    neptunian: 'iceneptunian',
};


function getWarmSubType(type) {
    if(type === 'jovian' || type === 'neptunian') {
        return type;
    }

    return (rand(0, 100) <= 30) ? terraWarmTypesNames[type] : type
}

function getColdSubType(type) {
    if(type === 'jovian' || type === 'neptunian') {
        return (rand(0, 100) <= 30) ? giantColdTypesNames[type] : type;
    }

    return (rand(0, 100) <= 30) ? terraWarmTypesNames[type] : type
}


function init(data) { console.log('INIT');
    const { habitable, type, orbitRadius } = data;
    const props = {
        orbitZone: 1,
        type: type,
        water: 1,
        snowLine: 0,
    };

    // habitable position
    const radius = orbitRadius / 1.496e8;
    if (radius < habitable[0]) props.orbitZone = 0;
    if (radius > habitable[1]) props.orbitZone = 2;

    // water
    if (props.orbitZone === 1) {
        const habitableLength = habitable[1] - habitable[0];
        const habitablePercent = 100 / habitableLength;
        const percent = habitablePercent * (radius - habitable[0]);

        props.type = getWarmSubType(type, props.orbitZone);

        props.water = percent < 11 ? 10 : rand(10, percent);
        props.snowLine = percent;
        console.log('zone 1', props)
    }

    if (props.orbitZone === 2) {
        props.type = getColdSubType(type, props.orbitZone);

        props.water = rand(0, 90);
        console.log('zone 2', props)
    }


    return props;
}

workerThreads.parentPort.on('message', (data) => {
    workerThreads.parentPort.postMessage(init(data));
});