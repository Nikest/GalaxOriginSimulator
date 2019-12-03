const { percent } = require('./math');

const solar = {
    mass: 1.989e30,
    radius: 695510,
    luminosity: 3.828 * 10e26,
    effTemperature: 5778
};

const mainSequenceRange = [
    {
        count: [0, 76.45],
        type: 'M'
    }, {
        count: [76.45, 88.55],
        type: 'K'
    }, {
        count: [88.55, 96.16],
        type: 'G'
    }, {
        count: [96.16, 99.17],
        type: 'F'
    }, {
        count: [99.17, 99.78],
        type: 'A'
    }, {
        count: [99.78, 99.97],
        type: 'B'
    }, {
        count: [99.97, 100],
        type: 'O'
    }
];

const types = [
    {
        type: 'M',
        mass: [percent(solar.mass, 45), percent(solar.mass, 8)],
        radius: [percent(solar.radius, 65), percent(solar.radius, 8)],
        luminosity: [percent(solar.luminosity, 7.5), percent(solar.luminosity, 0.015)],
        effTemperature: [3700, 2300],
        R: [255, 255],
        G: [187, 195],
        B: [119, 130]
    }, {
        type: 'K',
        mass: [percent(solar.mass, 80), percent(solar.mass, 45)],
        radius: [percent(solar.radius, 90), percent(solar.radius, 65)],
        luminosity: [percent(solar.luminosity, 60), percent(solar.luminosity, 7.5)],
        effTemperature: [5200, 3700],
        R: [255, 255],
        G: [195, 235],
        B: [130, 210]
    },{
        type: 'G',
        mass: [percent(solar.mass, 104), percent(solar.mass, 80)],
        radius: [percent(solar.radius, 115), percent(solar.radius, 90)],
        luminosity: [percent(solar.luminosity, 150), percent(solar.luminosity, 60)],
        effTemperature: [6000, 5200],
        R: [255, 255],
        G: [235, 247],
        B: [210, 240]
    },{
        type: 'F',
        mass: [percent(solar.mass, 140), percent(solar.mass, 104)],
        radius: [percent(solar.radius, 140), percent(solar.radius, 115)],
        luminosity: [percent(solar.luminosity, 500), percent(solar.luminosity, 150)],
        effTemperature: [7500, 6000],
        R: [255, 228],
        G: [247, 232],
        B: [240, 255]
    },{
        type: 'A',
        mass: [percent(solar.mass, 210), percent(solar.mass, 140)],
        radius: [percent(solar.radius, 180), percent(solar.radius, 140)],
        luminosity: [percent(solar.luminosity, 2500), percent(solar.luminosity, 500)],
        effTemperature: [10000, 7500],
        R: [228, 180],
        G: [232, 200],
        B: [255, 255]
    },{
        type: 'B',
        mass: [percent(solar.mass, 1600), percent(solar.mass, 210)],
        radius: [percent(solar.radius, 660), percent(solar.radius, 180)],
        luminosity: [percent(solar.luminosity, 3000000), percent(solar.luminosity, 2500)],
        effTemperature: [30000, 10000],
        R: [180, 160],
        G: [200, 183],
        B: [255, 255]
    },{
        type: 'O',
        mass: [percent(solar.mass, 90), percent(solar.mass, 1600)],
        radius: [percent(solar.radius, 1200), percent(solar.radius, 660)],
        luminosity: [percent(solar.luminosity, 950000000), percent(solar.luminosity, 3000000)],
        effTemperature: [60000, 30000],
        R: [160, 140],
        G: [183, 160],
        B: [255, 255]
    },
];

module.exports = { solar, mainSequenceRange, types };