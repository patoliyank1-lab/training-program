import { Worker } from "worker_threads";

export function nonBlockingCode(req, res, next) {
  // Task 1
  const startTime = performance.now();
  console.log("start");
  for (let i = 0; i <= 9999999999; i++) {} //  heavy task
  console.log("end");
  const endTime = performance.now();
  const duration = endTime - startTime;

  res.send(`response send in time: ${duration} milliseconds`);
}


export function blockingCode(req, res, next) {
  const worker = new Worker("./src/Worker/worker.js");
  // Task 1
  const startTime = performance.now();
  console.log("start");
  worker.on("message", (massage) => console.log(massage));
  worker.on("error", (error) => console.log(error));
  console.log("end");
  const endTime = performance.now();
  const duration = endTime - startTime;

  res.send(`response send in time: ${duration} milliseconds`);
}
