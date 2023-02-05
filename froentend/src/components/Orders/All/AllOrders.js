import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import DataTable from "../../UI/Table/DataTable";
import ToolBar from "../../UI/ToolBar/ToolBar";
import { notify, NotificationType } from "@altair/gooey";
import ConfirmDialog from "../../UI/ConfirmDialogs/ConfirmDialog";
import ContactService from "../../../services/contactService";
import NewOrder from "../New/NewOrder";
import OrderDetails from "../Details/OrderDetails";
import useManageOrder from "../hooks/useManageOrders";
import usePaginationstore from "../../../store/PaginationStore";
import { useQuery } from "react-query";
import useOrderstore from "../../../store/OrdersStore";
import { useMutation } from "react-query";


const NEW_ITEM = {
  name: "",
  contact: "",
  address: "",
  items: [],
  customerRef: "",
};

const AllOrders = () => {
  let totalNumberOfOrders;

  const storeOrders = useOrderstore(state => state.orders)
  const pagination = usePaginationstore((state) => state.pagination);

  const [item, setItem] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [searchValue,setSearchVal] = useState(" ")


  const {_addOrder,_updateOrder,_deleteOrder,_getAllOrders,_getFilterOrders} = useManageOrder()


  // zustand CRUD Operations
  const allOrders = useOrderstore(state => state.allOrders)
  const addOrder = useOrderstore(state => state.addOrder)
  const updateOrder = useOrderstore(state => state.updateOrder)
  const removeOrder = useOrderstore(state => state.removeOrder)

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 150,
      maxWidth: 150,
    },
    {
      key: "column2",
      name: "Contact",
      fieldName: "contact",
      minWidth: 150,
      maxWidth: 150,
    },
    {
      key: "column3",
      name: "Address",
      fieldName: "address",
      minWidth: 150,
      maxWidth: 150,
    },
    {
      key: "column4",
      name: "Items",
      fieldName: "",
      minWidth: 150,
      maxWidth: 150,
    },

    { key: "action", name: "Actions", minWidth: 300, maxWidth: 450 },
  ];


  const getAllOrders = async () => {
    // return ContactService.getFilterItems(searchValue,pagination);
    // return ContactService.getAllItems()
    return _getFilterOrders(searchValue,pagination)
  }

  const { data, refetch } = useQuery("get-orders", getAllOrders, {
    enabled: false,
    select: (data) => {
      console.log(data);
      const res =
          data !== undefined
            ? data?.orders.map((order, index) => {
                var content = order.__data;
                return content;
              })
            : [];
            totalNumberOfOrders = data.totalOrdersCount
        return res;
    },  
  })

  useEffect(() => {
    refetch();
    allOrders(data)
  }, [data,storeOrders,searchValue]);


  // ------------ create Order function ------------------------------ 
  const createOrderHandler = async (order) => {
    // for zustand and react query issue 
    await create(order)
    hideModal();
  };

  const createOrder = (order) => {
    return ContactService.createOrder(order);
  }

  const { mutate: create } = useMutation((order) => createOrder(order), {
    onSuccess: async (data) => {
      await console.log(data.data.__refs['outputs.orderRef.content']);
      // await addOrder(data.data.__refs['outputs.orderRef.content']) // add Item to Zustand store
      notify({
        text: `Order created successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error creating Order`,
        type: NotificationType.ERROR,
      });
    }
  })

  // ------------ update Item function ------------------------------ 
  const updateHandeler = async (order) => {
    update(order)
    hideModal();
  };

  const updateOrderData = (order) => {
    return ContactService.updateOrder({
      orderRef: order,
    });
  }

  const { mutate: update } = useMutation((order) => updateOrderData(order), {
    onSuccess: async (data) => {
      console.log(data.data.__refs['outputs.orderRef.content']);
      await updateOrder(data.data.__refs['outputs.orderRef.content']) //store update
      notify({
        text: `Order update successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error updating Order`,
        type: NotificationType.ERROR,
      });
    }
  })



  // ------------ delete Item function ------------------------------ 
  const deleteOrder = (res, item) => {
    if (res) {
      remove(item.id)
    } else {
      setisConfirmDialogOpen(false);
    }
  };

  const deleteOrderData = (id) => {
    return ContactService.removeOrder(id)
  }
  const { mutate: remove } = useMutation((id) => deleteOrderData(id), {
    onSuccess: async (data) => {
      await removeOrder(data.data.id); // zustand delete store value
      setisConfirmDialogOpen(false);
      notify({
        text: `Order deleted successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error deleting Order`,
        type: NotificationType.ERROR,
      });
    }
  })

  function showModal() {
    setIsModalOpen(true);
    setItem(NEW_ITEM);
  }
  function hideModal() {
    setIsModalOpen(false);
    getAllOrders();
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

  const ordersList = useMemo(() => storeOrders, [storeOrders]);
  const columnsList = useMemo(() => columns, [columns]);


  return (
    <Fragment>
      <ToolBar
        onClick={showModal}
        title="Orders"
        name="Order"
        iconName="Settings"
        searchOptions={{ search }}
      />
      <DataTable
        items={ordersList}
        columns={columnsList}
        onEdit={editHandler}
        onDelete={deleteHandler}
        onDetails={detailsHandler}
        nextPage={nextPage}
        prevPage={prevPage}
        totalItemsCount = {totalNumberOfOrders}
      />
      {isModalOpen && (
        <NewOrder
          isModalOpen={isModalOpen}
          onHideModel={hideModal}
          item={item}
          onUpdate={updateHandeler}
          onCreate={createOrderHandler}
        />
      )}

      {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteOrder} data={item} />
      )}

      {isDetailsView && (
        <OrderDetails
          item={item}
          isDetailsView={isDetailsView}
          closeDetailsPanel={closeDetailsPanel}
        />
      )}
    </Fragment>
  );
};

export default AllOrders;
