const { expect } = require('chai');

describe('⚡︎ Hello', () => {
  describe('G:/', () => {
    it('should display { msg: \'It works!\' }', (done) => {
      socketio.emit('G:/', undefined, (reply) => {
        expect(reply).to.eql({ msg: 'It works!' });
        done();
      });
    });
  });
});
