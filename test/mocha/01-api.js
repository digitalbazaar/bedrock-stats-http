/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const cache = require('bedrock-redis');
const {config, util: {clone}} = require('bedrock');
const {create} = require('apisauce');
const https = require('https');
const mockData = require('./mock.data');
const storage = require('bedrock-stats-storage-redis');

let api;
const baseURL =
 `https://${config.server.host}${config['stats-http'].routes.basePath}`;

describe('Redis storage API', () => {
  before(() => {
    api = create({
      baseURL,
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    });
  });
  it('properly returns all reports in report set one', async () => {
    await _initSet('set1');
    const result = await api.get('/storage/redis', {monitorIds: ['a', 'b']});
    result.data.should.eql(mockData.reports.set1);
  });
  it('properly returns all reports in report set two', async () => {
    await _initSet('set2');
    const result = await api.get('/storage/redis', {monitorIds: ['a', 'b']});
    result.data.should.eql(mockData.reports.set2);
  });
  it('performs a query with startDate', async () => {
    await _initSet('set1');
    const startDate = mockData.reportStartTime + 50000;
    const query = {monitorIds: ['a', 'b'], startDate};
    const result = await api.get('/storage/redis', query);
    result.data.should.eql(mockData.reports.set1.slice(50));
  });
  it('performs a query with endDate', async () => {
    await _initSet('set1');
    const endDate = mockData.reportStartTime + 50000;
    const query = {endDate, monitorIds: ['a', 'b']};
    const result = await api.get('/storage/redis', query);
    result.data.should.eql(mockData.reports.set1.slice(0, 51));
  });
  it('performs a query for monitor "a"', async () => {
    await _initSet('set1');
    const query = {monitorIds: ['a']};
    const result = await api.get('/storage/redis', query);
    const expectedSet = clone(mockData.reports.set1);
    for(const report of expectedSet) {
      delete report.monitors.b;
    }
    result.data.should.eql(expectedSet);
  });
  it('performs a query for monitor "b"', async () => {
    await _initSet('set1');
    const query = {monitorIds: ['b']};
    const result = await api.get('/storage/redis', query);
    const expectedSet = clone(mockData.reports.set1);
    for(const report of expectedSet) {
      delete report.monitors.a;
    }
    result.data.should.eql(expectedSet);
  });
});

async function _initSet(setId) {
  await cache.client.flushall();
  for(const report of mockData.reports[setId]) {
    await storage.insert({report});
  }
}
