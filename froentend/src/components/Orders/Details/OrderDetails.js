import React from "react";
import { Label, Panel, Pivot, PivotItem } from "@fluentui/react";
import { Fragment } from "react";
import Basic from "./Basic/Basic";
import Items from "./Items/Items";
import OrderFiles from "./Files/OrderFiles";
import Folder from "./Folder/Folder";


const OrderDetails = (props) => {

  const labelStyles = {
    root: { marginTop: 10 },
  };

  return (
    <Fragment>
    <div >
      <Panel type="smallFixedFar"
        headerText={`${props.item.name} Details`}
        isOpen={props.isDetailsView}
        onDismiss={props.closeDetailsPanel}
        isBlocking={false}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        styles={{
          main: {
            boxShadow: "none,",
            borderLeft: "1px solid rgb(210, 213, 215)",
            marginTop: "33px",
            marginBottom: "60px",
            maxHeight: "calc(100vh - 90px)",
            width:"800px"
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

          <PivotItem headerText="Items">
            <Items styles={labelStyles} orderId={props.item.id} />
          </PivotItem>

          <PivotItem headerText="Order Files">
            <OrderFiles styles={labelStyles} orderId={props.item.id} />
          </PivotItem>

          <PivotItem headerText="Files and Folder">
            <Folder styles={labelStyles} orderId={props.item} />
          </PivotItem>

        </Pivot>
      </Panel>
    </div>
  </Fragment>  )
}

export default OrderDetails