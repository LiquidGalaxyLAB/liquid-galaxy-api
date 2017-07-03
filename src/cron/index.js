const CronTask = require('./CronTask');
const { up } = require('../services');

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
