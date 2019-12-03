const { percent } = require('../Services/Math/math');

const earth = {
    mass: 5.972e24,
    radius: 6371
};

const mainSequenceRangeInStar = [
    {
        count: [0, 0.13],
        typeTemplate: 'little'
    }, {
        count: [0.13,  1.63],
        typeTemplate: 'small'
    }, {
        count: [1.63, 18.44],
        typeTemplate: 'middle'
    }, {
        count: [18.44, 45.38],
        typeTemplate: 'semibig'
    }, {
        count: [45.38, 67.55],
        typeTemplate: 'big'
    }, {
        count: [67.55, 100],
        typeTemplate: 'giant'
    }
];

const mainSequenceRangeInPlanet = [
    {
        count: [0, 40],
        typeTemplate: 'little',
        available: ['subterra', 'terra', 'superterra', 'neptunian', 'jovian']
    }, {
        count: [40, 70],
        typeTemplate: 'small',
        available: ['terra', 'superterra', 'neptunian', 'jovian']
    }, {
        count: [70, 90],
        typeTemplate: 'middle',
        available: ['superterra', 'neptunian', 'jovian']
    }, {
        count: [90, 100],
        typeTemplate: 'semibig',
        available: ['neptunian', 'jovian']
    }
];

const typesTemplates = {
    little: [
        {
            type: 'selena',
            typeRegular: 'rocky'
        },
        {
            type: 'selena',
            typeRegular: 'oceanid'
        },
    ],
    small: [
        {
            type: 'subterra',
            typeRegular: 'rocky'
        },
        {
            type: 'subterra',
            typeRegular: 'oceanid'
        },
    ],
    middle: [
        {
            type: 'terra',
            typeRegular: 'rocky'
        },
        {
            type: 'terra',
            typeRegular: 'oceanid'
        },
    ],
    semibig: [
        {
            type: 'superterra',
            typeRegular: 'rocky'
        },
        {
            type: 'superterra',
            typeRegular: 'oceanid'
        },
    ],
    big: [
        {
            type: 'neptunian',
            typeRegular: 'hydrogen'
        },
        {
            type: 'neptunian',
            typeRegular: 'water'
        },
    ],
    giant: [
        {
            type: 'jovian',
            typeRegular: 'hydrogen'
        },
        {
            type: 'jovian',
            typeRegular: 'water'
        },
    ]
};

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

module.exports = { types, mainSequenceRangeInStar, typesTemplates, earth, mainSequenceRangeInPlanet };