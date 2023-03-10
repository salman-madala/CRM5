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


class ItemFilterItems(UserAction):

    '''Class for action ItemFilterItems
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', ItemFilterItemsInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.ItemFilterItems'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Item/filterItems'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('ItemFilterItems', srcPath + '/ItemActions/ItemFilterItems.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', ItemFilterItemsOutputs(session=self.session))

        await self._getSourceModule().ItemFilterItemsRun(self.inputs, self.outputs, self.context)


class ItemFilterItemsInputs(ActionInputs):
    '''Class for inputs of action ItemFilterItems
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemFilterItemsInputs'

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
    def paginationObj(self) -> 'Any':
        '''String arg

        Returns:
            Any: String arg
        '''
        return self.get('paginationObj')

    @paginationObj.setter
    def paginationObj(self, value: 'Any') -> None:
        '''String arg

        Args:
            value (Any): String arg
        '''
        self.set('paginationObj', value)


class ItemFilterItemsOutputs(ActionOutputs):
    '''Class for outputs of action ItemFilterItems
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['items', 'totalItemsCount' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemFilterItemsOutputs'

    @property
    def items(self) -> List['ItemRef']:
        '''String arg

        Returns:
            List[ItemRef]: arg
        '''
        return self.get('items')

    @items.setter
    def items(self, value: List['ItemRef']) -> None:
        '''String arg

        Args:
            value (List[ItemRef]): arg
        '''
        self.set('items', value)

    @property
    def totalItemsCount(self) -> 'float':
        '''String arg

        Returns:
            float: arg
        '''
        return self.get('totalItemsCount')

    @totalItemsCount.setter
    def totalItemsCount(self, value: 'float') -> None:
        '''String arg

        Args:
            value (float): arg
        '''
        self.set('totalItemsCount', value)



Factory.register('altair.crm5.ItemFilterItems', ItemFilterItems)
Factory.register('altair.crm5.ItemFilterItemsInputs', ItemFilterItemsInputs)
Factory.register('altair.crm5.ItemFilterItemsOutputs', ItemFilterItemsOutputs)

