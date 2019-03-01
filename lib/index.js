/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {asyncHandler} = require('bedrock-express');
const bedrock = require('bedrock');
const brStats = require('bedrock-stats');
const {config} = bedrock;
const intParser = require('express-query-int');
const {validate} = require('bedrock-validation');
/* eslint-disable-next-line no-unused-vars */
const {ensureAuthenticated} = require('bedrock-passport');

require('./config');
const cfg = config['stats-http'];

bedrock.events.on('bedrock-express.configure.routes', app => {
  const {storagePath} = cfg.routes;
  app.get(
    storagePath,
    // ensureAuthenticated,
    intParser(),
    validate({query: 'stats-http.storageQuery'}),
    asyncHandler(async (req, res) => {
      const {storageApi} = req.params;
      const {query} = req;
      const result = await brStats.getReports({query, storageApi});
      res.json(result);
    }));
});
