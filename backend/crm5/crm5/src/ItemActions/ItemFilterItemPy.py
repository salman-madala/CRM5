# --------------------------------------------------------------------------------
# stubs for action ItemFilterItemPy generated by Altair One content definition compiler.
# ItemFilterItemPyPre  [optional] precheck and setup resources required for action.
# ItemFilterItemPyRun  business logic of action and set outputs.
# ItemFilterItemPyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

# Created from PythonActionSrcTemplate

from altair.system import ActionContext, Search
from altair.crm1 import ItemFilterItemPyInputs
from altair.crm1 import ItemFilterItemPyOutputs


async def ItemFilterItemPyRun(inputs: ItemFilterItemPyInputs, outputs: ItemFilterItemPyOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (ItemFilterItemPyInputs): action inputs
        outputs (ItemFilterItemPyOutputs): action outputs
        context (ActionContext): action context
    '''
    print("value is", inputs.name)
    filterVal = 'name like "'+inputs.name + \
        '" && system.contentType in ["altair.crm2.Item"]'
    print("filterVal :", filterVal)
    result = await Search.search(session=context.session,
                                 filter=filterVal,
                                 sort=[{
                                     "field": "system.createdTime",
                                     "direction": "DESC"
                                 }],
                                 pagination={
                                     "limit": 10,
                                     "offset": 0
                                 }
                                 )
    outputs.items = result.entities
