import { generateHash } from 'Services';
import has = Reflect.has;

declare const io: Function;
const socket = io();

interface IMakeRequest {
    sendRequest(data: any, callback: Function)
}

export const requester = {
    makeRequest(event: string): Promise<IMakeRequest> {
        const hash = generateHash();

        return new Promise(res => {
            socket.emit('onListener', {hash, event});

            socket.on(`created_${hash}`, () => {
                socket.removeListener(`created_${hash}`);

                res({
                    sendRequest(data: any, callback: Function, closing: boolean = true) {
                        socket.on(hash, (data) => {
                            callback(data);
                            closing && socket.removeListener(hash);
                        });

                        socket.emit(hash, data);
                    }
                });
            });
        })
    }
};