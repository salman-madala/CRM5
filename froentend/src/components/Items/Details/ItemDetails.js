import React from "react";
import { Label, Panel, Pivot, PivotItem } from "@fluentui/react";
import { Fragment } from "react";
import Basic from "./Basic/Basic";
import ItemOrder from "./Orders/ItemOrder";
import Customers from "./Customers/Customers";
import ItemFiles from "./Files/ItemFiles";
import { useState } from "react";

const ItemDetails = (props) => {
  const [state,setState]= useState(0)

  const labelStyles = {
    root: { marginTop: 10 },
  };

  return (
    <Fragment>
      <Panel type="smallFixedFar"
        headerText={`${props.item.name} Details`}
        isOpen={props.isDetailsView}
        onDismiss={props.closeDetailsPanel}
        isBlocking={false}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        styles={{
          main: {
            // boxShadow: "none,",
            borderLeft: "1px solid rgb(210, 213, 215)",
            boxShadow: "none",
            marginTop: "33px",
            marginBottom: "60px",
            maxHeight: "calc(100vh - 90px)",
            width: "800px",
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
              <Basic data={props.item} />
            </Label>
          </PivotItem>

          <PivotItem headerText="Orders">
            <ItemOrder styles={labelStyles} data={props.item} />
          </PivotItem>
          <PivotItem headerText="Customers">
            <Customers styles={labelStyles} data={props.item} />
          </PivotItem>
          <PivotItem headerText="Files" itemCount={state}>
            <ItemFiles styles={labelStyles} data={props.item} count={(e)=>setState(e)} />
          </PivotItem>
        </Pivot>
      </Panel>
    </Fragment>
  );
};

export default ItemDetails;
