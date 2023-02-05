import create from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const customerStore = (set) => ({
  customers: [], // initialization customers array  in store
  allCustomers : (customers)=>{
    if(customers !== undefined){
     set((state)=>({
         customers : customers
     }))
    }
 },
  addCustomer: (customer) => {
    set((state) => ({
      customers: [customer, ...state.customers],
    }));
  },
  removeCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    }));
  },

  updateCustomer: (customer) => {
    set((state) => ({
      customers: state.customers.map((cus) => {
        if (cus.id === customer.id) {
          return customer
        } else {
          return cus;
        }
      }),
    }));
  },
});

const useCustomerstore = create(
  devtools(
    persist(customerStore, {
      name: "customerStore",
    })
  )
);

export default useCustomerstore;
