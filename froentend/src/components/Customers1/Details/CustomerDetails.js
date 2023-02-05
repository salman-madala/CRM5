import React from "react";
import { Label, Panel, Pivot, PivotItem } from "@fluentui/react";
import classes from "./CustomerDetails.module.css";
import { Fragment } from "react";
import Basic from "./Basic/Basic";


const CustomerDetails = (props) => {

  const labelStyles = {
    root: { marginTop: 10 },
  };

  return (
    <Fragment>
    <div className={classes.sidepanel}>
      <Panel type="smallFixedFar"
        headerText={`${props.item.name}` + " Details"}
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
            maxHeight: "calc(100vh - 90px)",
            width:"480px"
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
          {/* <PivotItem headerText="Timeline">
            <Label styles={labelStyles}>Timeline view</Label>
          </PivotItem> */}
        </Pivot>
      </Panel>
    </div>
  </Fragment>  )
}

export default CustomerDetails