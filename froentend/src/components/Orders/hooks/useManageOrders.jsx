import { Order } from '@altair/crm5'
import { useCallback } from 'react'
import { getSession } from '../../../session'

const useManageOrder = () => {

  const _addOrder = useCallback(async (order)=>{
    const session = await getSession();
    const res = await Order.createOrder({session,name:order.name,cost:order.cost})
    // console.log(res.orderRef.__data);
    return res.orderRef.__data
  },[])

  const _updateOrder = useCallback(async (data) =>{
    const session = await getSession();
    const res = await Order.updateOrder({session,id: data.orderRef.id, order:data.orderRef})
    return res
  },[])

  const _deleteOrder = useCallback(async(order) =>{
    const session = await getSession();
    const res = await Order.deleteOrder({session,id:order.id})
    return res
  },[])

  const _getAllOrders=useCallback(async () =>{
    const session = await getSession();
    const { orders } = await Order.getAllOrders({ session });
    return orders
  },[])

  const _getFilterOrders=useCallback(async (searchValue, paginationObj) =>{
    const session = await getSession();
    const  {__data}  = await Order.filterOrders({ session , name:searchValue, paginationObj:paginationObj});
    return __data
  },[])

  return {_addOrder,_updateOrder,_deleteOrder,_getAllOrders,_getFilterOrders}
}

export default useManageOrder