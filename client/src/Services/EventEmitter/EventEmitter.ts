const subscriberEvents = {};

const subscribe = (eventName: string, fn: Function) => {
    if (!subscriberEvents[eventName]) {
        subscriberEvents[eventName] = [];
    }

    subscriberEvents[eventName].push(fn);
};

const emit = (eventName: string, data: any = null) => {
    subscriberEvents[eventName] && subscriberEvents[eventName].forEach(fn => fn(data))
};

export const eventName = {

};

export const eventEmitter = {
    subscribe, emit
};
