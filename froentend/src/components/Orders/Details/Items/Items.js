import React from "react";
import { Fragment } from "react";
import ContactService from "../../../../services/contactService";
import { useMutation, useQuery } from "react-query";
import { DetailsList, IconButton } from "@fluentui/react";
import { useState } from "react";
import { notify, NotificationType } from "@altair/gooey";
import ConfirmDialog from "../../../UI/ConfirmDialogs/ConfirmDialog";

const Items = (props) => {
  const { orderId } = props
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [deleteItemInfo, setDeleteItemInfo] = useState()
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
      name: "Cost",
      fieldName: "cost",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column3",
      name: "Actions",
      fieldName: "",
      minWidth: 100,
      maxWidth: 150,
    },
  ];


  const getAllOrderItems = async (orderId) => {
    return ContactService.getOrderItems(orderId);
  }

  const { isLoading, data, isError, error,refetch } = useQuery(["get-all-orderItems", orderId], () => getAllOrderItems(orderId), {
    enabled: !!orderId,
    refetchOnWindowFocus: false,
    select: (data) => {
      const res = data.data.outputs !== undefined
        ? data.data.outputs.items.map((items, index) => {
          var content = data.data.__refs[`outputs.items[${index}]`];
          return content;
        })
        : [];
      return res
    },
  })




  const deleteItemHandler = (item) => {
    setDeleteItemInfo(item)
    setisConfirmDialogOpen((prev) => !prev);
  }

  const deleteItem = async (res, item) => {
    if (res) {
      await deleteOrderItem(item.id)
      setisConfirmDialogOpen(false);
    } else {
      setisConfirmDialogOpen(false);
    }
  }

  const deleteCustomerData = (itemId) => {
    return ContactService.deleteOrderItem(orderId, itemId)
  }
  const { mutate: deleteOrderItem } = useMutation((itemId) => deleteCustomerData(itemId), {
    onSuccess: () => {
      refetch()
      notify({
        text: `Item in order deleted successfully`,
        type: NotificationType.SUCCESS,
      });
    },
    onError: () => {
      notify({
        text: `Error deleting item in order`,
        type: NotificationType.ERROR,
      });
    }
  })


  const renderItemColumn = (item, index, column) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
      case "column3":
        return (
          <Fragment>
            <IconButton
              iconProps={{ iconName: "Delete" }}
              aria-label="Delete"
              title="Delete"
              styles={{ rootHovered: { color: "red" } }}
              onClick={() => deleteItemHandler(item)}
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
        <span>No Items</span>
      ) : (
        <DetailsList items={data} columns={columns} getKey={_getKey} checkboxVisibility={2} onRenderItemColumn={renderItemColumn}
        />
      )}


      {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteItem} data={deleteItemInfo} />
      )}

    </Fragment>
  );
};

export default Items;
