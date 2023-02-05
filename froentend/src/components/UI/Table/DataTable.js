import React from "react";
import {
  Announced,
  CheckboxVisibility,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  IconButton,
  Label,
  Link,
} from "@fluentui/react";
import classes from "./DataTable.module.css";
import { Fragment } from "react";
import Paginate from "../Pagination/Paginate";

const gridStyles = {
  root: {
    overflowY: "auto",
    selectors: {
      "& [role=grid]": {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "82vh",
      },
    },
  },
  // headerWrapper: {
  //   flex: "0 0 auto",
  // },
  contentWrapper: {
    flex: "1 1 auto",
    overflowY: "auto",
    overflowX: "auto",
    borderBottom: "1px solid rgb(210, 213, 215)",
  },
};

const DataTable = (props) => {
  const moreIcon = { iconName: "More" };

  //-----footer------
  const onRenderDetailsFooter = () => {
    return <Paginate items={props.items} itemsCount={props.totalItemsCount} nextPage={props.nextPage} prevPage={props.prevPage} />;
  };

  const renderItemColumn = (item, index, column) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
      case "name":
        return (
          <span onClick={() => props.detailsPage(item)}>{item.name}</span>
        );
      case "column4":
        return (
          <Fragment>
            {!item.isItems ? (
              <DefaultButton
                text="No"
                style={{ borderColor: "red", color: "red" }}
              />
            ) : (
              <DefaultButton
                text="Yes"
                style={{ borderColor: "green", color: "green" }}
              />
            )}
          </Fragment>
        );
      case "action":
        return (
          <Fragment>
            <IconButton
              menuProps={{
                items: [
                  {
                    key: "edit",
                    text: "Edit",
                    iconProps: { iconName: "Edit" },
                    onClick: () => props.onEdit(item),
                  },
                  {
                    key: "delete",
                    text: "Delete",
                    iconProps: { iconName: "Delete" },
                    onClick: () => props.onDelete(item),
                  },
                  {
                    key: "info",
                    text: "Info",
                    iconProps: { iconName: "Info" },
                    onClick: () => props.onDetails(item),
                  },
                ],
              }}
              iconProps={moreIcon}
              disabled={false}
              data={item}
              onRenderMenuIcon={() => <div />}
            />

            {/* <IconButton
              iconProps={{ iconName: "Edit" }}
              aria-label="Edit"
              title="Edit"
              styles={{ rootHovered: { color: "blue" } }}
              onClick={() => props.onEdit(item)}
            />

            <IconButton
              iconProps={{ iconName: "Delete" }}
              aria-label="Delete"
              title="Delete"
              styles={{ rootHovered: { color: "red" } }}
              onClick={() => props.onDelete(item)}
            />
            <IconButton
              iconProps={{ iconName: "Info" }}
              aria-label="Info"
              title="Info"
              styles={{ rootHovered: { color: "green" } }}
              onClick={() => props.onDetails(item)}
            /> */}

            {/* <FontIcon
              aria-label="Delete"
              title="Delete"
              iconName="Delete"
              style={{ fontSize: "17px", color: "red" }}
              onClick={() => props.onDelete(item)}
            />
            <FontIcon
              aria-label="Info"
              title="Info"
              iconName="Info"
              style={{ fontSize: "17px", color: "green" }}
              onClick={() => props.onDetails(item)}
            /> */}
          </Fragment>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  };

  const _getKey = (item, index, number) => {
    return item.id;
  };

const itemInvocked = (val) =>{
  console.log(val);
}

  return (
    <Fragment>
      {props.items?.length !== 0 && (
        <DetailsList
          items={props.items}
          columns={props.columns}
          onRenderItemColumn={renderItemColumn}
          getKey={_getKey}
          checkboxVisibility={CheckboxVisibility.hidden}
          onRenderDetailsFooter={onRenderDetailsFooter}
          styles={gridStyles}
          onRenderMissingItem={() => alert("table ended")}
          layoutMode={DetailsListLayoutMode.justified}

          //     layoutMode={DetailsListLayoutMode.fixedColumns}
          // constrainMode={ConstrainMode.unconstrained}
          // // onRenderDetailsHeader={onRenderDetailsHeader}
          // selectionPreservedOnEmptyClick
        />

        // <ShimmeredDetailsList
        //   setKey="items"
        //   items={props.items}
        //   columns={props.columns}
        //   selectionMode={SelectionMode.none}
        //   onRenderItemColumn={renderItemColumn}
        //   enableShimmer={false}
        //   // listProps={shimmeredDetailsListProps}
        //   styles={gridStyles}
        //   onRenderMissingItem={console.log("onRenderMissingItem")}
        // />
      )}

      {props.items.length === 0 && (
        <Fragment>
          <DetailsList
            items={props.items}
            columns={props.columns}
            onRenderItemColumn={renderItemColumn}
            getKey={_getKey}
            checkboxVisibility={2}
          />
          <span className={classes.noData}>No Data </span>
        </Fragment>
      )}
    </Fragment>
  );
};
export default React.memo(DataTable);
