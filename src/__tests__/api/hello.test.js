const { expect } = require('chai');

describe('Hello', () => {
  describe('GET /', () => {
    it('should display { msg: \'It works!\' }', async () => {
      const result = await fetchApi('/');
      expect(result.status).to.equal(200);
      const json = await result.json();
      expect(json).to.eql({ msg: 'It works!' });
    });
  });
});
