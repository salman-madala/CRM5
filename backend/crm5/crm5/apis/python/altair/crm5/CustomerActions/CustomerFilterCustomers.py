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


class CustomerFilterCustomers(UserAction):

    '''Class for action CustomerFilterCustomers
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', CustomerFilterCustomersInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.CustomerFilterCustomers'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/Customer/filterCustomers'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('CustomerFilterCustomers', srcPath + '/CustomerActions/CustomerFilterCustomers.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', CustomerFilterCustomersOutputs(session=self.session))

        await self._getSourceModule().CustomerFilterCustomersRun(self.inputs, self.outputs, self.context)


class CustomerFilterCustomersInputs(ActionInputs):
    '''Class for inputs of action CustomerFilterCustomers
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.CustomerFilterCustomersInputs'

    @property
    def val(self) -> 'str':
        '''String arg

        Returns:
            str: String arg
        '''
        return self.get('val')

    @val.setter
    def val(self, value: 'str') -> None:
        '''String arg

        Args:
            value (str): String arg
        '''
        self.set('val', value)

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


class CustomerFilterCustomersOutputs(ActionOutputs):
    '''Class for outputs of action CustomerFilterCustomers
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['customers', 'totalCustomersCount' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.CustomerFilterCustomersOutputs'

    @property
    def customers(self) -> List['CustomerRef']:
        '''String arg

        Returns:
            List[CustomerRef]: arg
        '''
        return self.get('customers')

    @customers.setter
    def customers(self, value: List['CustomerRef']) -> None:
        '''String arg

        Args:
            value (List[CustomerRef]): arg
        '''
        self.set('customers', value)

    @property
    def totalCustomersCount(self) -> 'float':
        '''String arg

        Returns:
            float: arg
        '''
        return self.get('totalCustomersCount')

    @totalCustomersCount.setter
    def totalCustomersCount(self, value: 'float') -> None:
        '''String arg

        Args:
            value (float): arg
        '''
        self.set('totalCustomersCount', value)



Factory.register('altair.crm5.CustomerFilterCustomers', CustomerFilterCustomers)
Factory.register('altair.crm5.CustomerFilterCustomersInputs', CustomerFilterCustomersInputs)
Factory.register('altair.crm5.CustomerFilterCustomersOutputs', CustomerFilterCustomersOutputs)

