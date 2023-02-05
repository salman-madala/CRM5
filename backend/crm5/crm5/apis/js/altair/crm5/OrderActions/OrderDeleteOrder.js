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

class OrderDeleteOrder extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new OrderDeleteOrderInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.OrderDeleteOrder'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Order/deleteOrder'
    }

}

/**
 * Class for inputs of action OrderDeleteOrder
 * 
 */
class OrderDeleteOrderInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderDeleteOrderInputs'
    }

    /**
     * String arg
     * 
     * @type { OrderRef }
     */
    get thisContent(){
        return this.get('thisContent')
    }
    
    set thisContent(value){
        this.set('thisContent', value)
    }
    /**
     * String arg
     * 
     * @type { string }
     */
    get id(){
        return this.get('id')
    }
    
    set id(value){
        this.set('id', value)
    }
}

/**
 * Class for outputs of action OrderDeleteOrder
 * 
 */
class OrderDeleteOrderOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderDeleteOrderOutputs'
    }

    /**
     * String arg
     * 
     * @type { string }
     */
    get status(){
        return this.get('status')
    }
    
    set status(value){
        this.set('status', value)
    }
}

Factory.register('altair.crm5.OrderDeleteOrder', OrderDeleteOrder)
Factory.register('altair.crm5.OrderDeleteOrderInputs', OrderDeleteOrderInputs)
Factory.register('altair.crm5.OrderDeleteOrderOutputs', OrderDeleteOrderOutputs)

module.exports = {
    OrderDeleteOrder,
    OrderDeleteOrderInputs,
    OrderDeleteOrderOutputs
}