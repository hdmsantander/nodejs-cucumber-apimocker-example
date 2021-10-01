'use strict';

const apickli = require('apickli');
const { Before } = require('@cucumber/cucumber');

Before(function () {
  // Load env vars to define target of tests
  let useMock = process.env.USE_MOCK_FOR_TESTS ?? false;

  // Define protocol and target. Use local server if mock use is enabled.
  let protocol, target;

  if (useMock == 'true') {
    protocol = 'http';
    target = 'localhost:8080';
  } else {
    protocol = 'https';
    target = 'petstore.swagger.io/v2';
  }

  console.log(`Using ${protocol} with the target ${target} for tests`);

  this.apickli = new apickli.Apickli(protocol, target);
  this.apickli.addRequestHeader('Cache-Control', 'no-cache');
});
