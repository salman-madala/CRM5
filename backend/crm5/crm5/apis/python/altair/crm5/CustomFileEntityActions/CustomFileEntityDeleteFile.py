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


class CustomFileEntityDeleteFile(UserAction):

    '''Class for action CustomFileEntityDeleteFile
    '''
    def __init__(self, session: Session = None):
        super().__init__(session=session)
        self._srcModule = None

        # set inputs
        self.set('inputs', CustomFileEntityDeleteFileInputs(session=session))
        self.set('inline', True)

    @property
    def contentType(self) -> str:
        '''Content type

        Returns:
            str: Content type
        '''
        return 'altair.crm5.CustomFileEntityDeleteFile'

    @property
    def relativeUrl(self) -> str:
        '''RelativeUrl

        Returns:
            str: Relative Url
        '''
        return '/altair/crm5/CustomFileEntity/deleteFile'
    

    def _getSourceModule(self):
        if self._srcModule != None:
            return self._srcModule

        fileDirPath = os.path.dirname(os.path.realpath(__file__))
        srcPath = '{}/../src'.format(fileDirPath)
        if os.path.exists(srcPath) == False:
            srcPath = '{}/../../../../../src'.format(fileDirPath)

        spec = imp.spec_from_file_location('CustomFileEntityDeleteFile', srcPath + '/CustomFileEntityActions/CustomFileEntityDeleteFile.py')
        self._srcModule = imp.module_from_spec(spec)
        spec.loader.exec_module(self._srcModule)
        return self._srcModule


    async def run(self):
        '''Method to run for action execution
        '''
        # set outputs
        self.set('outputs', CustomFileEntityDeleteFileOutputs(session=self.session))

        await self._getSourceModule().CustomFileEntityDeleteFileRun(self.inputs, self.outputs, self.context)


class CustomFileEntityDeleteFileInputs(ActionInputs):
    '''Class for inputs of action CustomFileEntityDeleteFile
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.CustomFileEntityDeleteFileInputs'

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


class CustomFileEntityDeleteFileOutputs(ActionOutputs):
    '''Class for outputs of action CustomFileEntityDeleteFile
    '''
    def __init__(self, session=None):
        super().__init__(session=session)

    def __iter__(self):
        yield from [getattr(self, i) for i in ['status' ]]

    @property
    def propertyType(self) -> str:
        '''Property type

        Returns:
            str: Property type
        '''
        return 'altair.crm5.CustomFileEntityDeleteFileOutputs'

    @property
    def status(self) -> 'str':
        '''String arg

        Returns:
            str: arg
        '''
        return self.get('status')

    @status.setter
    def status(self, value: 'str') -> None:
        '''String arg

        Args:
            value (str): arg
        '''
        self.set('status', value)



Factory.register('altair.crm5.CustomFileEntityDeleteFile', CustomFileEntityDeleteFile)
Factory.register('altair.crm5.CustomFileEntityDeleteFileInputs', CustomFileEntityDeleteFileInputs)
Factory.register('altair.crm5.CustomFileEntityDeleteFileOutputs', CustomFileEntityDeleteFileOutputs)

