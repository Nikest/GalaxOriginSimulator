const workerThreads = require('worker_threads');

const earth = {
    mass: 5.972e24,
    radius: 6371
};

function percent(number, percent) {
    return (number / 100) * percent
}

const rand = function(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const mainSequenceRange = [
    {
        count: [0, 0.13],
        type: 'selena'
    }, {
        count: [0.13,  1.63],
        type: 'subterra'
    }, {
        count: [1.63, 18.44],
        type: 'terra'
    }, {
        count: [18.44, 45.38],
        type: 'superterra'
    }, {
        count: [45.38, 67.55],
        type: 'neptunian'
    }, {
        count: [67.55, 100],
        type: 'jovian'
    }
];

const moonSequenceRange = [
    {
        count: [0, 50],
        type: 'selena'
    }, {
        count: [50,  70],
        type: 'subterra'
    }, {
        count: [70, 90],
        type: 'terra'
    }, {
        count: [90, 98],
        type: 'superterra'
    }, {
        count: [99, 100],
        type: 'neptunian'
    }
];

const types = [
    {
        type: 'selena',
        mass: [percent(earth.mass, 1), percent(earth.mass, 10)],
        radius: [percent(earth.radius, 3), percent(earth.radius, 40)]
    }, {
        type: 'subterra',
        mass: [percent(earth.mass, 10), percent(earth.mass, 50)],
        radius: [percent(earth.radius, 40), percent(earth.radius, 80)]
    },{
        type: 'terra',
        mass: [percent(earth.mass, 50), percent(earth.mass, 500)],
        radius: [percent(earth.radius, 80), percent(earth.radius, 150)]
    },{
        type: 'superterra',
        mass: [percent(earth.mass, 500), percent(earth.mass, 1000)],
        radius: [percent(earth.radius, 150), percent(earth.radius, 250)]
    },{
        type: 'neptunian',
        mass: [percent(earth.mass, 1000), percent(earth.mass, 5000)],
        radius: [percent(earth.radius, 250), percent(earth.radius, 600)]
    },{
        type: 'jovian',
        mass: [percent(earth.mass, 5000), percent(earth.mass, 30000)],
        radius: [percent(earth.radius, 600), percent(earth.radius, 1300)]
    },
];

function getTypesArrayForType(type) {
    const typesArray = [];

    for(var i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            typesArray.pop();
            break;
        }
        typesArray.push(types[i])
    }

    return typesArray
}

function init(data) {
    var typesValid;
    var mainSequenceRangeValid;

    if (data.planetType) {
        typesValid = getTypesArrayForType(data.planetType);
        mainSequenceRangeValid = moonSequenceRange.filter((a, i) => i < typesValid.length)
    } else {
        typesValid = types;
        mainSequenceRangeValid = mainSequenceRange;
    }

    const mainSequencePercent = rand(1, mainSequenceRangeValid[mainSequenceRangeValid.length - 1].count[1] * 100);
    const type = mainSequenceRangeValid.find((t) => {
        return mainSequencePercent >= (t.count[0] * 100) && mainSequencePercent <= (t.count[1] * 100)
    });

    const typeProps = typesValid.find(t => t.type === type.type);
    const semiClass = rand(1, 10);

    Object.keys(typeProps).forEach(key => {
        if (typeof typeProps[key] === 'string') return;
        const begining = typeProps[key][0];
        const ending = typeProps[key][1];
        const range = ending - begining;
        const prop = percent(range, semiClass * 10);
        typeProps[key] = prop + begining;
    });

    typeProps.name = data.name;
    typeProps.gravity = (typeProps.mass / earth.mass) / ( (typeProps.radius / earth.radius) * 2);

    return typeProps;
}

workerThreads.parentPort.on('message', (data) => {
    workerThreads.parentPort.postMessage(init(data));
});