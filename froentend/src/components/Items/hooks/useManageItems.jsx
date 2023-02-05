import { Item } from '@altair/crm5'
import { useCallback } from 'react'
import { getSession } from '../../../session'

const useManageItem = () => {

  const _addItem = useCallback(async (item)=>{
    const session = await getSession();
    const res = await Item.createItem({session,name:item.name,cost:item.cost})
    // console.log(res.itemRef.__data);
    return res.itemRef.__data
  },[])

  const _updateItem = useCallback(async (data) =>{
    const session = await getSession();
    const res = await Item.updateItem({session,id: data.itemRef.id, item:data.itemRef})
    return res
  },[])

  const _deleteItem = useCallback(async(item) =>{
    const session = await getSession();
    const res = await Item.deleteItem({session,id:item.id})
    return res
  },[])

  const _getAllItems=useCallback(async () =>{
    const session = await getSession();
    const { items } = await Item.getAllItems({ session });
    return items
  },[])

  const _getFilterItems=useCallback(async (searchValue, paginationObj) =>{
    const session = await getSession();
    const  {__data}  = await Item.filterItems({ session , name:searchValue, paginationObj:paginationObj});
    return __data
  },[])

  return {_addItem,_updateItem,_deleteItem,_getAllItems,_getFilterItems}
}

export default useManageItem