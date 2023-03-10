# --------------------------------------------------------------------------------
# stubs for action CustomerDeleteCustomer generated by Altair One content definition compiler.
# CustomerDeleteCustomerPre  [optional] precheck and setup resources required for action.
# CustomerDeleteCustomerRun  business logic of action and set outputs.
# CustomerDeleteCustomerPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

# Created from PythonActionSrcTemplate

from altair.system import ActionContext,Content,ActionExecOptions
from altair.crm5 import CustomerDeleteCustomerInputs,CustomFileEntity
from altair.crm5 import CustomerDeleteCustomerOutputs


async def CustomerDeleteCustomerRun(inputs: CustomerDeleteCustomerInputs, outputs: CustomerDeleteCustomerOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomerDeleteCustomerInputs): action inputs
        outputs (CustomerDeleteCustomerOutputs): action outputs
        context (ActionContext): action context
    '''
    try:
        output = await Content.findByAttributes(
            session=context.session,
            contentType="altair.crm5.Customer",
            data={"_key": inputs.id}
        )
        customerRef = output.contents[0]
        
        
        # after customer deletion successfully then only we have to delete his file  
        filesList = await CustomFileEntity.getFiles(session=context.session,contentRef=customerRef,execOptions= ActionExecOptions(execEnv="current"))
        print(filesList.files)

        for fl in filesList.files:
            print(fl['id'])
            await CustomFileEntity.deleteFile(session=context.session,id=fl['id'],execOptions= ActionExecOptions(execEnv="current"))
            print("success")
        
        await customerRef.delete()

       
    except Exception as e:
        import traceback
        print(e)
        print(traceback.format_exc())
