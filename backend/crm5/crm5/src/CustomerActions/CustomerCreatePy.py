# --------------------------------------------------------------------------------
# stubs for action CustomerCreatePy generated by Altair One content definition compiler.
# CustomerCreatePyPre  [optional] precheck and setup resources required for action.
# CustomerCreatePyRun  business logic of action and set outputs.
# CustomerCreatePyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm1 import CustomerCreatePyInputs
from altair.crm1 import CustomerCreatePyOutputs
from altair.system import Content

async def CustomerCreatePyRun(inputs: CustomerCreatePyInputs, outputs: CustomerCreatePyOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomerCreatePyInputs): action inputs
        outputs (CustomerCreatePyOutputs): action outputs
        context (ActionContext): action context
    '''
    session = context.session;
    content = await Content.create(session=session, contentType= "altair.crm2.Customer", data= inputs);
    outputs.customerRef = content;

