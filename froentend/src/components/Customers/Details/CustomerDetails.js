import React from "react";
import { Label, Panel, Pivot, PivotItem } from "@fluentui/react";
import classes from "./CustomerDetails.module.css";
import { Fragment } from "react";
import Basic from "./Basic/Basic";
import Order from "./Orders/Order";
import CustomerFiles from "./Files/CustomerFiles";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import FileDirective from "../../UI/File/FileDirective";
import useManageFiles from "../../UI/File/hooks/useManageFile";
import { useEffect } from "react";


const CustomerDetails = (props) => {
const [state,setState]= useState(0)
  const labelStyles = {
    root: { marginTop: 10 },
  };

  

  const customer = useMemo(() => props.customer, [props.customer])

  let customerRef = {
    id: customer.id,
    contentType: customer.system.contentType,
  };

  const { _addFiles, _getAllFiles } = useManageFiles()

  useEffect(()=>{
    countData();
  })

  const countData = async () => {
    const res = await _getAllFiles(customerRef)
    setState(res.count)
  }
  

  return (
    <Fragment>
      <Panel type="smallFixedFar"
        headerText={`${customer.name}` + " Details"}
        isOpen={props.isDetailsView}
        onDismiss={props.closeDetailsPanel}
        isBlocking={false}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        styles={{
          main: {
            boxShadow: "none,",
            borderLeft: "1px solid rgb(210, 213, 215)",
            boxShadow: "none",
            marginTop: "33px",
            marginBottom: "60px",
            // maxHeight: "calc(100vh - 90px)",
            width: "1000px !important",
          },
        }}
      >
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
      </Panel>
    </Fragment>)
}

export default React.memo(CustomerDetails)