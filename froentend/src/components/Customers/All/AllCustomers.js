import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import ToolBar from "../../UI/ToolBar/ToolBar";
import { notify, NotificationType } from "@altair/gooey";
import ContactService from "../../../services/contactService";
import NewCustomer from "../New/NewCustomer";
import ConfirmDialog from "../../UI/ConfirmDialogs/ConfirmDialog";
import CustomerDetails from "../Details/CustomerDetails";
import { useMemo } from "react";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";
import useCustomerstore from "../../../store/CustomerStore";
import { useMutation } from "react-query";
import { uploadFile, info } from "@altair/drive-sdk";
import useManageCustomer from "../hooks/useManageCustomer";
import _ from "lodash";
import usePaginationstore from "../../../store/PaginationStore";
import DataTable1 from "../../UI/Table/DataTable1";
import InfinitScroll from "../../InfiniteScroll/InfinitScroll";
import DataTable from "../../UI/Table/DataTable";
import { useHistory } from "react-router-dom";



const NEW_CUSTOMER = {
  name: "",
  email: "",
  imageId: "",
};

const AllCustomers = () => {
  console.log("component render ");
  let history = useHistory(); 
  const queryClient = useQueryClient()
  // zustand store
  const storeCustomers = useCustomerstore((state) => state.customers);
  const pagination = usePaginationstore((state) => state.pagination);

  const [customer, setCustomer] = useState();
  const [imageVal, setImageVal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [searchValue, setSearchVal] = useState("");
  // const [paginationObj, setPaginationObj] = useState(pagination);

  let totalNumberOfCustomers;

  // zustand CRUD Operations
  const allCustomers = useCustomerstore((state) => state.allCustomers);
  const addCustomer = useCustomerstore((state) => state.addCustomer);
  const updateCustomer = useCustomerstore((state) => state.updateCustomer);
  const removeCustomer = useCustomerstore((state) => state.removeCustomer);

  const { _addCustomer, _updateCustomer, _deleteCustomer, _getAllCustomers, _getFilterCustomers } = useManageCustomer()

  const columns = [
    {
      key: "name",
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
    //return ContactService.getSearchCustomers(searchValue);
    // return ContactService.getAllCustomers();
    // return ContactService.getFilterCustomers(searchValue, paginationObj);
    return _getFilterCustomers(searchValue, pagination)
  };

  const { isLoading, data, refetch: getAll } = useQuery(
    "get-customers",
    getAllCustomers,
    {
      enabled: false,
      select: (data) => {
        // console.log(data);
        const res =
          data !== undefined
            ? data?.customers.map((customer, index) => {
              var content = customer.__data;
              return content;
            })
            : [];
        totalNumberOfCustomers = data.totalCustomersCount
        return res;
      },
    }
  );

  useEffect(() => {
    getAll();
    allCustomers(data);
  }, [data, searchValue, pagination]);

  // ------------ create Customer function ------------------------------
  const createCustomerHandler = async (customer) => {
    try {
      if (imageVal !== "undefined" && imageVal.type === "image/png") {
        const { content: targetDirectory } = await info({
          path: "/Users/smadala",
        });
        const res = await uploadFile({
          file: imageVal,
          target: targetDirectory,
        });
        customer.imageId = res.id;
        await create(customer);
        await hideModal();
      } else {
        notify({
          text: `please Enter valide image type (jpg/png) formate`,
          type: NotificationType.WARNING,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createCustomers = (cus) => {
    return ContactService.createCustomer(cus);
    // return _addCustomer(cus)
  };

  const { mutate: create } = useMutation(
    (customer) => createCustomers(customer),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('get-customers')
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
      },
    }
  );


  // ------------ update Customer function ------------------------------
  const updateCustomerHandeler = async (customer) => {
    update(customer);
    hideModal();
  };

  const updateCustomerData = (cus) => {
    // return ContactService.updateCustomer({
    //   customerRef: cus,
    // });
    return _updateCustomer({
      customerRef: cus,
    })
  };

  const { mutate: update } = useMutation(
    (customer) => updateCustomerData(customer),
    {
      onSuccess: (data) => {
        // updateCustomer(data.data.__refs["outputs.customer.content"]); //store update
        updateCustomer(data.__data.customer.content.__data)
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
      },
    }
  );

  // ------------ delete Customer function ------------------------------
  const deleteItem = async (res, customer) => {
    if (res) {
      await deleteCus(customer);
      removeCustomer(customer.id); // zustand delete store value
    } else {
      setisConfirmDialogOpen(false);
    }
  };

  const deleteCustomerData = (customer) => {
    //return ContactService.removeCustomer(customer.id);
    return _deleteCustomer(customer);
  };
  const { mutate: deleteCus } = useMutation((customer) => deleteCustomerData(customer), {
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
    },
  });

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
    setSearchVal(val);
  };

  // -------- pagination ------------------
  const nextPage = useCallback(() => {
    getAll()
  },[]);

  const prevPage = useCallback(() => {
    getAll()
  },[]);

  const detailsPage = useCallback((val) =>{
    history.push({pathname:`customer/${val.id}`,state:{customer:val}})
  } ,[])

  return (
    <Fragment>
      <ToolBar
        onClick={showModal}
        title="Customers"
        name="Customer"
        iconName="User"
        searchOptions={{ search }}
      />
      {isLoading ? (
        <h3>Loading....</h3>
      ) : (
        <Fragment>
          <DataTable
            items={customersList}
            columns={columnsList}
            onEdit={editHandler}
            onDelete={deleteHandler}
            onDetails={detailsHandler}
            nextPage={nextPage}
            prevPage={prevPage}
            totalItemsCount={totalNumberOfCustomers}
            detailsPage={detailsPage}
          />
          {/* <InfinitScroll
            items={customersList}
            columns={columnsList}
            onEdit={editHandler}
            onDelete={deleteHandler}
            onDetails={detailsHandler}
            nextPage={nextPage}
            prevPage={prevPage}
          /> */}
        </Fragment>
      )}
      {isModalOpen && (
        <NewCustomer
          isModalOpen={isModalOpen}
          onHideModel={hideModal}
          item={customer}
          onUpdate={updateCustomerHandeler}
          onCreate={createCustomerHandler}
          setImageVal={setImageVal}
        />
      )}

      {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteItem} data={customer} />
      )}

      {isDetailsView && (
        <CustomerDetails
          customer={customer}
          isDetailsView={isDetailsView}
          closeDetailsPanel={closeDetailsPanel}
        />
      )}
    </Fragment>
  );
};

export default AllCustomers;
