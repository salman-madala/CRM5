# --------------------------------------------------------------------------------
# stubs for action ItemUpdateItem generated by Altair One content definition compiler.
# ItemUpdateItemPre  [optional] precheck and setup resources required for action.
# ItemUpdateItemRun  business logic of action and set outputs.
# ItemUpdateItemPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm5 import ItemUpdateItemInputs
from altair.crm5 import ItemUpdateItemOutputs
from altair.system.Content import Content,ContentRef


async def ItemUpdateItemRun(inputs: ItemUpdateItemInputs, outputs: ItemUpdateItemOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (ItemUpdateItemInputs): action inputs
        outputs (ItemUpdateItemOutputs): action outputs
        context (ActionContext): action context
    '''
    content1Ref = ContentRef(session=context.session)
    print("itemRef.......................................................:", inputs.itemRef['id'])
    content1Ref.id = inputs.itemRef['id']
    content1Ref.contentType = inputs.itemRef['system']['contentType']
    getByRefOutputs = await Content.getByRef(contentRef=content1Ref, session=context.session)
    content1 = getByRefOutputs.content
    print("content name:", inputs.itemRef['name'])
    content1.set("name", inputs.itemRef['name'])
    content1.set("cost", inputs.itemRef['cost'])
    
    outputs.itemRef =  await content1.update()

