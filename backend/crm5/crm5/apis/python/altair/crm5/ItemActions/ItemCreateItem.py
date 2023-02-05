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


class ItemCreateItem(UserAction):

    '''Class for action ItemCreateItem
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', ItemCreateItemInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.ItemCreateItem'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Item/createItem'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('ItemCreateItem', srcPath + '/ItemActions/ItemCreateItem.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', ItemCreateItemOutputs(session=self.session))

        await self._getSourceModule().ItemCreateItemRun(self.inputs, self.outputs, self.context)


class ItemCreateItemInputs(ActionInputs):
    '''Class for inputs of action ItemCreateItem
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemCreateItemInputs'

    @property
    def name(self) -> 'str':
        '''String arg

        Returns:
            str: String arg
        '''
        return self.get('name')

    @name.setter
    def name(self, value: 'str') -> None:
        '''String arg

        Args:
            value (str): String arg
        '''
        self.set('name', value)

    @property
    def cost(self) -> 'float':
        '''String arg

        Returns:
            float: String arg
        '''
        return self.get('cost')

    @cost.setter
    def cost(self, value: 'float') -> None:
        '''String arg

        Args:
            value (float): String arg
        '''
        self.set('cost', value)


class ItemCreateItemOutputs(ActionOutputs):
    '''Class for outputs of action ItemCreateItem
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
        return 'altair.crm5.ItemCreateItemOutputs'

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



Factory.register('altair.crm5.ItemCreateItem', ItemCreateItem)
Factory.register('altair.crm5.ItemCreateItemInputs', ItemCreateItemInputs)
Factory.register('altair.crm5.ItemCreateItemOutputs', ItemCreateItemOutputs)

