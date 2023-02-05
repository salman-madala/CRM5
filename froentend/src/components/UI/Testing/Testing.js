import * as React from "react";
import { DetailsList, initializeIcons } from "@fluentui/react";
import Paginate from "../Pagination/Paginate";
initializeIcons();

const gridStyles = {
  root: {
    overflowX: "auto",
    selectors: {
      "& [role=grid]": {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "82vh",
      },
    },
  },
  headerWrapper: {
    flex: "0 0 auto",
  },
  contentWrapper: {
    flex: "1 1 auto",
    overflowY: "auto",
    overflowX: "hidden",
  },
};

const onRenderDetailsFooter = () => {
  return <Paginate />;
};

const Testing = (props) => {
  return (
    <DetailsList
      items={props.items}
      columns={props.columns}
      onRenderDetailsFooter={onRenderDetailsFooter}
      styles={gridStyles}
    />
  );
};

export default Testing;
