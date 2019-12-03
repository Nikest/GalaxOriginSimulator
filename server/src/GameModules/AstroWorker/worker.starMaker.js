const workerThreads = require('worker_threads');

const { solar, mainSequenceRange, types } = require('./starValues');
const { percent, rand } = require('./math');

function makeRandomMainType() {
    const sRange = rand(0, 10000);
    return mainSequenceRange.find(t => {
        return sRange >= (t.count[0] * 100) && sRange <= (t.count[1] * 100)
    }).type;
}

function makeRandomYerkesType() {
    return rand(0, 9);
}

function getStarType(type) {
    return {
        main: type ? type[0] : makeRandomMainType(),
        yerkes: type ? type[1] : makeRandomYerkesType(),
        second: 'V',
        toString() {
            return this.main + this.yerkes + this.second
        }
    }
}

function calculateHabitableZone(luminosity) {
    return [
        Math.sqrt(luminosity / percent(solar.luminosity, 110)),
        Math.sqrt(luminosity / percent(solar.luminosity, 53)),
    ]
}

function init(props) {
    const starType = getStarType(props.type);
    const yerkesPercent = (starType.yerkes + 1) * 10;
    const typeTemplate = types.find(t => t.type === starType.main);

    let starProps = {
        type: starType.toString(),
        name: `GOC-${rand(1000, 9999)}-${rand(100, 999).toString(32).toUpperCase()}`,
    };

    Object.keys(typeTemplate).forEach(key => {
        const value = typeTemplate[key];

        if (typeof value !== 'string') {
            const from = value[1];
            const to = value[0];
            const range = to - from;

            starProps[key] = percent(range, yerkesPercent) + from;
        }
    });

    starProps.habitableZone = calculateHabitableZone(starProps.luminosity);

    return starProps;
}

workerThreads.parentPort.on('message', (props) => {
    const starProps = init(props);

    workerThreads.parentPort.postMessage(starProps);
});