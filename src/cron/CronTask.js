const { CronJob } = require('cron');

const log = require('../helpers/log');

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

module.exports = CronTask;
