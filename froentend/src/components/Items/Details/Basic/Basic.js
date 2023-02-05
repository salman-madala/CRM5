import { Label } from "@fluentui/react";
import React from "react";
import classes from "./Basic.module.css";
const Basic = (props) => {
  return (
    <div className={classes.basic}>
      <Label>Name : {props.data.name}</Label>
      <Label>Cost : {props.data.cost}</Label>

    </div>
  );
};

export default Basic;
