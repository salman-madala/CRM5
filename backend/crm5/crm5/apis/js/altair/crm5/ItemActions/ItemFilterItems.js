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

class ItemFilterItems extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new ItemFilterItemsInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.ItemFilterItems'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Item/filterItems'
    }

}

/**
 * Class for inputs of action ItemFilterItems
 * 
 */
class ItemFilterItemsInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.ItemFilterItemsInputs'
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
    /**
     * String arg
     * 
     * @type { object }
     */
    get paginationObj(){
        return this.get('paginationObj')
    }
    
    set paginationObj(value){
        this.set('paginationObj', value)
    }
}

/**
 * Class for outputs of action ItemFilterItems
 * 
 */
class ItemFilterItemsOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.ItemFilterItemsOutputs'
    }

    /**
     * String arg
     * 
     * @type { list }
     */
    get items(){
        return this.get('items')
    }
    
    set items(value){
        this.set('items', value)
    }
    /**
     * String arg
     * 
     * @type { float }
     */
    get totalItemsCount(){
        return this.get('totalItemsCount')
    }
    
    set totalItemsCount(value){
        this.set('totalItemsCount', value)
    }
}

Factory.register('altair.crm5.ItemFilterItems', ItemFilterItems)
Factory.register('altair.crm5.ItemFilterItemsInputs', ItemFilterItemsInputs)
Factory.register('altair.crm5.ItemFilterItemsOutputs', ItemFilterItemsOutputs)

module.exports = {
    ItemFilterItems,
    ItemFilterItemsInputs,
    ItemFilterItemsOutputs
}