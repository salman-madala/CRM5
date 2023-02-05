# --------------------------------------------------------------------------------
# stubs for action OrderFilterOrders generated by Altair One content definition compiler.
# OrderFilterOrdersPre  [optional] precheck and setup resources required for action.
# OrderFilterOrdersRun  business logic of action and set outputs.
# OrderFilterOrdersPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

# Created from PythonActionSrcTemplate

from altair.system import ActionContext, Search, Content
from altair.crm5 import OrderFilterOrdersInputs
from altair.crm5 import OrderFilterOrdersOutputs
from altair.crm5 import Order


async def OrderFilterOrdersRun(inputs: OrderFilterOrdersInputs, outputs: OrderFilterOrdersOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (OrderFilterOrdersInputs): action inputs
        outputs (OrderFilterOrdersOutputs): action outputs
        context (ActionContext): action context
    '''
    filterVal = 'name like "'+inputs.name + \
        '" && system.contentType in ["altair.crm5.Order"]'
    print("filterVal :", filterVal)
   
    sortField = inputs.paginationObj['sortBy']
    sortDirection = inputs.paginationObj['sortDir']
    pageLimit = inputs.paginationObj['limit']
    pageOffset = inputs.paginationObj['offset']
    
    result = await Search.search(session=context.session,
                                 filter=filterVal,
                                 sort=[{
                                     "field": sortField,
                                     "direction": sortDirection
                                 }],
                                 pagination={
                                     "limit": pageLimit,
                                     "offset": pageOffset,
                                 },
                                 searchOptions={
                                     "returnCounts":True
                                 }
                                 )
    # print("result.entities :", result.entities)

    totalOrders = []
    for order in result.entities:
        # items = await getOrderItemsById(order.id, context)
        
        items = await order.getOrder_items()
        print("items is present : ",items)
        
        customer = await order.getOrder_customer()
        print("customer is present : ",customer)
        print("order type",type(order))
        
       
        
        if (len(items) > 0):
            order.isItems = True
        else:
            order.isItems = False
            
        order.customer = customer
        order.items = items
        totalOrders.append(order)
        
        
    outputs.orders = totalOrders
    outputs.totalOrdersCount = result.count