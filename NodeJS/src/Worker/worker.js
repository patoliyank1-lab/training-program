import { parentPort, workerData } from 'worker_threads'
    for (let i = 0; i <= 9999999999; i++ ) {}; //  heavy task
         parentPort.postMessage('Blocking operation successfully completed');