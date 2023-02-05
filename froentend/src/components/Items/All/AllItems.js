import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import DataTable from "../../UI/Table/DataTable";
import ToolBar from "../../UI/ToolBar/ToolBar";
import NewItem from "../New/NewItem";
import { notify, NotificationType } from "@altair/gooey";
import ConfirmDialog from "../../UI/ConfirmDialogs/ConfirmDialog";
import ContactService from "../../../services/contactService";
import ItemDetails from "../Details/ItemDetails";
import { useQuery,useQueryClient } from "react-query";
import useItemstore from "../../../store/ItemsStore";
import { useMemo } from "react";
import { useMutation } from "react-query";
import usePaginationstore from "../../../store/PaginationStore";
import useManageItem from "../hooks/useManageItems";

const NEW_ITEM = {
  name: "",
  cost: "",
};

const AllItems = () => {
  let totalNumberOfItems;
  const queryClient = useQueryClient()


  const storeItems = useItemstore(state => state.items)
  const pagination = usePaginationstore((state) => state.pagination);


  const [item, setItem] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [searchValue, setSearchVal] = useState("")

  const {_addItem,_updateItem,_deleteItem,_getAllItems,_getFilterItems} = useManageItem()


  // zustand CRUD Operations
  const allItems = useItemstore(state => state.allItems)
  const addItem = useItemstore(state => state.addItem)
  const updateItem = useItemstore(state => state.updateItem)
  const removeItem = useItemstore(state => state.removeItem)


  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 300,
      maxWidth: 450,
    },
    {
      key: "column2",
      name: "Cost",
      fieldName: "cost",
      minWidth: 300,
      maxWidth: 450,
    },
    { key: "action", name: "Actions", minWidth: 300, maxWidth: 450 },
  ];



  const getAllItems = async () => {
    // return ContactService.getFilterItems(searchValue,pagination);
    // return ContactService.getAllItems()
    return _getFilterItems(searchValue,pagination)
  }

  const { data, refetch } = useQuery("get-items", getAllItems, {
    // enabled: false,
    //refetchOnMount: true,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log(data);
      // const res = data.data.outputs !== undefined
      //   ? data.data.outputs.items.map((order, index) => {
      //     var content = data.data.__refs[`outputs.items[${index}]`];
      //     return content;
      //   })
      //   : [];
      // return res
      const res =
          data !== undefined
            ? data?.items.map((customer, index) => {
                var content = customer.__data;
                return content;
              })
            : [];
            totalNumberOfItems = data.totalItemsCount
        return res;
    },
    // refetchInterval:1000
    //refetchIntervalInBackground:1000,    
  })

  useEffect(() => {
    refetch()
    allItems(data);
  }, [data, storeItems, searchValue]);



  // ------------ create Item function ------------------------------ 
  const createItemHandler = async (item) => {
    // for zustand and react query issue 
    await create(item)
    hideModal();
  };

  const createItem = (item) => {
    return ContactService.createItem(item);
  }

  const { mutate: create } = useMutation((item) => createItem(item), {
    onSuccess: async (data) => {
      await console.log(data.data.__refs['outputs.itemRef.content']);
      // await addItem(data.data.__refs['outputs.itemRef.content']) // add Item to Zustand store
      await queryClient.invalidateQueries('get-items')

      notify({
        text: `Item created successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error creating Item`,
        type: NotificationType.ERROR,
      });
    }
  })


  // ------------ update Item function ------------------------------ 
  const updateHandeler = async (item) => {
    update(item)
    hideModal();
  };

  const updateItemData = (item) => {
    return ContactService.updateItem({
      itemRef: item,
    });
  }

  const { mutate: update } = useMutation((item) => updateItemData(item), {
    onSuccess: async (data) => {
      console.log(data.data.__refs['outputs.itemRef.content']);
      await updateItem(data.data.__refs['outputs.itemRef.content']) //store update
      notify({
        text: `Item update successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error updating Item`,
        type: NotificationType.ERROR,
      });
    }
  })

  // ------------ delete Item function ------------------------------ 

  const deleteItem = (res, item) => {
    if (res) {
      remove(item.id)
    } else {
      setisConfirmDialogOpen(false);
    }
  };

  const deleteItemData = (id) => {
    return ContactService.removeItem(id)
  }
  const { mutate: remove } = useMutation((id) => deleteItemData(id), {
    onSuccess: async (data) => {
      await removeItem(data.data.id); // zustand delete store value
      setisConfirmDialogOpen(false);
      notify({
        text: `Item deleted successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error deleting Item`,
        type: NotificationType.ERROR,
      });
    }
  })

  // const deleteItem = async (res, item) => {
  //   if (res) {
  //     const response = await ContactService.removeItem(item.id);
  //     if (response.status === 200) {
  //       setisConfirmDialogOpen(false);

  //       const newItemList = items.filter((con) => {
  //         return con.id !== item.id;
  //       });
  //       setItems(newItemList);
  //       notify({
  //         text: `Item deleted successfully`,
  //         type: NotificationType.SUCCESS,
  //       });
  //     } else {
  //       notify({ text: `Item deleted falure`, type: NotificationType.ERROR });
  //     }
  //   } else {
  //     console.log("not Deleted");
  //     setisConfirmDialogOpen(false);
  //   }
  // };

  function showModal() {
    setIsModalOpen(true);
    setItem(NEW_ITEM);
  }
  function hideModal() {
    setIsModalOpen(false);
  }

  const deleteHandler = (item) => {
    setisConfirmDialogOpen(true);
    setItem(item);
  };

  const editHandler = (item) => {
    setItem(item);
    setIsModalOpen(true);
  };

  const detailsHandler = (item) => {
    setItem(item);
    setIsDetailsView(true);
  };

  const closeDetailsPanel = () => {
    setItem();
    setIsDetailsView(false);
  };

  const search = (val) => {
    setSearchVal(val);
  };

   // -------- pagination ------------------
   const nextPage = (pag) => {
    refetch()
  };

  const prevPage = (pag) => {
    refetch()
  };


  const itemList = useMemo(() => storeItems, [storeItems]);
  const columnsList = useMemo(() => columns, [columns]);


  return (
    <Fragment>
      <ToolBar
        onClick={showModal}
        title="Items"
        name="Item"
        iconName="Settings"
        searchOptions={{ search }}
      />
      <DataTable
        items={itemList}
        columns={columnsList}
        onEdit={editHandler}
        onDelete={deleteHandler}
        onDetails={detailsHandler}
        nextPage={nextPage}
        prevPage={prevPage}
        totalItemsCount = {totalNumberOfItems}
      />

      {isModalOpen && (
        <NewItem
          isModalOpen={isModalOpen}
          onHideModel={hideModal}
          item={item}
          onUpdate={updateHandeler}
          onCreate={createItemHandler}
        />
      )}

      {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteItem} data={item} />
      )}

      {isDetailsView && (
        <ItemDetails
          item={item}
          isDetailsView={isDetailsView}
          closeDetailsPanel={closeDetailsPanel}
        />
      )}
    </Fragment>
  );
};

export default AllItems;
