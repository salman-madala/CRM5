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

class OrderDeleteOrderItems extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new OrderDeleteOrderItemsInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.OrderDeleteOrderItems'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Order/deleteOrderItems'
    }

}

/**
 * Class for inputs of action OrderDeleteOrderItems
 * 
 */
class OrderDeleteOrderItemsInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderDeleteOrderItemsInputs'
    }

    /**
     * String arg
     * 
     * @type { string }
     */
    get orderId(){
        return this.get('orderId')
    }
    
    set orderId(value){
        this.set('orderId', value)
    }
    /**
     * String arg
     * 
     * @type { string }
     */
    get itemId(){
        return this.get('itemId')
    }
    
    set itemId(value){
        this.set('itemId', value)
    }
}

/**
 * Class for outputs of action OrderDeleteOrderItems
 * 
 */
class OrderDeleteOrderItemsOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderDeleteOrderItemsOutputs'
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

Factory.register('altair.crm5.OrderDeleteOrderItems', OrderDeleteOrderItems)
Factory.register('altair.crm5.OrderDeleteOrderItemsInputs', OrderDeleteOrderItemsInputs)
Factory.register('altair.crm5.OrderDeleteOrderItemsOutputs', OrderDeleteOrderItemsOutputs)

module.exports = {
    OrderDeleteOrderItems,
    OrderDeleteOrderItemsInputs,
    OrderDeleteOrderItemsOutputs
}