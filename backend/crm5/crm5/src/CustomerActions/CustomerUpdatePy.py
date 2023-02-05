# --------------------------------------------------------------------------------
# stubs for action CustomerUpdatePy generated by Altair One content definition compiler.
# CustomerUpdatePyPre  [optional] precheck and setup resources required for action.
# CustomerUpdatePyRun  business logic of action and set outputs.
# CustomerUpdatePyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm2 import CustomerUpdatePyInputs
from altair.crm2 import CustomerUpdatePyOutputs
from altair.system.Content import Content,ContentRef



async def CustomerUpdatePyRun(inputs: CustomerUpdatePyInputs, outputs: CustomerUpdatePyOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomerUpdatePyInputs): action inputs
        outputs (CustomerUpdatePyOutputs): action outputs
        context (ActionContext): action context
    '''
    try:
        # output = await Content.findByAttributes(
        #     session=context.session,
        #     contentType='altair.crm1.Customer',
        #     data={"_key": inputs.id}
        # )
        # item = output.contents[0]
        # item.set("name", inputs.customer['name'])
        # item.set("email", inputs.customer['email'])
        # item = await item.update()
        # outputs.customer = 
        
        content1Ref = ContentRef(session=context.session)
        print("customerRef.......................................................:", inputs.id)
        content1Ref.id = inputs.id
        content1Ref.contentType = inputs.customer['system']['contentType']
        getByRefOutputs = await Content.getByRef(contentRef=content1Ref, session=context.session)
        content1 = getByRefOutputs.content
        print("content name:", inputs.customer['name'])
        content1.set("name", inputs.customer['name'])
        content1.set("cost", inputs.customer['email'])
        
        outputs.customer =  await content1.update()
    except Exception as e:
        import traceback
        print(traceback.format_exc())
