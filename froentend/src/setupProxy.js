/* --------------------------------------------------------------------------------
 * Copyright: Altair Engineering, Inc., 2020.  All rights reserved.
 * Contains trade secrets of Altair Engineering, Inc.
 * Copyright notice does not imply publication.
 * Decompilation or disassembly of this software is strictly prohibited.
 * --------------------------------------------------------------------------------*/

const proxy = require('@altair/react-dev-proxy');

module.exports = proxy({
  remote: 'https://dev.az.altairone.com',
  proxies: [
    {
      path: '/api/*',
      target: 'http://localhost:3350/',
    },
    {
      path: '/api',
      target: 'http://localhost:3350/',
    },
    {
      path: '/apis/*',
      target: 'http://localhost:3350/',
    },
    {
      path: '/apis',
      target: 'http://localhost:3350/',
    },
    {
      path: '/assets/*',
      target: 'http://localhost:3350/',
    },
    {
      path: '/ws',
      target: 'http://localhost:3350/',
      ws: true,
    },
  ],
});
