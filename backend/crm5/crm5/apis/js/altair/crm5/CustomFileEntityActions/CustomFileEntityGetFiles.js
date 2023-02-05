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

class CustomFileEntityGetFiles extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new CustomFileEntityGetFilesInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.CustomFileEntityGetFiles'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/CustomFileEntity/getFiles'
    }

}

/**
 * Class for inputs of action CustomFileEntityGetFiles
 * 
 */
class CustomFileEntityGetFilesInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.CustomFileEntityGetFilesInputs'
    }

    /**
     * String arg
     * 
     * @type { object }
     */
    get contentRef(){
        return this.get('contentRef')
    }
    
    set contentRef(value){
        this.set('contentRef', value)
    }
}

/**
 * Class for outputs of action CustomFileEntityGetFiles
 * 
 */
class CustomFileEntityGetFilesOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.CustomFileEntityGetFilesOutputs'
    }

    /**
     * String arg
     * 
     * @type { list }
     */
    get files(){
        return this.get('files')
    }
    
    set files(value){
        this.set('files', value)
    }
    /**
     * String arg
     * 
     * @type { float }
     */
    get count(){
        return this.get('count')
    }
    
    set count(value){
        this.set('count', value)
    }
}

Factory.register('altair.crm5.CustomFileEntityGetFiles', CustomFileEntityGetFiles)
Factory.register('altair.crm5.CustomFileEntityGetFilesInputs', CustomFileEntityGetFilesInputs)
Factory.register('altair.crm5.CustomFileEntityGetFilesOutputs', CustomFileEntityGetFilesOutputs)

module.exports = {
    CustomFileEntityGetFiles,
    CustomFileEntityGetFilesInputs,
    CustomFileEntityGetFilesOutputs
}