// --------------------------------------------------------------------------------
// Autogenerated by Altair One content definition compiler.
// Do not modify this file.
// --------------------------------------------------------------------------------
//Created from  JsGlobalActionClassTemplate

const UserAction = require('@altair/system').UserAction
const ActionInputs = require('@altair/system').ActionInputs
const ActionOutputs = require('@altair/system').ActionOutputs
const Factory = require('@altair/system').Factory

let srcModule = undefined;

class FileUploadFile extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new FileUploadFileInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.FileUploadFile'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/File/uploadFile'
    }

}

/**
 * Class for inputs of action FileUploadFile
 * 
 */
class FileUploadFileInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.FileUploadFileInputs'
    }

    /**
     * String arg
     * 
     * @type { string }
     */
    get filepath(){
        return this.get('filepath')
    }
    
    set filepath(value){
        this.set('filepath', value)
    }
    /**
     * String arg
     * 
     * @type { string }
     */
    get name(){
        return this.get('name')
    }
    
    set name(value){
        this.set('name', value)
    }
}

/**
 * Class for outputs of action FileUploadFile
 * 
 */
class FileUploadFileOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.FileUploadFileOutputs'
    }

    /**
     * String arg
     * 
     * @type { FileRef }
     */
    get fileRef(){
        return this.get('fileRef')
    }
    
    set fileRef(value){
        this.set('fileRef', value)
    }
}

Factory.register('altair.crm5.FileUploadFile', FileUploadFile)
Factory.register('altair.crm5.FileUploadFileInputs', FileUploadFileInputs)
Factory.register('altair.crm5.FileUploadFileOutputs', FileUploadFileOutputs)

module.exports = {
    FileUploadFile,
    FileUploadFileInputs,
    FileUploadFileOutputs
}