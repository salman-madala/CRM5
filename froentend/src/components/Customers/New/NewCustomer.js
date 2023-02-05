import {
  FontWeights,
  getTheme,
  IconButton,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import classes from "./NewCustomer.module.css";

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

const NewCustomer = (props) => {
  const [state, setState] = useState(props.item);
  const [id, setId] = useState(props.item.id);

  const { name, email  } = state;


  const submitHandler = async (event) => {
    event.preventDefault();
    if (id === undefined) {
      {
         console.log(state);
         props.onCreate(state);
      }
    } else { 
      {
        props.onUpdate(state);
      }
    }
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const imageHandler = (e) =>{
    const file = e.target.files[0];
    props.setImageVal(file)
    // props.imageVal = file
    // setState((prev)=>{
    //   return {
    //     ...state,
    //     [e.target.value]:file
    //   }
    // })
  }

  const cancelIcon = { iconName: "Cancel" };

  return (
    <Fragment>
      <Modal
        isOpen={props.isModalOpen}
        onDismiss={props.onHideModel}
        isBlocking={true}
        className={classes.model}
        overlay="true"
      >
        <div className={contentStyles.header}>
          {props.item.name === "" && props.item.email === "" ? (
            <span>New Customer</span>
          ) : (
            <span>Edit Customer</span>
          )}
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={props.onHideModel}
            title="Close"
          />
        </div>
        <div className={contentStyles.body}>
          <form onSubmit={submitHandler}>
            <TextField
              label="Name"
              name="name"
              required
              autoComplete="false"
              value={name}
              autoFocus={true}
              onChange={changeHandler}
            />
            <TextField
              label="Email"
              name="email"
              required
              value={email}
              onChange={changeHandler}
            />
            <br />

            { id === undefined && <input  type="file" onChange={imageHandler}  accept=".jpg, .jpeg, .png" />}

            <div className={classes.submit}>
              <PrimaryButton text="Submit" type="submit" />
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};
export default React.memo(NewCustomer);
