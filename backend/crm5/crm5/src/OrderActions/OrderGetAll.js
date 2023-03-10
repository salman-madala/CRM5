// --------------------------------------------------------------------------------
// stubs for action OrderGetAll generated by Altair One content definition compiler.
// OrderGetAllPre  [optional] precheck and setup resources required for action.
// OrderGetAllRun  business logic of action and set outputs.
// OrderGetAllPost [optional] postchecks and free resources aquired by action.
// *** DO NOT MODIFY STUB DEFINITIONS ***.
// --------------------------------------------------------------------------------
//Created from JsActionSrcTemplate
/**
 * @typedef {import("../../apis/js/altair/crm1/OrderActions/OrderGetAll").OrderGetAllInputs} OrderGetAllInputs
 * @typedef {import("../../apis/js/altair/crm1/OrderActions/OrderGetAll").OrderGetAllOutputs} OrderGetAllOutputs
 * @typedef {import("@altair/system").ActionContext} ActionContext
 */


/**
 * Implement business logic of action and set outputs
 * 
 * @param { OrderGetAllInputs} inputs action inputs
 * @param { OrderGetAllOutputs} outputs action outputs
 * @param {ActionContext} context action context
 */
async function  OrderGetAllRun(inputs, outputs, context){

     const Search = require("@altair/system").Search;
     const session = context.session;
     const response = await Search.search({
          session,
          filter: 'system.contentType is @contentType',
          bindVars: {
             contentType: "altair.crm1.Order"
          }
     });
     
     outputs.orders = response.entities;



}


module.exports = {
     OrderGetAllRun}