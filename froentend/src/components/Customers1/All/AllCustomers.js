import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import ToolBar from "../../UI/ToolBar/ToolBar";
import { notify, NotificationType } from "@altair/gooey";
import ContactService from "../../../services/contactService";
import DataTable from "../../UI/Table/DataTable";
import NewCustomer from "../New/NewCustomer";
import ConfirmDialog from "../../UI/ConfirmDialogs/ConfirmDialog";
import CustomerDetails from "../Details/CustomerDetails";
import { useMemo } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import useCustomerstore from "../../../store/CustomerStore";
import { useMutation } from "react-query";

const NEW_CUSTOMER = {
  name: "",
  email: "",
};

const pagination = {
  hidden: false,
  sortBy: "system.createdTime",
  sortDir: "DESC",
  limit: 1,
  offset: 0,
};

const AllCustomers = () => {



  // zustand store
  const storeCustomers = useCustomerstore(state => state.customers)

  const [customer, setCustomer] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [searchValue, setSearchVal] = useState(" ")
  const [paginationObj, setPaginationObj] = useState(pagination)

  // zustand CRUD Operations
  const allCustomers = useCustomerstore(state => state.allCustomers)
  const addCustomer = useCustomerstore(state => state.addCustomer)
  const updateCustomer = useCustomerstore(state => state.updateCustomer)
  const removeCustomer = useCustomerstore(state => state.removeCustomer)


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
      name: "email",
      fieldName: "email",
      minWidth: 150,
      maxWidth: 150,
    },
    { key: "action", name: "Actions", minWidth: 300, maxWidth: 450 },
  ];

  const getAllCustomers = async () => {
    return ContactService.getSearchCustomers(searchValue);
  }


  const { isLoading, data, isError, error, refetch } = useQuery("get-customers", getAllCustomers, {
    enabled: false,
    //refetchOnMount: true,
    refetchOnWindowFocus: false,
    select: (data) => {
      const res = data.data.outputs !== undefined
        ? data.data.outputs.customers.map((order, index) => {
          var content = data.data.__refs[`outputs.customers[${index}]`];
          return content;
        })
        : [];
      return res
    },
    // refetchInterval:1000
    //refetchIntervalInBackground:1000,    
  })

  useEffect(() => {
    refetch();
    allCustomers(data)
  }, [data, searchValue]);


  // ------------ create Customer function ------------------------------ 
  const createCustomerHandler = async (customer) => {
    // for zustand and react query issue 
   await create(customer)
    hideModal();
  };


  const createCustomers = (cus) => {
    return ContactService.createCustomer(cus);
  }

  const { mutate: create } = useMutation((customer) => createCustomers(customer), {
    onSuccess: (data) => {
      addCustomer(data.data.__refs['outputs.customerRef.content']) // add customer to Zustand store
      notify({
        text: `Customer created successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error creating Customer`,
        type: NotificationType.ERROR,
      });
    }
  })


 

  // ------------ update Customer function ------------------------------ 
  const updateHandeler = async (customer) => {
    update(customer)
    hideModal();
  };

  const updateCustomerData = (cus) => {
    return ContactService.updateCustomer({
      customerRef: cus,
    });
  }

  const { mutate: update } = useMutation((customer) => updateCustomerData(customer), {
    onSuccess: (data) => {
      updateCustomer(data.data.__refs['outputs.customer.content']) //store update
      notify({
        text: `Customer update successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error updating Customer`,
        type: NotificationType.ERROR,
      });
    }
  })

  

  // ------------ delete Customer function ------------------------------ 
  const deleteItem = async (res, customer) => {
    if (res) {
     await deleteCus(customer.id)
     removeCustomer(customer.id); // zustand delete store value
    } else {
      setisConfirmDialogOpen(false);
    }
  };


const deleteCustomerData = (id) =>{
return ContactService.removeCustomer(id)
}
  const { mutate: deleteCus } = useMutation((id) => deleteCustomerData(id), {
    onSuccess: (data) => {
      
      setisConfirmDialogOpen(false);
      notify({
        text: `Customer deleted successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error deleting Customer`,
        type: NotificationType.ERROR,
      });
    }
  })

  const showModal = useCallback(() => {
    setCustomer(NEW_CUSTOMER);
    setIsModalOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
    // getAllCustomers();
  }, []);

  const deleteHandler = useCallback((data) => {
    setisConfirmDialogOpen((prev) => !prev);
    setCustomer(data);
  }, []);

  const editHandler = useCallback((data) => {
    setCustomer(data);
    setIsModalOpen((prev) => !prev);
  }, []);

  const detailsHandler = useCallback((data) => {
    setCustomer(data);
    setIsDetailsView((prev) => !prev);
  }, []);

  const closeDetailsPanel = () => {
    setCustomer();
    setIsDetailsView((prev) => !prev);
  };

  const customersList = useMemo(() => storeCustomers, [storeCustomers]);
  const columnsList = useMemo(() => columns, [columns]);

  const search = (val) => {
    setSearchVal(val)
  }

  const nextPage = (pagination) => {
    console.log("nextPage", pagination);
    setPaginationObj(pagination)
  }

  const prevPage = (pagination) => {
    console.log("prevPage", pagination);
    setPaginationObj(pagination)
  }

  return (
    <Fragment>
      <ToolBar
        onClick={showModal}
        title="Customers"
        name="Customer"
        iconName="User"
        searchOptions={{ search }}
      />
      {isLoading ? <h3>Loading....</h3> :
        <DataTable
          items={customersList}
          columns={columnsList}
          onEdit={editHandler}
          onDelete={deleteHandler}
          onDetails={detailsHandler}
          nextPage={nextPage}
          prevPage={prevPage}
        />}
      {isModalOpen && (
        <NewCustomer
          isModalOpen={isModalOpen}
          onHideModel={hideModal}
          item={customer}
          onUpdate={updateHandeler}
          onCreate={createCustomerHandler}
        />
      )}

      {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteItem} data={customer} />
      )}

      {isDetailsView && (
        <CustomerDetails
          item={customer}
          isDetailsView={isDetailsView}
          closeDetailsPanel={closeDetailsPanel}
        />
      )}
    </Fragment>
  );
};

export default AllCustomers;
