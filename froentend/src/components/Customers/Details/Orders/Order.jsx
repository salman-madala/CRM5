import React from "react";
import { Fragment } from "react";
import ContactService from "../../../../services/contactService";
import { useQuery } from "react-query";
import { DetailsList, IconButton } from "@fluentui/react";


const Order = (props) => {
  const { id } = props.data
  console.log(id);

  // const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  // const [deleteItemInfo, setDeleteItemInfo] = useState()
  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column2",
      name: "Address",
      fieldName: "address",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column3",
      name: "Phonenumber",
      fieldName: "contact",
      minWidth: 100,
      maxWidth: 150,
    },
  ];


  const getAllCustomerOrders = async (id) => {
    return ContactService.getAllCustomerOrders(id);
  }

  const { isLoading, data, isError, error,refetch:fetchCustomerOrders } = useQuery(["get-all-customerOrder", id], () => getAllCustomerOrders(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
    select: (data) => {
      const res = data.data.outputs !== undefined
        ? data.data.outputs.orders.map((items, index) => {
          var content = data.data.__refs[`outputs.orders[${index}]`];
          return content;
        })
        : [];
        console.log(res);
      return res
    },
  })




  // const deleteItemHandler = (item) => {
  //   setDeleteItemInfo(item)
  //   setisConfirmDialogOpen((prev) => !prev);
  // }

  // const deleteItem = async (res, item) => {
  //   if (res) {
  //     await deleteOrderItem(item.id)
  //     setisConfirmDialogOpen(false);
  //   } else {
  //     setisConfirmDialogOpen(false);
  //   }
  // }

  // const deleteCustomerData = (itemId) => {
  //   return ContactService.deleteOrderItem(orderId, itemId)
  // }
  // const { mutate: deleteOrderItem } = useMutation((itemId) => deleteCustomerData(itemId), {
  //   onSuccess: () => {
  //     notify({
  //       text: `Item in order deleted successfully`,
  //       type: NotificationType.SUCCESS,
  //     });
  //   },
  //   onError: () => {
  //     notify({
  //       text: `Error deleting item in order`,
  //       type: NotificationType.ERROR,
  //     });
  //   }
  // })


  const renderItemColumn = (item, index, column) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
      case "column4":
        return (
          <Fragment>
            <IconButton
              iconProps={{ iconName: "Delete" }}
              aria-label="Delete"
              title="Delete"
              styles={{ rootHovered: { color: "red" } }}
              // onClick={() => deleteItemHandler(item)}
            />
          </Fragment>
        );
      default:
        return <span>{fieldContent}</span>;
    }
  };






  const _getKey = (item, index, number) => {
    return item.id;
  };

  if (isLoading) {
    return <h1>Loading data please wait...</h1>
  }

  if (isError) {
    return <h3>error occer {error.message}</h3>
  }


  return (
    <Fragment>
      {data?.length === 0 ? (
        <span>No Orders</span>
      ) : (
        <DetailsList items={data} columns={columns} getKey={_getKey} checkboxVisibility={2} onRenderItemColumn={renderItemColumn}
        />
      )}


      {/* {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteItem} data={deleteItemInfo} />
      )} */}

    </Fragment>
  );
};

export default Order;
