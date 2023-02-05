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

class OrderGetOrderItems extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new OrderGetOrderItemsInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.OrderGetOrderItems'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Order/getOrderItems'
    }

}

/**
 * Class for inputs of action OrderGetOrderItems
 * 
 */
class OrderGetOrderItemsInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderGetOrderItemsInputs'
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
 * Class for outputs of action OrderGetOrderItems
 * 
 */
class OrderGetOrderItemsOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderGetOrderItemsOutputs'
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
}

Factory.register('altair.crm5.OrderGetOrderItems', OrderGetOrderItems)
Factory.register('altair.crm5.OrderGetOrderItemsInputs', OrderGetOrderItemsInputs)
Factory.register('altair.crm5.OrderGetOrderItemsOutputs', OrderGetOrderItemsOutputs)

module.exports = {
    OrderGetOrderItems,
    OrderGetOrderItemsInputs,
    OrderGetOrderItemsOutputs
}