from altair.auth import Okta
from altair.system import ActionExecOptions
import asyncio
from altair.crm3 import Order, Customer, Item


async def init():

    okta = Okta(serverUrl="http://localhost:3350/api/objectstore",
                clientId="0oa175dibythCrUfq0h8")

    return await okta.login()


async def run():
    session = await init()
    # jwtVal = session.bearerJwt

    # outputs= await Order.filterOrders(session=session,name=" ",execOptions= ActionExecOptions(execEnv="current"))
    # print(outputs)

    # outputs= await Order.deleteOrderItems(orderId="63ae88c2b7fbdc006d69a711",itemId="63ac0eed1d8a2a53ae0fc0de",execOptions= ActionExecOptions(execEnv="current"),session=session)
    # print(outputs)

    # outputs= await Customer.getCustomerOrders(session=session,id="63ad84b6aca2375cf69ea805",execOptions= ActionExecOptions(execEnv="current"))
    # print(outputs)

    # outputs= await Item.getItemOrders(session=session,id="63ac0eed1d8a2a53ae0fc0de",execOptions= ActionExecOptions(execEnv="current"))
    # print(outputs)

    # outputs= await Order.getOrder(session=session,id="63b99ee9b7fbdc012a41105d",execOptions= ActionExecOptions(execEnv="current"))
    # print(outputs)



    # outputs= await Item.getItemCustomers(session=session,id="63ac0eed1d8a2a53ae0fc0de",execOptions= ActionExecOptions(execEnv="current"))
    # print(outputs)

    # outputs= await Customer.searchCustomer(session=session,name="i@gmail",execOptions= ActionExecOptions(execEnv="current"))
    # print(outputs)

    # pagination = {
    #     "sortBy": "system.createdTime",
    #     "sortDir": "DESC",
    #     "limit": 2,
    #     "offset": 2,
    # }
    # outputs = await Customer.filterCustomers(session=session, val="", paginationObj=pagination, execOptions=ActionExecOptions(execEnv="current"))
    # print(outputs)
    
    pagination = {
        "sortBy": "system.createdTime",
        "sortDir": "DESC",
        "limit": 3,
        "offset": 0,
    }
    outputs = await Item.filterItems(session=session, name="", paginationObj=pagination, execOptions=ActionExecOptions(execEnv="current"))
    print(outputs)
    
    

loop = asyncio.get_event_loop()

loop.run_until_complete(run())
