# --------------------------------------------------------------------------------
# stubs for action CustomerCreateCustomerFiles generated by Altair One content definition compiler.
# CustomerCreateCustomerFilesPre  [optional] precheck and setup resources required for action.
# CustomerCreateCustomerFilesRun  business logic of action and set outputs.
# CustomerCreateCustomerFilesPost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

#Created from PythonActionSrcTemplate

from altair.system import ActionContext,Content
from altair.crm5 import CustomerCreateCustomerFilesInputs
from altair.crm5 import CustomerCreateCustomerFilesOutputs


async def CustomerCreateCustomerFilesRun(inputs: CustomerCreateCustomerFilesInputs, outputs: CustomerCreateCustomerFilesOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomerCreateCustomerFilesInputs): action inputs
        outputs (CustomerCreateCustomerFilesOutputs): action outputs
        context (ActionContext): action context
    '''
    # print(inputs.customerRef)
    # customer={
    #     "id":inputs.customerRef.id,
    #     "contentType":inputs.customerRef.contentType
    # }

    customerRef = await Content.getByRef(session=context.session, contentRef=inputs.customerRef)
    # file={
    #     "id":inputs.fileRef.id,
    #     "contentType":inputs.fileRef.contentType
    # }

    # file1 = ContentRef(session=context.session)

    # file1.id=inputs.fileRef.id

    # file1.contentType=inputs.fileRef.contentType

    fileRef = await Content.getByRef(session=context.session, contentRef=inputs.fileRef)
    await customerRef.content.addCustomer_files(customer_files=fileRef.content)
    await context.session.save()


