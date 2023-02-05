import React from "react";
import { Fragment } from "react";
import ContactService from "../../../../services/contactService";
import { useQuery } from "react-query";
import { DetailsList } from "@fluentui/react";

const Customers = (props) => {
  const { id } = props.data

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
      name: "email",
      fieldName: "email",
      minWidth: 150,
      maxWidth: 300,
      isMultiline : true,
    },
  ];


  const getAllItemCustomers = async (id) => {
    return ContactService.getItemCustomers(id);
  }

  const { isLoading, data, isError, error } = useQuery(["get-all-ItemCustomers", id], () => getAllItemCustomers(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
    select: (data) => {
      const res = data.data.outputs !== undefined
        ? data.data.outputs.customers.map((items, index) => {
          var content = data.data.__refs[`outputs.customers[${index}].content`];
          return content;
        })
        : [];
        console.log(res);
      return res
    },
  })


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
        <span>No Customers data</span>
      ) : (
        <DetailsList items={data} columns={columns} getKey={_getKey} checkboxVisibility={2} 
        />
      )}


      {/* {isConfirmDialogOpen && (
        <ConfirmDialog onConfirmationHandler={deleteItem} data={deleteItemInfo} />
      )} */}

    </Fragment>
  );
};

export default Customers;
