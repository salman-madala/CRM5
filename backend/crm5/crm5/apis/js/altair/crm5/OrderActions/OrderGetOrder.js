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

class OrderGetOrder extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new OrderGetOrderInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.OrderGetOrder'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Order/getOrder'
    }

}

/**
 * Class for inputs of action OrderGetOrder
 * 
 */
class OrderGetOrderInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderGetOrderInputs'
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
 * Class for outputs of action OrderGetOrder
 * 
 */
class OrderGetOrderOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderGetOrderOutputs'
    }

    /**
     * String arg
     * 
     * @type { OrderRef }
     */
    get orderRef(){
        return this.get('orderRef')
    }
    
    set orderRef(value){
        this.set('orderRef', value)
    }
    /**
     * String arg
     * 
     * @type { CustomerRef }
     */
    get customer(){
        return this.get('customer')
    }
    
    set customer(value){
        this.set('customer', value)
    }
    /**
     * String arg
     * 
     * @type { object }
     */
    get obj(){
        return this.get('obj')
    }
    
    set obj(value){
        this.set('obj', value)
    }
}

Factory.register('altair.crm5.OrderGetOrder', OrderGetOrder)
Factory.register('altair.crm5.OrderGetOrderInputs', OrderGetOrderInputs)
Factory.register('altair.crm5.OrderGetOrderOutputs', OrderGetOrderOutputs)

module.exports = {
    OrderGetOrder,
    OrderGetOrderInputs,
    OrderGetOrderOutputs
}