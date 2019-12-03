function percent(number, percent) {
    return (number / 100) * percent
}

const rand = function(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

module.exports = { percent, rand };