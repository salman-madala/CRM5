// --------------------------------------------------------------------------------
// stubs for action ItemDeleteItem generated by Altair One content definition compiler.
// ItemDeleteItemPre  [optional] precheck and setup resources required for action.
// ItemDeleteItemRun  business logic of action and set outputs.
// ItemDeleteItemPost [optional] postchecks and free resources aquired by action.
// *** DO NOT MODIFY STUB DEFINITIONS ***.
// --------------------------------------------------------------------------------
//Created from JsActionSrcTemplate
/**
 * @typedef {import("../../apis/js/altair/crm1/ItemActions/ItemDeleteItem").ItemDeleteItemInputs} ItemDeleteItemInputs
 * @typedef {import("../../apis/js/altair/crm1/ItemActions/ItemDeleteItem").ItemDeleteItemOutputs} ItemDeleteItemOutputs
 * @typedef {import("@altair/system").ActionContext} ActionContext
 */


/**
 * Implement business logic of action and set outputs
 * 
 * @param { ItemDeleteItemInputs} inputs action inputs
 * @param { ItemDeleteItemOutputs} outputs action outputs
 * @param {ActionContext} context action context
 */
async function  ItemDeleteItemRun(inputs, outputs, context){

     const Content = require("@altair/system").Content;
     const session = context.session;
     const output = await Content.findByAttributes({session: session,
           contentType: "altair.crm1.Item",
           data: {_key: inputs.id}
     });
     content1 = output.get('contents')[0];
     await content1.delete();
     outputs.status = "Item deleted";

}


module.exports = {
     ItemDeleteItemRun}