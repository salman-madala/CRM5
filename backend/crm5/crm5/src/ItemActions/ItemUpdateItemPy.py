# --------------------------------------------------------------------------------
# stubs for action ItemUpdateItemPy generated by Altair One content definition compiler.
# ItemUpdateItemPyPre  [optional] precheck and setup resources required for action.
# ItemUpdateItemPyRun  business logic of action and set outputs.
# ItemUpdateItemPyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm1 import ItemUpdateItemPyInputs
from altair.crm1 import ItemUpdateItemPyOutputs
from altair.system.Content import Content,ContentRef

async def ItemUpdateItemPyRun(inputs: ItemUpdateItemPyInputs, outputs: ItemUpdateItemPyOutputs, context: ActionContext):
    
   
    content1Ref = ContentRef(session=context.session)
    print("itemRef.......................................................:", inputs.itemRef['id'])
    content1Ref.id = inputs.itemRef['id']
    content1Ref.contentType = inputs.itemRef['system']['contentType']
    getByRefOutputs = await Content.getByRef(contentRef=content1Ref, session=context.session)
    content1 = getByRefOutputs.content
    print("content name:", inputs.itemRef['name'])
    content1.set("name", inputs.itemRef['name'])
    content1.set("cost", inputs.itemRef['cost'])
    
    outputs.ref =  await content1.update()

