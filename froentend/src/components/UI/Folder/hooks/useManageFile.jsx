import { CustomFileEntity } from '@altair/crm5'
import { useCallback } from 'react'
import { getSession } from '../../../../session';

const useManageFiles = () => {

  const _addFiles = useCallback(async (contentRef,fileRef)=>{
    const session = await getSession();
    const res = await CustomFileEntity.createFile({session,contentRef:contentRef,description:"",islock:"false",fileRef:fileRef})
    console.log(res);
    return res
  },[])

  const _updateFile = useCallback(async (data) =>{
    const session = await getSession();
    const res = await CustomFileEntity.updateFile({session,id: data.customerRef.id, customer:data.customerRef})
    return res
  },[])

  const _deleteFile = useCallback(async(customer) =>{
    // const session = await getSession();
    // const res = await Customer.deleteCustomer({session,id:customer.id})
    // return res
  },[])

  const _getAllFiles=useCallback(async (data) =>{
    const session = await getSession();
    const  res  = await CustomFileEntity.getFiles({ session,contentRef:data});
    return res.__data
  },[])

  

  return {_addFiles,_updateFile,_deleteFile,_getAllFiles}
}

export default useManageFiles