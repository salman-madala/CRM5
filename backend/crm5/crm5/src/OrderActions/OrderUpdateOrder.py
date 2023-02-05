# --------------------------------------------------------------------------------
# stubs for action OrderUpdateOrder generated by Altair One content definition compiler.
# OrderUpdateOrderPre  [optional] precheck and setup resources required for action.
# OrderUpdateOrderRun  business logic of action and set outputs.
# OrderUpdateOrderPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm5 import OrderUpdateOrderInputs
from altair.crm5 import OrderUpdateOrderOutputs
from altair.system.Content import ContentRef,Content


async def OrderUpdateOrderRun(inputs: OrderUpdateOrderInputs, outputs: OrderUpdateOrderOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (OrderUpdateOrderInputs): action inputs
        outputs (OrderUpdateOrderOutputs): action outputs
        context (ActionContext): action context
    '''
    content1Ref = ContentRef(session=context.session)
    print("contentRef is :", inputs.orderRef['id'])
    content1Ref.id = inputs.orderRef['id']
    content1Ref.contentType = "altair.crm5.Order"
    getByRefOutputs = await Content.getByRef(contentRef=content1Ref, session=context.session)
    content1 = getByRefOutputs.content
    print("content:", content1)
    content1.set("name", inputs.orderRef['name'])
    content1.set("contact", inputs.orderRef['contact'])
    content1.set("address", inputs.orderRef['address'])
    # content1.set("items", inputs.orderRef['items'])
    # content1.set("customerRef", inputs.orderRef['customerRef'])

    outputs.orderRef = await content1.update()
    print(outputs.orderRef)

