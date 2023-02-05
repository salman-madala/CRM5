import { Label } from "@fluentui/react";
import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import ContactService from "../../../../services/contactService";
import classes from "./Basic.module.css";
const Basic = (props) => {

  const orderId = props.data.id
  const getOrderId = async () => {
    return ContactService.getOrder(orderId);
  }

  const { isLoading, data, isError, error, refetch } = useQuery(["get-Order-ById", orderId], () => getOrderId(orderId), {
    enabled: !!orderId,
    refetchOnWindowFocus: false,
    select: (data) => {
     let content = data.data.__refs[`outputs.obj.order`];
     content.customer = data.data.__refs[`outputs.obj.customer`]
      return content
    },
  })


  return (
    <Fragment>
      {!isLoading ?
        <div className={classes.basic}>
          <Label>Name : {data?.name}</Label>
          <Label>Contact : {data?.contact}</Label>
          <Label>Address : {data?.address}</Label>
          <br></br>
          <h3>customer details</h3>
          <Label>Name : {data?.customer?.name}</Label>
          <Label>email : {data?.customer?.email}</Label>
        </div>
        : <div>Loading....</div>}
    </Fragment>
  );
};

export default Basic;
