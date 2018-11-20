const request = require("request");

const retrieveFactsFromApi = cb => {
  const BASE_URL = "https://cat-fact.herokuapp.com";
  request.get(`${BASE_URL}/facts`, { json: true }, (err, res, body) => {
    if (err) {
      cb(err, null);
    } else {
      if (body instanceof Object && body.hasOwnProperty("all")) {
        const facts = body.all.map(fact => fact.text);
        cb(null, facts);
      } else {
        cb(new Error("Invalid response from API"), null);
      }
    }
  });
};

const getFacts = cb => {
  retrieveFactsFromApi((err, facts) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, facts);
    }
  });
};

const getRandomFact = cb => {
  getFacts((err, facts) => {
    if (err) {
      cb(err, null);
    } else {
      const fact = facts[Math.floor(Math.random() * facts.length)];
      cb(null, fact);
    }
  });
};

exports.getFactsHandler = (event, context, callback) => {
  getFacts((error, facts) => {
    if (error) {
      const errorResponse = {
        statusCode: 500,
        body: JSON.stringify({ error })
      };
      callback(errorResponse, null);
    } else {
      const successfulResponse = {
        statusCode: 200,
        body: JSON.stringify({ facts })
      };
      callback(null, successfulResponse);
    }
  });
};

exports.getFactHandler = (event, context, cb) => {
  getRandomFact((error, fact) => {
    if (error) {
      const errorResponse = {
        statusCode: 500,
        body: JSON.stringify({ error })
      };
      cb(errorResponse, null);
    } else {
      const successfulResponse = {
        statusCode: 200,
        body: JSON.stringify({ fact })
      };
      cb(null, successfulResponse);
    }
  });
};

exports.getRandomFact = getRandomFact;
