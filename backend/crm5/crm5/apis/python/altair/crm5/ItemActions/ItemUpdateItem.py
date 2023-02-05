# --------------------------------------------------------------------------------
# Autogenerated by Altair One content definition compiler.
# Do not modify this file.
# --------------------------------------------------------------------------------

#Created from PythonGlobalActionClassTemplate

import os
import importlib.util as imp
from altair.system import Session
from altair.system import UserAction
from altair.system import ActionInputs
from altair.system import ActionOutputs
from altair.system import ActionExecOptions
from altair.system import Factory
from more_itertools import first

from typing import Any
from typing import List


class ItemUpdateItem(UserAction):

    '''Class for action ItemUpdateItem
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', ItemUpdateItemInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.ItemUpdateItem'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Item/updateItem'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('ItemUpdateItem', srcPath + '/ItemActions/ItemUpdateItem.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', ItemUpdateItemOutputs(session=self.session))

        await self._getSourceModule().ItemUpdateItemRun(self.inputs, self.outputs, self.context)


class ItemUpdateItemInputs(ActionInputs):
    '''Class for inputs of action ItemUpdateItem
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemUpdateItemInputs'

    @property
    def itemRef(self) -> 'ItemRef':
        '''String arg

        Returns:
            ItemRef: String arg
        '''
        return self.get('itemRef')

    @itemRef.setter
    def itemRef(self, value: 'ItemRef') -> None:
        '''String arg

        Args:
            value (ItemRef): String arg
        '''
        self.set('itemRef', value)


class ItemUpdateItemOutputs(ActionOutputs):
    '''Class for outputs of action ItemUpdateItem
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['itemRef' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemUpdateItemOutputs'

    @property
    def itemRef(self) -> 'ItemRef':
        '''String arg

        Returns:
            ItemRef: arg
        '''
        return self.get('itemRef')

    @itemRef.setter
    def itemRef(self, value: 'ItemRef') -> None:
        '''String arg

        Args:
            value (ItemRef): arg
        '''
        self.set('itemRef', value)



Factory.register('altair.crm5.ItemUpdateItem', ItemUpdateItem)
Factory.register('altair.crm5.ItemUpdateItemInputs', ItemUpdateItemInputs)
Factory.register('altair.crm5.ItemUpdateItemOutputs', ItemUpdateItemOutputs)

