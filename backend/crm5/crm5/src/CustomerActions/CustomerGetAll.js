// --------------------------------------------------------------------------------
// stubs for action CustomerGetAll generated by Altair One content definition compiler.
// CustomerGetAllPre  [optional] precheck and setup resources required for action.
// CustomerGetAllRun  business logic of action and set outputs.
// CustomerGetAllPost [optional] postchecks and free resources aquired by action.
// *** DO NOT MODIFY STUB DEFINITIONS ***.
// --------------------------------------------------------------------------------
//Created from JsActionSrcTemplate
/**
 * @typedef {import("../../apis/js/altair/crm1/CustomerActions/CustomerGetAll").CustomerGetAllInputs} CustomerGetAllInputs
 * @typedef {import("../../apis/js/altair/crm1/CustomerActions/CustomerGetAll").CustomerGetAllOutputs} CustomerGetAllOutputs
 * @typedef {import("@altair/system").ActionContext} ActionContext
 */


/**
 * Implement business logic of action and set outputs
 * 
 * @param { CustomerGetAllInputs} inputs action inputs
 * @param { CustomerGetAllOutputs} outputs action outputs
 * @param {ActionContext} context action context
 */
async function  CustomerGetAllRun(inputs, outputs, context){
     const Search = require("@altair/system").Search;
     const session = context.session;
     const response = await Search.search({
          session,
          filter: 'system.contentType is @contentType',
          bindVars: {
             contentType: "altair.crm1.Customer"
          }
     });
     
     outputs.customers = response.entities;

}


module.exports = {
     CustomerGetAllRun}