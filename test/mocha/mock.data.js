/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const uuid = require('uuid-random');

exports.reportStartTime = 1519749871;
const reports = exports.reports = {};

// two monitors report throughout
reports.set1 = [];
for(let i = 0; i < 100; ++i) {
  // simulate reports generated at 1 sec intervals
  const createdDate = exports.reportStartTime + (i * 1000);
  const aReport = {};
  const bReport = {};
  for(let k = 0; k < 5; ++k) {
    aReport[k] = uuid();
    bReport[k] = uuid();
  }
  const report = {createdDate, monitors: {a: aReport, b: bReport}};
  reports.set1.push(report);
}

// a reports through, but b starts at 5
reports.set2 = [];
for(let i = 0; i < 10; ++i) {
  // simulate reports generated at 1 sec intervals
  const createdDate = exports.reportStartTime + (i * 1000);
  const aReport = {};
  const bReport = {};
  for(let k = 0; k < 5; ++k) {
    aReport[k] = uuid();
    if(i >= 5) {
      bReport[k] = uuid();
    }
  }
  const report = {createdDate, monitors: {a: aReport}};
  if(Object.keys(bReport).length > 0) {
    report.monitors.b = bReport;
  }
  reports.set2.push(report);
}
