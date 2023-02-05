// --------------------------------------------------------------------------------
// Autogenerated by Altair One content definition compiler.
// Do not modify this file.
// --------------------------------------------------------------------------------
const Factory = require("@altair/system").Factory;

const pack = {

        // definitions
         ...require('./Customer'),
         ...require('./CustomerActions'),
         ...require('./CustomFileEntity'),
         ...require('./CustomFileEntityActions'),
         ...require('./File'),
         ...require('./FileActions'),
         ...require('./Item'),
         ...require('./ItemActions'),
         ...require('./Order'),
         ...require('./OrderActions')
}

if (global.window) {
    Factory.register("@altair/crm5", pack);
}

module.exports = pack;