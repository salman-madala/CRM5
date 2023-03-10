# --------------------------------------------------------------------------------
# stubs for action CustomerDeletePy generated by Altair One content definition compiler.
# CustomerDeletePyPre  [optional] precheck and setup resources required for action.
# CustomerDeletePyRun  business logic of action and set outputs.
# CustomerDeletePyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm1 import CustomerDeletePyInputs
from altair.crm1 import CustomerDeletePyOutputs
from altair.system import Content

async def CustomerDeletePyRun(inputs: CustomerDeletePyInputs, outputs: CustomerDeletePyOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomerDeletePyInputs): action inputs
        outputs (CustomerDeletePyOutputs): action outputs
        context (ActionContext): action context
    '''
    try:
        output = await Content.findByAttributes(
            session= context.session,
            contentType= "altair.crm2.Customer",
            data= {"_key": inputs.id}
        )
        customerRef = output.contents[0]
        await customerRef.delete()
    except Exception as e:
        import traceback
        print(e)
        print(traceback.format_exc())

