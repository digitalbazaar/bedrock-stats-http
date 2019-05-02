/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const path = require('path');
const {config} = require('bedrock');

const cfg = config['stats-http'] = {};

const basePath = '/stats';
const storagePath = `${basePath}/storage/:storageApi`;
const monitorPath = `${storagePath}/monitors`;
cfg.routes = {
  basePath,
  monitorPath,
  storagePath,
};

config.validation.schema.paths.push(
  path.join(__dirname, '..', 'schemas')
);
