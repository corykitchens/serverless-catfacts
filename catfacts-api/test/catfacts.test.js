const { getRandomFact } = require('../catfacts');

describe('Cat Facts API', () => {
  test('should return a random cat fact', (done) => {
    getRandomFact((err, fact) => {
      expect(err).toBeNull();
      expect(fact).toBeTruthy();
      done();
    })
  })
})