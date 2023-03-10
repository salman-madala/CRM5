// --------------------------------------------------------------------------------
// stubs for action CustomerCreateCustomer generated by Altair One content definition compiler.
// CustomerCreateCustomerPre  [optional] precheck and setup resources required for action.
// CustomerCreateCustomerRun  business logic of action and set outputs.
// CustomerCreateCustomerPost [optional] postchecks and free resources aquired by action.
// *** DO NOT MODIFY STUB DEFINITIONS ***.
// --------------------------------------------------------------------------------
//Created from JsActionSrcTemplate
/**
 * @typedef {import("../../apis/js/altair/crm1/CustomerActions/CustomerCreateCustomer").CustomerCreateCustomerInputs} CustomerCreateCustomerInputs
 * @typedef {import("../../apis/js/altair/crm1/CustomerActions/CustomerCreateCustomer").CustomerCreateCustomerOutputs} CustomerCreateCustomerOutputs
 * @typedef {import("@altair/system").ActionContext} ActionContext
 */


/**
 * Implement business logic of action and set outputs
 * 
 * @param { CustomerCreateCustomerInputs} inputs action inputs
 * @param { CustomerCreateCustomerOutputs} outputs action outputs
 * @param {ActionContext} context action context
 */
async function  CustomerCreateCustomerRun(inputs, outputs, context){

     const Content = require("@altair/system").Content;
     var session = context.session;
     var {content} = await Content.create({session, contentType: "altair.crm1.Customer", data: inputs});
     outputs.customerRef = content;

}


module.exports = {
     CustomerCreateCustomerRun}