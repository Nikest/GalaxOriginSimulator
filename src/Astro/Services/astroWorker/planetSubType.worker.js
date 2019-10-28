function percent(number, percent) {
    return (number / 100) * percent
}

const rand = function(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const terraTypesNames = {
    selena: 'minioceanid',
    subterra: 'suboceanid',
    terra: 'oceanid',
    superterra: 'superoceanid'
};

function getSubType(type, orbitZone) {
    if(type === 'jovian' && type === 'neptunian') return type;
    if(orbitZone === 0 && type === 'selena') return type;
    if(orbitZone === 0 && type === 'subterra') return type;

    return (rand(0, 100) <= 10) ? terraTypesNames[type] : type
}


self.onmessage = function ({data}) {
    const { habitable, type, orbitRadius } = data;
    const props = {
        orbitZone: 1,
        type: ''
    };

    // habitable position
    if (orbitRadius < habitable[0]) props.orbitZone = 0;
    if (orbitRadius > habitable[1]) props.orbitZone = 2;

    props.type = getSubType(type, props.orbitZone);


    postMessage({...props})
};
