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


class OrderUpdateOrder(UserAction):

    '''Class for action OrderUpdateOrder
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', OrderUpdateOrderInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.OrderUpdateOrder'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Order/updateOrder'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('OrderUpdateOrder', srcPath + '/OrderActions/OrderUpdateOrder.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', OrderUpdateOrderOutputs(session=self.session))

        await self._getSourceModule().OrderUpdateOrderRun(self.inputs, self.outputs, self.context)


class OrderUpdateOrderInputs(ActionInputs):
    '''Class for inputs of action OrderUpdateOrder
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.OrderUpdateOrderInputs'

    @property
    def orderRef(self) -> 'OrderRef':
        '''String arg

        Returns:
            OrderRef: String arg
        '''
        return self.get('orderRef')

    @orderRef.setter
    def orderRef(self, value: 'OrderRef') -> None:
        '''String arg

        Args:
            value (OrderRef): String arg
        '''
        self.set('orderRef', value)


class OrderUpdateOrderOutputs(ActionOutputs):
    '''Class for outputs of action OrderUpdateOrder
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['orderRef' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.OrderUpdateOrderOutputs'

    @property
    def orderRef(self) -> 'OrderRef':
        '''String arg

        Returns:
            OrderRef: arg
        '''
        return self.get('orderRef')

    @orderRef.setter
    def orderRef(self, value: 'OrderRef') -> None:
        '''String arg

        Args:
            value (OrderRef): arg
        '''
        self.set('orderRef', value)



Factory.register('altair.crm5.OrderUpdateOrder', OrderUpdateOrder)
Factory.register('altair.crm5.OrderUpdateOrderInputs', OrderUpdateOrderInputs)
Factory.register('altair.crm5.OrderUpdateOrderOutputs', OrderUpdateOrderOutputs)

