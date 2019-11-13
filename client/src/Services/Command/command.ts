const commands = {};

function on(command: string, fn: Function) {
    commands[command] ? commands[command].push(fn) : commands[command] = [fn]
}

function send(command: string, data: any = null) {
    commands[command] ? commands[command].forEach(c => c(data)) : false
}

export const command = {on, send};
