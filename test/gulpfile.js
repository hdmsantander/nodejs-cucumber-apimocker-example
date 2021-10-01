var { series } = require('gulp');
var reporter = require('cucumber-html-reporter');

var reporterOptions = {
  theme: 'bootstrap',
  jsonFile: '../test/report/cucumber_report.json',
  output: '../cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'INTEGRACIÓN',
    Browser: 'Chrome 94.0.4606.61',
    Platform: 'Windows 10',
    Parallel: 'Scenarios',
    Executed: 'Local',
  },
};

async function report() {
  reporter.generate(reporterOptions);
}

exports.report = report;
exports.default = series(report);
