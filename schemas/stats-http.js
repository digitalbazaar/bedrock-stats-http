/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const storageQuery = {
  title: 'bedrock-stats-http storageQuery',
  type: 'object',
  required: ['monitorIds'],
  additionalProperties: false,
  properties: {
    endDate: {
      type: 'integer',
      min: 0
    },
    monitorIds: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    startDate: {
      type: 'integer',
      min: 0
    }
  }
};

module.exports.storageQuery = () => storageQuery;
