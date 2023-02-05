// --------------------------------------------------------------------------------
// stubs for action CustomerGetCustomer generated by Altair One content definition compiler.
// CustomerGetCustomerPre  [optional] precheck and setup resources required for action.
// CustomerGetCustomerRun  business logic of action and set outputs.
// CustomerGetCustomerPost [optional] postchecks and free resources aquired by action.
// *** DO NOT MODIFY STUB DEFINITIONS ***.
// --------------------------------------------------------------------------------
//Created from JsActionSrcTemplate
/**
 * @typedef {import("../../apis/js/altair/crm1/CustomerActions/CustomerGetCustomer").CustomerGetCustomerInputs} CustomerGetCustomerInputs
 * @typedef {import("../../apis/js/altair/crm1/CustomerActions/CustomerGetCustomer").CustomerGetCustomerOutputs} CustomerGetCustomerOutputs
 * @typedef {import("@altair/system").ActionContext} ActionContext
 */


/**
 * Implement business logic of action and set outputs
 * 
 * @param { CustomerGetCustomerInputs} inputs action inputs
 * @param { CustomerGetCustomerOutputs} outputs action outputs
 * @param {ActionContext} context action context
 */
async function  CustomerGetCustomerRun(inputs, outputs, context){

     const Content = require("@altair/system").Content;
     const ContentRef = require("@altair/system").ContentRef;
     let testRef = new ContentRef({session:context.session})
        testRef.id = inputs.id
        testRef.contentType = "altair.crm1.Customer"
     let getByRefOutputs = await Content.getByRef({contentRef:testRef, session:context.session})
     outputs.customerRef = getByRefOutputs.content
     let val = getByRefOutputs.content

     let rels = await val.getRelations({direction: "OUT", relationNames: ["customer_orders"]}); 
     console.log("rels............................", rels);
     let orders = await val.getRelatedContents({direction: "OUT", relationNames: ["customer_orders"]});	
     console.log("Orders....................", orders);
     outputs.orders = orders;
     outputs.countJson = (outputs.orders).length
}


module.exports = {
     CustomerGetCustomerRun}