const workerThreads = require('worker_threads');

workerThreads.parentPort.on('message', (props) => {

    workerThreads.parentPort.postMessage();
});