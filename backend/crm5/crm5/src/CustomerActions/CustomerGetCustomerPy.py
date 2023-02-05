# --------------------------------------------------------------------------------
# stubs for action CustomerGetCustomerPy generated by Altair One content definition compiler.
# CustomerGetCustomerPyPre  [optional] precheck and setup resources required for action.
# CustomerGetCustomerPyRun  business logic of action and set outputs.
# CustomerGetCustomerPyPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext
from altair.crm1 import CustomerGetCustomerPyInputs
from altair.crm1 import CustomerGetCustomerPyOutputs
from altair.system.Content import Content,ContentRef


async def CustomerGetCustomerPyRun(inputs: CustomerGetCustomerPyInputs, outputs: CustomerGetCustomerPyOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomerGetCustomerPyInputs): action inputs
        outputs (CustomerGetCustomerPyOutputs): action outputs
        context (ActionContext): action context
    '''
    try:
        # output = await Content.findByAttributes(
        #     session=context.session,
        #     contentType='altair.crm1.Customer',
        #     data={"_key": inputs.id}
        # )
        # outputs.customer = output.contents[0]
        
        
    
        testRef = ContentRef(session=context.session)
        testRef.id = inputs.id
        testRef.contentType = "altair.crm2.Customer"
        getByRefOutputs = await Content.getByRef(contentRef=testRef, session=context.session)
        outputs.customerRef = getByRefOutputs.content
        val = getByRefOutputs.content

        rels = await val.getRelations(direction= "OUT", relationNames= ["customer_orders"]); 
        print("rels............................", rels);
        orders = await val.getRelatedContents(direction= "OUT", relationNames= ["customer_orders"]);	
        print("Orders....................", orders);
        outputs.orders = orders;
        
    except Exception as e:
        import traceback
        print(e)
        print(traceback.format_exc())
