const solar = {
    mass: 1.989E30,
    radius: 695510,
    luminosity: 3.828 * 10e26
};

export const starDescriptor = {
    getRadius(size: number) {
        return (size / solar.radius).toFixed(2)
    },
    getMass(mass: number) {
        return (mass / solar.mass).toFixed(2)
    },
    getLuminosity(luminosity: number) {
        return (luminosity / solar.luminosity).toFixed(2)
    }
};
