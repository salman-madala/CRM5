import {
  CommandButton,
  initializeIcons,
  PrimaryButton,
} from "@fluentui/react";
import React from "react";
import { Fragment } from "react";
import SearchBoxInput from "../searchbox/SearchBoxInput";
import classes from "./ToolBar.module.css";

const ToolBar = (props) => {
  const addIcon = { iconName: "Add" };
  initializeIcons();

  
  return (
    <Fragment>
      <CommandButton iconProps={{ iconName: props.iconName }}>
        <span className={classes.title}> {props.title}</span>
      </CommandButton>

      <PrimaryButton
        iconProps={addIcon}
        text={`New ${props.name}`}
        onClick={props.onClick}
      />
      <SearchBoxInput options={props.searchOptions}/>

    </Fragment>
  );
};

export default ToolBar;
