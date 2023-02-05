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


class CustomerUpdateCustomer(UserAction):

    '''Class for action CustomerUpdateCustomer
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', CustomerUpdateCustomerInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.CustomerUpdateCustomer'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Customer/updateCustomer'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('CustomerUpdateCustomer', srcPath + '/CustomerActions/CustomerUpdateCustomer.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', CustomerUpdateCustomerOutputs(session=self.session))

        await self._getSourceModule().CustomerUpdateCustomerRun(self.inputs, self.outputs, self.context)


class CustomerUpdateCustomerInputs(ActionInputs):
    '''Class for inputs of action CustomerUpdateCustomer
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.CustomerUpdateCustomerInputs'

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

    @property
    def customer(self) -> 'CustomerRef':
        '''String arg

        Returns:
            CustomerRef: String arg
        '''
        return self.get('customer')

    @customer.setter
    def customer(self, value: 'CustomerRef') -> None:
        '''String arg

        Args:
            value (CustomerRef): String arg
        '''
        self.set('customer', value)


class CustomerUpdateCustomerOutputs(ActionOutputs):
    '''Class for outputs of action CustomerUpdateCustomer
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['customer' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.CustomerUpdateCustomerOutputs'

    @property
    def customer(self) -> 'CustomerRef':
        '''String arg

        Returns:
            CustomerRef: arg
        '''
        return self.get('customer')

    @customer.setter
    def customer(self, value: 'CustomerRef') -> None:
        '''String arg

        Args:
            value (CustomerRef): arg
        '''
        self.set('customer', value)



Factory.register('altair.crm5.CustomerUpdateCustomer', CustomerUpdateCustomer)
Factory.register('altair.crm5.CustomerUpdateCustomerInputs', CustomerUpdateCustomerInputs)
Factory.register('altair.crm5.CustomerUpdateCustomerOutputs', CustomerUpdateCustomerOutputs)
