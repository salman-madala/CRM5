/* --------------------------------------------------------------------------------
 * Copyright: Altair Engineering Inc., 2022. All rights reserved.
 * Contains trade secrets of Altair Engineering, Inc.
 * Copyright notice does not imply publication.
 * Decompilation or disassembly of this software is strictly prohibited.
 * --------------------------------------------------------------------------------*/

import { Session } from "@altair/system";

let session;
const serverUrl = `${window.location.origin}/api/objectstore`;

export const getSession = async () => {
    if (!session) {
      session = await Session.Create({ serverUrl });
    }
    return session;
  };
