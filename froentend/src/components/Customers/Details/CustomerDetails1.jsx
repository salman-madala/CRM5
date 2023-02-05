import {
  Icon,
  initializeIcons,
  Label,
  Pivot,
  PivotItem,
  PrimaryButton,
} from "@fluentui/react";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Basic from "./Basic/Basic";
import CustomerFiles from "./Files/CustomerFiles";
import Order from "./Orders/Order";

const CustomerDetails1 = () => {
  const [state,setState]= useState(0)

  initializeIcons();
  let history = useHistory(); 


  const location = useLocation();
  const customer = location.state?.customer;
  const labelStyles = {
    root: { marginTop: 10 },
  };
  return (
    <Fragment>
      <PrimaryButton onClick={() => history.goBack()}>
        <Icon iconName="Back"></Icon>
      </PrimaryButton>
      <Pivot>
        <PivotItem
          headerText="Basic"
          headerButtonProps={{
            "data-order": 1,
          }}
        >
          <Label styles={labelStyles}>
            <Basic data={customer} />
          </Label>
        </PivotItem>
        <PivotItem headerText="Orders">
          <Label styles={labelStyles}>
            <Order data={customer}></Order>
          </Label>
        </PivotItem>
        <PivotItem headerText="Files" itemCount={state}>
          <Label styles={labelStyles}>
            <CustomerFiles data={customer} count={(e)=>setState(e)}></CustomerFiles>
          </Label>
        </PivotItem>
      </Pivot>
    </Fragment>
  );
};

export default CustomerDetails1;
