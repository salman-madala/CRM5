// --------------------------------------------------------------------------------
// stubs for action ItemDeleteAll generated by Altair One content definition compiler.
// ItemDeleteAllPre  [optional] precheck and setup resources required for action.
// ItemDeleteAllRun  business logic of action and set outputs.
// ItemDeleteAllPost [optional] postchecks and free resources aquired by action.
// *** DO NOT MODIFY STUB DEFINITIONS ***.
// --------------------------------------------------------------------------------
//Created from JsActionSrcTemplate
/**
 * @typedef {import("../../apis/js/altair/crm1/ItemActions/ItemDeleteAll").ItemDeleteAllInputs} ItemDeleteAllInputs
 * @typedef {import("../../apis/js/altair/crm1/ItemActions/ItemDeleteAll").ItemDeleteAllOutputs} ItemDeleteAllOutputs
 * @typedef {import("@altair/system").ActionContext} ActionContext
 */


/**
 * Implement business logic of action and set outputs
 * 
 * @param { ItemDeleteAllInputs} inputs action inputs
 * @param { ItemDeleteAllOutputs} outputs action outputs
 * @param {ActionContext} context action context
 */
async function  ItemDeleteAllRun(inputs, outputs, context){

     const Content = require("@altair/system").Content;
     const session = context.session;
     const output = await Content.findByAttributes({session: session,
           contentType: "altair.crm1.Item"});
     content1 = output.get('contents');
     await content1.delete();
     outputs.status = "items deleted";

}


module.exports = {
     ItemDeleteAllRun}