/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';
const path = require('path');
const {config} = require('bedrock');

const cfg = config['stats-http'] = {};

const basePath = '/stats';
cfg.routes = {
  basePath,
  storagePath: `${basePath}/storage/:storageApi`,
};

config.validation.schema.paths.push(
  path.join(__dirname, '..', 'schemas')
);
