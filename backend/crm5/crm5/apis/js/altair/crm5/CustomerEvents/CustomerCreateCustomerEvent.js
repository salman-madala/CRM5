// --------------------------------------------------------------------------------
// Autogenerated by Altair One content definition compiler.
// Do not modify this file.
// --------------------------------------------------------------------------------
//Created from  JsContentEventClassTemplate
const ContentUserEvent = require('@altair/system').ContentUserEvent
const Factory = require('@altair/system').Factory
class CustomerCreateCustomerEvent extends ContentUserEvent{
    constructor({session}){
        super({session})
    }

    /**
    * Create new instance of this class

    * @param {Object} inputs Inputs
    * @param customerRef (CustomerRef) customer Reference
    * @param thisContent content object
    * @returns { CustomerCreateCustomerEvent } Event object
    */
    static New({ thisContent, customerRef,   }){
        
        const event = new CustomerCreateCustomerEvent({session: thisContent.session })
        event.payload = { customerRef,   }
        event.resource = thisContent.getRef().toString().replaceAll(".", "_")
        return event;
    }

    /**
    * Content type
    * 
    * @type {string}
    */
    get contentType(){
        return 'altair.crm5.CustomerCreateCustomerEvent'
    }
}

Factory.register('altair.crm5.CustomerCreateCustomerEvent', CustomerCreateCustomerEvent)

module.exports = { CustomerCreateCustomerEvent  }