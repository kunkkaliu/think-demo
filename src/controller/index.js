const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    await this.__call();
  }

  async __call() {
    this.assign('context', {
      name: 'dhl',
      time: +new Date(),
    });
    await this.display('index');
  }
};
