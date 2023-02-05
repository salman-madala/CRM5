# --------------------------------------------------------------------------------
# stubs for action ItemGetItemOrders generated by Altair One content definition compiler.
# ItemGetItemOrdersPre  [optional] precheck and setup resources required for action.
# ItemGetItemOrdersRun  business logic of action and set outputs.
# ItemGetItemOrdersPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext,Content
from altair.crm5 import ItemGetItemOrdersInputs
from altair.crm5 import ItemGetItemOrdersOutputs


async def ItemGetItemOrdersRun(inputs: ItemGetItemOrdersInputs, outputs: ItemGetItemOrdersOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (ItemGetItemOrdersInputs): action inputs
        outputs (ItemGetItemOrdersOutputs): action outputs
        context (ActionContext): action context
    '''
    output = await Content.findByAttributes(
        session=context.session,
        contentType='altair.crm5.Item',
        data={"_key": inputs.id}
    )
    val = output.contents[0]
    
    # here we are getting the orders data  based on the  item 
    rels = await val.getRelations(direction="IN", relationNames=["order_items"])
    orders = await val.getRelatedContents(direction="IN", relationNames=["order_items"])
    
    print(orders)
    outputs.orders = orders
