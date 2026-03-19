import { parentPort } from "worker_threads";
for (let i = 0; i <= 9999999999; i++); //  heavy task
if (parentPort)
  parentPort.postMessage("Blocking operation successfully completed");
