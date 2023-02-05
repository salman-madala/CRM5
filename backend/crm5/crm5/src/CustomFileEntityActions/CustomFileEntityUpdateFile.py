# --------------------------------------------------------------------------------
# stubs for action CustomFileEntityUpdateFile generated by Altair One content definition compiler.
# CustomFileEntityUpdateFilePre  [optional] precheck and setup resources required for action.
# CustomFileEntityUpdateFileRun  business logic of action and set outputs.
# CustomFileEntityUpdateFilePost [optional] postchecks and free resources aquired by action.
# *** DO NOT MODIFY STUB DEFINITIONS ***.
# --------------------------------------------------------------------------------

# Created from PythonActionSrcTemplate

from altair.system import ActionContext, ContentRef, Content
from altair.crm5 import CustomFileEntityUpdateFileInputs
from altair.crm5 import CustomFileEntityUpdateFileOutputs


async def CustomFileEntityUpdateFileRun(inputs: CustomFileEntityUpdateFileInputs, outputs: CustomFileEntityUpdateFileOutputs, context: ActionContext):
    '''Implement business logic of action and set outputs

    Args:
        inputs (CustomFileEntityUpdateFileInputs): action inputs
        outputs (CustomFileEntityUpdateFileOutputs): action outputs
        context (ActionContext): action context
    '''
    try:
        content1Ref = ContentRef(session=context.session)
        content1Ref.id = inputs.id
        content1Ref.contentType = "altair.crm5.CustomFileEntity"
        getByRefOutputs = await Content.getByRef(contentRef=content1Ref, session=context.session)
        content1 = getByRefOutputs.content
        content1.set("description", inputs.description)
        content1.set("isLock", inputs.islock)
        outputs.customer = await content1.update()
    except Exception as e:
        import traceback
        print(traceback.format_exc())
