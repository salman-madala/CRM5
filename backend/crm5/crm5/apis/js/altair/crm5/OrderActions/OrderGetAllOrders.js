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

class OrderGetAllOrders extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new OrderGetAllOrdersInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.OrderGetAllOrders'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Order/getAllOrders'
    }

}

/**
 * Class for inputs of action OrderGetAllOrders
 * 
 */
class OrderGetAllOrdersInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderGetAllOrdersInputs'
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
}

/**
 * Class for outputs of action OrderGetAllOrders
 * 
 */
class OrderGetAllOrdersOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderGetAllOrdersOutputs'
    }

    /**
     * String arg
     * 
     * @type { list }
     */
    get orders(){
        return this.get('orders')
    }
    
    set orders(value){
        this.set('orders', value)
    }
}

Factory.register('altair.crm5.OrderGetAllOrders', OrderGetAllOrders)
Factory.register('altair.crm5.OrderGetAllOrdersInputs', OrderGetAllOrdersInputs)
Factory.register('altair.crm5.OrderGetAllOrdersOutputs', OrderGetAllOrdersOutputs)

module.exports = {
    OrderGetAllOrders,
    OrderGetAllOrdersInputs,
    OrderGetAllOrdersOutputs
}