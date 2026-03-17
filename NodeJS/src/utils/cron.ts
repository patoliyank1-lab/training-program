import cron from "node-cron";
import fsExtra from "fs-extra";

const directoryPath = "./uploads";

export const imageRemoveCronJob = async (cronExpression: string) => {
  console.log("start");

  const task = cron.schedule(cronExpression, () => {
    console.log(`[Cron Job] Starting task: ${new Date().toLocaleString()}`);
    try {
      fsExtra.emptyDir(directoryPath, (err) => {
        if (err) {
          console.error(`Error clearing directory: ${err}`);
        } else {
          console.log(`All files in ${directoryPath} removed.`);
        }
      });
    } catch (err) {
      console.error(`Error clearing directory: ${err}`);
    }
  });

  return task;
};
