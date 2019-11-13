import { storeInterface } from 'Services';

declare const io: Function;
const socket = io();

socket.on('viewSystem', ({system}) => {
    storeInterface().setData('viewSystem', JSON.parse(system))
});

export const requester = {
    getSystem() {
        socket.emit('viewSystem')
    },
    getGalaxyCoords(x, y, z) {
        socket.emit('galaxyCoords', {x, y, z})
    }
};