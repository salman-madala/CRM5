import create from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const orderStore = (set) => ({
  orders: [], // initialization orders array  in store
  allOrders : (orders)=>{
    if(orders !== undefined){
     set((state)=>({
         orders : orders
     }))
    }
 },
  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }));
  },
  removeOrder: (id) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    }));
  },

  updateOrder: (order) => {
    set((state) => ({
      orders: state.orders.map((cus) => {
        if (cus.id === order.id) {
          return order;
        } else {
          return cus;
        }
      }),
    }));
  },
});

const useOrderstore = create(
  devtools(
    persist(orderStore, {
      name: "orderStore",
    })
  )
);

export default useOrderstore;
