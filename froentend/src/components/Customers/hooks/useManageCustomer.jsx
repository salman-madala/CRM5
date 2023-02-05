import { Customer } from '@altair/crm5'
import { useCallback } from 'react'
import { getSession } from '../../../session'

const useManageCustomer = () => {

  const _addCustomer = useCallback(async (customer)=>{
    const session = await getSession();
    const res = await Customer.createCustomer({session,name:customer.name,email:customer.email,imageId:customer.imageId})
    // console.log(res.customerRef.__data);
    return res.customerRef.__data
  },[])

  const _updateCustomer = useCallback(async (data) =>{
    const session = await getSession();
    const res = await Customer.updateCustomer({session,id: data.customerRef.id, customer:data.customerRef})
    return res
  },[])

  const _deleteCustomer = useCallback(async(customer) =>{
    const session = await getSession();
    const res = await Customer.deleteCustomer({session,id:customer.id})
    return res
  },[])

  const _getAllCustomers=useCallback(async () =>{
    const session = await getSession();
    const { customers } = await Customer.getAllCustomers({ session });
    return customers
  },[])

  const _getFilterCustomers=useCallback(async (searchValue, paginationObj) =>{
    const session = await getSession();
    const  {__data}  = await Customer.filterCustomers({ session , val:searchValue, paginationObj:paginationObj});
    return __data
  },[])

  const _createCustomerFiles=useCallback(async (fileRef, customerRef) =>{
    const session = await getSession();
    const  {__data}  = await Customer.createCustomerFiles({ session , fileRef:fileRef, customerRef:customerRef});
    return __data
  },[])

  const _getCustomerFiles=useCallback(async (customerRef) =>{
    const session = await getSession();
    const  {__data}  = await Customer.getCustomerFiles({ session ,customerRef:customerRef});
    return __data
  },[])


  return {_addCustomer,_updateCustomer,_deleteCustomer,_getAllCustomers,_getFilterCustomers,_createCustomerFiles,_getCustomerFiles}
}

export default useManageCustomer