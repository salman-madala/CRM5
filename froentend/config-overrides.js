/* --------------------------------------------------------------------------------
 * Copyright: Altair Engineering, Inc., 2020.  All rights reserved.
 * Contains trade secrets of Altair Engineering, Inc.
 * Copyright notice does not imply publication.
 * Decompilation or disassembly of this software is strictly prohibited.
 * --------------------------------------------------------------------------------*/

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    path: false,
    util: false,
    fs: false,
  });
  config.resolve.fallback = fallback;
  return config;
};
