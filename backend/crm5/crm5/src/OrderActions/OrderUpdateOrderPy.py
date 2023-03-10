# --------------------------------------------------------------------------------
# stubs for action OrderUpdateOrderPy generated by Altair One content definition compiler.
# OrderUpdateOrderPyPre  [optional] precheck and setup resources required for action.
# OrderUpdateOrderPyRun  business logic of action and set outputs.
# OrderUpdateOrderPyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

# Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm1 import OrderUpdateOrderPyInputs
from altair.crm1 import OrderUpdateOrderPyOutputs
from altair.system.Content import Content
from altair.system.Content import ContentRef


async def OrderUpdateOrderPyRun(inputs: OrderUpdateOrderPyInputs, outputs: OrderUpdateOrderPyOutputs, context: ActionContext):

    content1Ref = ContentRef(session=context.session)
    print("contentRef is :", inputs.orderRef['id'])
    content1Ref.id = inputs.orderRef['id']
    content1Ref.contentType = "altair.crm2.Order"
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
