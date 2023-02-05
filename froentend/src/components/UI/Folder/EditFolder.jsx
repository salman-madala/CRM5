import * as React from "react";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  TextField,
  Checkbox,
} from "@fluentui/react";
import { IconButton, PrimaryButton } from "@fluentui/react/lib/Button";
import classes from "./EditFolder.module.css";
import { useState } from "react";
import ContactService from "../../../services/contactService";
import { useMutation } from "react-query";
import { notify, NotificationType } from "@altair/gooey";
import { useCallback } from "react";

const cancelIcon = { iconName: "Cancel" };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
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
  heading: {
    color: theme.palette.neutralPrimary,
    fontWeight: FontWeights.semibold,
    fontSize: "inherit",
    margin: "0",
  },
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

const EditFolder = (props) => {
  const editValues = {
    id: props.data.id,
    description: props.data.description,
    islock: props.data.islock,
  };

  const [state, setState] = useState(editValues);

  // const updateHandler = async () => {
  //   const status = await ContactService.updateFile(state);
  // };

  const updateHandler = () => {
    return ContactService.updateFile(state);
  };

  const { mutate: update } = useMutation(() => updateHandler(), {
    onSuccess: (data) => {
      props.refetch();
      props.onDismiss();
      setTimeout(() => {
        notify({
          text: `file update successfully`,
          type: NotificationType.SUCCESS,
        });
      }, 800);
    },
    onError: () => {
      notify({
        text: `Error updating file`,
        type: NotificationType.ERROR,
      });
    },
  });

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const onChange = (e)=>{
    let { name, checked } = e.target;
    setState({ ...state, [name]: checked });
  }

  return (
    <div>
      <Modal isOpen={true} onDismiss={props.onDismiss}>
        <div className={contentStyles.header}>
          <h2 className={contentStyles.heading}>Edit File</h2>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={props.onDismiss}
          />
        </div>
        <div className={contentStyles.body}>
          <TextField
            label="Name"
            readOnly
            defaultValue={props.data.fileContent.name}
          />

          <TextField
            label="Description"
            value={state.description}
            name="description"
            onChange={changeHandler}
          />
          <br />
          <Checkbox
            label="IsLocked : "
            checked={state.islock}
            name="islock"
            onChange={onChange}
            boxSide="end"
          />
 
          <div className={classes.submit}>
            <PrimaryButton text="Submit" type="submit" onClick={update} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditFolder;
