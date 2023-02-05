import React from "react";
import {
  CheckboxVisibility,
  DefaultButton,
  DetailsList,
  Fabric,
  IconButton,
  MarqueeSelection,
  SelectionMode,
  ShimmeredDetailsList,
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
  contentWrapper: {
    flex: "1 1 auto",
    overflowY: "auto",
    overflowX: "auto",
    borderBottom: "1px solid rgb(210, 213, 215)",
  },
};

const DataTable1 = (props) => {
  const moreIcon = { iconName: "More" };


  const onRenderItem = (props) =>{
    console.log("table ended",props)
  }

  const shimmeredDetailsListProps = {
    renderedWindowsAhead: 0,
    renderedWindowsBehind: 0,
  };


  function _onDelayedLoadNextPage() {
    console.log('onDelayedLoadNextPage getting called')
 }


  //-----footer------
  const onRenderDetailsFooter = () => {
    return (
      <Paginate
        items={props.items}
        itemsCount={props.totalItemsCount}
        nextPage={props.nextPage}
        prevPage={props.prevPage}
      />
    );
  };

  const renderItemColumn = (item, index, column) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
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
          </Fragment>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  };

  const _getKey = (item, index, number) => {
    return item.id;
  };


  const _onRenderCustomPlaceholder = (index,defaultRender) => {
    console.log(index,defaultRender);
    // custom logic execution
    console.log("render");
  }


  return (
    <Fragment>
      {props.items?.length !== 0 && (
        // <DetailsList
        //   items={props.items}
        //   columns={props.columns}
        //   onRenderItemColumn={renderItemColumn}
        //   getKey={_getKey}
        //   checkboxVisibility={CheckboxVisibility.hidden}
        //   // onRenderDetailsFooter={onRenderDetailsFooter}
        //   styles={gridStyles}
        //   onRenderMissingItem={() => alert("table ended")}
        //   layoutMode={DetailsListLayoutMode.justified}

        //   //     layoutMode={DetailsListLayoutMode.fixedColumns}
        //   // constrainMode={ConstrainMode.unconstrained}
        //   // // onRenderDetailsHeader={onRenderDetailsHeader}
        //   // selectionPreservedOnEmptyClick
        // />

        // ----------now--------
            <ShimmeredDetailsList
              setKey="items"
              items={props.items || []}
              columns={props.columns}
              enableShimmer={!props.items}
              compact={true}
              selection={SelectionMode.none}
              onRenderItemColumn={renderItemColumn}
              getKey={_getKey}
              checkboxVisibility={CheckboxVisibility.hidden}
              styles={gridStyles}
              onRenderMissingItem={()=>console.log("on render missiong item ")}
              listProps={shimmeredDetailsListProps}
              onRenderCustomPlaceholder={_onRenderCustomPlaceholder}
            />


          //   <DetailsList 
          //   items={ props.items } 
          //   columns={ props.columns }          
          //   selection={ SelectionMode.none }
          //   onRenderMissingItem={ () => _onDelayedLoadNextPage() }
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
export default React.memo(DataTable1);
