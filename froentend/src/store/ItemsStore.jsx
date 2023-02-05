import create from 'zustand'
import {devtools,persist} from 'zustand/middleware'

const itemStore = (set) => ({
  items: [], // initialization items array  in store
  allItems : (items)=>{
    if(items !== undefined){
     set((state)=>({
         items : items
     }))
    }
 },
  addItem: (item) => {
    set((state) => ({
      items: [item, ...state.items],
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateItem: (item) => {
    set((state) => ({
      items: state.items.map((cus) => {
        if (cus.id === item.id) {
          return item;
        } else {
          return cus;
        }
      }),
    }));
  },
});

const useItemstore = create(
  devtools(
    persist(itemStore, {
      name: "itemStore",
    })
  )
);

export default useItemstore;
