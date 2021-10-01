'use strict';

const prettyJson = require('prettyjson');
const assert = require('assert');

const prettyPrintJson = function (json) {
  const output = {
    stepContext,
    testOutput: json,
  };

  return prettyJson.render(output, {
    noColor: true,
  });
};

const callbackWithAssertion = function (callback, assertion) {
  if (assertion.success) {
    callback();
  } else {
    callback(prettyPrintJson(assertion));
  }
};

// Declare our own step definitions
const { Given, When, Then } = require('@cucumber/cucumber');

Given(/^I go to the (.*) section$/, function (section) {
  if (section === 'pet') this.target = '/pet';
});

When(/^I look for pets that (.*)$/, function (petStatus, callback) {
  if (petStatus === 'are available for adoption') {
    this.target = this.target.concat('/findByStatus?status=available');
  }

  if (petStatus === 'were adopted') {
    this.target = this.target.concat('/findByStatus?status=sold');
  }

  if (petStatus === 'are being adopted') {
    this.target = this.target.concat('/findByStatus?status=pending');
  }

  if (petStatus === 'are sad') {
    this.target = this.target.concat('/findByStatus?status=sad');
  }

  this.apickli.get(this.target, function (error, response) {
    if (error) {
      callback(new Error(error));
    }

    callback();
  });
});

Then(/^I should get a list of pets$/, function (callback) {
  const assertion = this.apickli.assertPathIsArray('$');
  callbackWithAssertion(callback, assertion);
});

Then(/^I should get an empty list of pets$/, function (callback) {
  const assertion = this.apickli.assertPathIsArray('$');

  assert(assertion.success);
  assert(JSON.parse(this.apickli.getResponseObject().body).length === 0);

  callbackWithAssertion(callback, assertion);
});

Then(/^Every pet in the list of pets should be (.*)$/, function (
  petStatus,
  callback
) {
  const petList = JSON.parse(this.apickli.getResponseObject().body);

  let desiredStatus;

  if (petStatus === 'adoptable') {
    desiredStatus = 'available';
  }

  if (petStatus === 'adopted') {
    desiredStatus = 'sold';
  }

  if (petStatus === 'in the process of being adopted') {
    desiredStatus = 'pending';
  }

  for (const pet of petList) {
    assert(pet.status === desiredStatus);
  }

  callback();
});
