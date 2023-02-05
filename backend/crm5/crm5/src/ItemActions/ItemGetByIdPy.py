# --------------------------------------------------------------------------------
# stubs for action ItemGetByIdPy generated by Altair One content definition compiler.
# ItemGetByIdPyPre  [optional] precheck and setup resources required for action.
# ItemGetByIdPyRun  business logic of action and set outputs.
# ItemGetByIdPyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext,Content,ContentRef
from altair.crm1 import ItemGetByIdPyInputs
from altair.crm1 import ItemGetByIdPyOutputs


async def ItemGetByIdPyRun(inputs: ItemGetByIdPyInputs, outputs: ItemGetByIdPyOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (ItemGetByIdPyInputs): action inputs
        outputs (ItemGetByIdPyOutputs): action outputs
        context (ActionContext): action context
    '''
    testRef = ContentRef(session=context.session)
    testRef.id = inputs.id
    testRef.contentType = "altair.crm2.Item"
    getByRefOutputs = await Content.getByRef(contentRef=testRef, session=context.session)
    outputs.itemRef = getByRefOutputs.content

