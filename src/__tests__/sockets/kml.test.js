const { expect } = require('chai');

describe('KML', () => {
  describe('P:/kmls', () => {
    it('should call createKml controller', (done) => {
      socketio.emit('P:/kmls', {}, (reply) => {
        expect(reply).to.eql({ error: 'Either Contents or Uri must be defined.' });
        done();
      });
    });
  });
});
