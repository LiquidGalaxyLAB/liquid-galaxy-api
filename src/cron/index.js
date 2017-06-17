const { CronJob } = require('cron');

const log = require('../helpers/log');
const { up } = require('../services');

class CronTask {
  constructor(name, cronTime, action) {
    const newAction = async () => {
      log.dev(`[CRON] Started "${name}"`);
      await action();
      log.dev(`[CRON] Finished "${name}"`);
    };
    this.cronJob = new CronJob(cronTime, newAction);
  }
}

const cronTasks = [
  new CronTask('Report Alive', '0,30 * * * * *', () => up.reportAlive()),
];

function startAll() {
  this.cronTasks.map(cronTask => cronTask.cronJob.start());
}

module.exports = {
  cronTasks,
  startAll,
};
