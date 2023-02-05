# --------------------------------------------------------------------------------
# stubs for action ItemDeleteItem generated by Altair One content definition compiler.
# ItemDeleteItemPre  [optional] precheck and setup resources required for action.
# ItemDeleteItemRun  business logic of action and set outputs.
# ItemDeleteItemPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext,Content
from altair.crm5 import ItemDeleteItemInputs
from altair.crm5 import ItemDeleteItemOutputs


async def ItemDeleteItemRun(inputs: ItemDeleteItemInputs, outputs: ItemDeleteItemOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (ItemDeleteItemInputs): action inputs
        outputs (ItemDeleteItemOutputs): action outputs
        context (ActionContext): action context
    '''
    output = await Content.findByAttributes(session= context.session,
           contentType= "altair.crm5.Item",
           data= {"_key": inputs.id}
     )
    content1 = output.contents[0];
    await content1.delete();
    outputs.status = "Item deleted";

