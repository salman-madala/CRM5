import http from "../api/contact";

const contentName = "crm5"

const getAllItems = () => {
  return http.post(`${contentName}/Item/getAllItems`);
}

const createItem = data => {
  return http.post(`${contentName}/Item/createItem`, data);
};

const updateItem = (data) => {
  return http.post(`${contentName}/Item/updateItem`, data);
};

const removeItem = id => {
  return http.post(`${contentName}/Item/deleteItem`, { "id": id });
};

const getItemById = id => {
  return http.post(`${contentName}/Item/getItem`, { "id": id });
};

const getFilterItems = (val,pagination) => {
  return http.post(`${contentName}/Item/filterItems`, { "name": val , "paginationObj": pagination})
}
const getItemOrders = (itemId) => {
  return http.post(`${contentName}/Item/getItemOrders`, { "id": itemId })
}
const getItemCustomers = (itemId) => {
  return http.post(`${contentName}/Item/getItemCustomers`, { "id": itemId })
}

const getAllOrders = () => {
  return http.post(`${contentName}/Order/getAllOrders`);
}

const createOrder = data => {
  return http.post(`${contentName}/Order/createOrder`, data);
};

const updateOrder = (data) => {
  return http.post(`${contentName}/Order/updateOrder`, data);
};

const removeOrder = id => {
  return http.post(`${contentName}/Order/deleteOrder`, { "id": id });
};

const getFilterOrders = (val) => {
  return http.post(`${contentName}/Order/filterOrders`, { "name": val })
}

const getOrder = (val) => {
  return http.post(`${contentName}/Order/getOrder`, { "id": val })
}

const getOrderItems = (id) => {
  return http.post(`${contentName}/Order/getOrderItems`, { "id": id })
}

const deleteOrderItem = (orderId, itemId) => {
  return http.post(`${contentName}/Order/deleteOrderItems`, { "orderId": orderId, "itemId": itemId })
}

const getAllCustomers = () => {
  return http.post(`${contentName}/Customer/GetAllCustomers`);
}

const createCustomer = data => {
  return http.post(`${contentName}/Customer/createCustomer`, data);
};

const updateCustomer = (data) => {
  return http.post(`${contentName}/Customer/updateCustomer`, { "id": data.customerRef.id, "customer": data.customerRef });
};

const removeCustomer = id => {
  return http.post(`${contentName}/Customer/deleteCustomer`, { "id": id });
};

const getCustomerById = id => {
  return http.post(`${contentName}/Customer/getCustomer`, { "id": id });
};

const getFilterCustomers = (val, pagination) => {
  return http.post(`${contentName}/Customer/filterCustomers`, { "val": val, "paginationObj": pagination })
}

const getSearchCustomers = (val) => {
  return http.post(`${contentName}/Customer/searchCustomer`, { "name": val })
}


const getAllCustomerOrders = (customerId) => {
  return http.post(`${contentName}/Customer/getCustomerOrders`, { "id": customerId })
}

const createCustomerFiles = (fileRef,customerRef) => {
  return http.post(`${contentName}/Customer/createCustomerFiles`, { "fileRef": fileRef,"customerRef":customerRef })
}

const getCustomerFiles = (customerRef) => {
  return http.post(`${contentName}/Customer/getCustomerFiles`, {"customerRef":customerRef })
}

const getDownloadUrl = (imageId) => {
  return http.post("system/Fs/GetDownloadUrl", { "fileId": imageId })
}

const moveToTrashImage = (id) => {
  return http.post("system/Fs/moveToTrash", { "contentRef": { "id": id, "contentType": "altair.system.FileEntity" } })
}

const deleteImage = (path) => {
  return http.post("system/Fs/rm", {"path": path})
}

const getInfoOfFile = (id) =>{
  return http.post("system/Content/getByRef", { "contentRef": { "id": id, "contentType": "altair.system.FileEntity" } })
}



const createCustomerFiles1 = (fileRef,customerRef) => {
  return http.post(`${contentName}/CustomFileEntity/createFile`, { contentRef:customerRef,description:"",islock:false,"fileRef": fileRef })
}

const getFiles = (customerRef) => {
  return http.post(`${contentName}/CustomFileEntity/getFiles`, { contentRef:customerRef})
}

const updateFile = (val) => {
  // console.log(val);
  return http.post(`${contentName}/CustomFileEntity/updateFile`, val)
}

const deleteFile = (id) => {
  return http.post(`${contentName}/CustomFileEntity/deleteFile`, {id:id})
}

const ContactService = {

  getAllItems,
  createItem,
  updateItem,
  removeItem,
  getItemById,
  getFilterItems,
  getItemOrders,
  getItemCustomers,

  getAllOrders,
  createOrder,
  updateOrder,
  removeOrder,
  getFilterOrders,
  getOrder,
  getOrderItems,
  deleteOrderItem,



  getAllCustomers,
  createCustomer,
  updateCustomer,
  removeCustomer,
  getCustomerById,
  getFilterCustomers,
  getSearchCustomers,
  getAllCustomerOrders,
  createCustomerFiles,
  getCustomerFiles,

  getDownloadUrl,
  moveToTrashImage,
  deleteImage,
  getInfoOfFile,
  // file/delete?moveToTrash=true

  createCustomerFiles1,
  getFiles,
  updateFile,
  deleteFile

};

export default ContactService;