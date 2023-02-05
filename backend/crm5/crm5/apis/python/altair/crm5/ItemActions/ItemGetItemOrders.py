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


class ItemGetItemOrders(UserAction):

    '''Class for action ItemGetItemOrders
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', ItemGetItemOrdersInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.ItemGetItemOrders'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Item/getItemOrders'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('ItemGetItemOrders', srcPath + '/ItemActions/ItemGetItemOrders.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', ItemGetItemOrdersOutputs(session=self.session))

        await self._getSourceModule().ItemGetItemOrdersRun(self.inputs, self.outputs, self.context)


class ItemGetItemOrdersInputs(ActionInputs):
    '''Class for inputs of action ItemGetItemOrders
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemGetItemOrdersInputs'

    @property
    def id(self) -> 'str':
        '''String arg

        Returns:
            str: String arg
        '''
        return self.get('id')

    @id.setter
    def id(self, value: 'str') -> None:
        '''String arg

        Args:
            value (str): String arg
        '''
        self.set('id', value)


class ItemGetItemOrdersOutputs(ActionOutputs):
    '''Class for outputs of action ItemGetItemOrders
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['orders' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.ItemGetItemOrdersOutputs'

    @property
    def orders(self) -> List['OrderRef']:
        '''String arg

        Returns:
            List[OrderRef]: arg
        '''
        return self.get('orders')

    @orders.setter
    def orders(self, value: List['OrderRef']) -> None:
        '''String arg

        Args:
            value (List[OrderRef]): arg
        '''
        self.set('orders', value)



Factory.register('altair.crm5.ItemGetItemOrders', ItemGetItemOrders)
Factory.register('altair.crm5.ItemGetItemOrdersInputs', ItemGetItemOrdersInputs)
Factory.register('altair.crm5.ItemGetItemOrdersOutputs', ItemGetItemOrdersOutputs)
