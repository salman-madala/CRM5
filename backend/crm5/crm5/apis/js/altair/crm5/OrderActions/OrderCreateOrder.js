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

class OrderCreateOrder extends UserAction{
    constructor({session}){
        super({session})
        this._srcModule = srcModule

        // set inputs
        this.set('inputs', new OrderCreateOrderInputs(session=session))
        this.set('inline', true)
    }

    /**
     * Content type
     * 
     * @type {string}
     */
    get contentType(){
        return 'altair.crm5.OrderCreateOrder'
    }

    /**
     * Get relative URL of the action
     */
    get relativeUrl(){
        return '/altair/crm5/Order/createOrder'
    }

}

/**
 * Class for inputs of action OrderCreateOrder
 * 
 */
class OrderCreateOrderInputs extends ActionInputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderCreateOrderInputs'
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
     * @type { string }
     */
    get contact(){
        return this.get('contact')
    }
    
    set contact(value){
        this.set('contact', value)
    }
    /**
     * String arg
     * 
     * @type { string }
     */
    get address(){
        return this.get('address')
    }
    
    set address(value){
        this.set('address', value)
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
     * @type { CustomerRef }
     */
    get customerRef(){
        return this.get('customerRef')
    }
    
    set customerRef(value){
        this.set('customerRef', value)
    }
}

/**
 * Class for outputs of action OrderCreateOrder
 * 
 */
class OrderCreateOrderOutputs extends ActionOutputs{

    constructor({session}) {
        super({session})
    }

    /**
     * Property type
     * 
     * @type {string}
     */
    get propertyType(){
        return 'altair.crm5.OrderCreateOrderOutputs'
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
}

Factory.register('altair.crm5.OrderCreateOrder', OrderCreateOrder)
Factory.register('altair.crm5.OrderCreateOrderInputs', OrderCreateOrderInputs)
Factory.register('altair.crm5.OrderCreateOrderOutputs', OrderCreateOrderOutputs)

module.exports = {
    OrderCreateOrder,
    OrderCreateOrderInputs,
    OrderCreateOrderOutputs
}