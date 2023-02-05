import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const paginationStore = (set) => ({
  pagination: {
    hidden: false,
    sortBy: "system.createdTime",
    sortDir: "DESC",
    limit: 5,
    offset: 0,
  }, // initialization pagination  in store
  resetPagination :(obj)=>{
    set((state) => ({
        pagination: obj,
      }));
  },
  nextPage: (paginationObj) => {
    console.log("next", paginationObj);
    if (paginationObj !== undefined) {
      set((state) => ({
        pagination: paginationObj,
      }));
    }
  },
  prevPage: (paginationObj) => {
    console.log("prev Page", paginationObj);
    if (paginationObj !== undefined && !(paginationObj?.offset < 0)) {
      set((state) => ({
        pagination: paginationObj,
      }));
    }
  },
});

const usePaginationstore = create(
  devtools(
    persist(paginationStore, {
      name: "paginationStore",
    })
  )
);

export default usePaginationstore;
