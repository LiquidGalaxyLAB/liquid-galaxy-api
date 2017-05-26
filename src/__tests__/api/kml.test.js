const { expect } = require('chai');
const sinon = require('sinon');
const config = require('config');
const fs = require('fs');

const kmlPath = config.get('kmlPath');
const tmpKmlPath = config.get('tmpKmlPath');

describe('KML', () => {
  describe('POST /kmls', () => {
    let stubWriteFile;

    beforeEach(() => {
      stubWriteFile = [];
      sinon.stub(fs, 'writeFile').callsFake((filename, contents) => {
        stubWriteFile.push({ filename, contents });
      });
    });

    afterEach(() => {
      fs.writeFile.restore();
    });

    it('should save the kml into the system when contents is given', async () => {
      const CONTENTS = '<?xml ...';

      const body = JSON.stringify({ contents: CONTENTS });
      const result = await fetchApi('/kmls', { headers, body, method: 'POST' });

      expect(result.status).to.equal(200);

      expect(stubWriteFile.length).to.equal(2);
      expect(stubWriteFile[0].filename).to.equal(tmpKmlPath);
      expect(stubWriteFile[0].contents).to.equal(CONTENTS);
      expect(stubWriteFile[1].filename).to.equal(kmlPath);
      expect(stubWriteFile[1].contents.startsWith(`file://${tmpKmlPath}?`)).to.equal(true);
    });

    it('should save the uri when uri is given', async () => {
      const URI = 'https://foo';

      const body = JSON.stringify({ uri: URI });
      const result = await fetchApi('/kmls', { headers, body, method: 'POST' });

      expect(result.status).to.equal(200);

      expect(stubWriteFile.length).to.equal(1);
      expect(stubWriteFile[0].filename).to.equal(kmlPath);
      expect(stubWriteFile[0].contents.startsWith(`file://${kmlPath}`));
    });

    it('should return 400 when kml nor uri are given', async () => {
      const result = await fetchApi('/kmls', { headers, method: 'POST' });

      expect(result.status).to.equal(400);
    });
  });
});
