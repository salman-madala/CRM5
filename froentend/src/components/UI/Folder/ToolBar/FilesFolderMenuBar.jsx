import {
  ContextualMenu,
  FontIcon,
  IconButton,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useCallback, useRef, useState } from "react";
import { Fragment } from "react";
import classes from "./FilesFolderMenuBar.module.css";

const folderDetails = {
  name: "",
  description: "",
};

const FilesFolderMenuBar = () => {
  const linkRef = useRef();
  const [showContextualMenu, setShowContextualMenu] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateFile, setShowCreateFile] = useState(false);
  const onShowContextualMenu = React.useCallback((ev) => {
    ev.preventDefault();
    setShowContextualMenu(true);
  }, []);

  const [newFolder, setNewFolder] = useState(folderDetails);

  const onHideContextualMenu = useCallback(
    () => setShowContextualMenu(false),
    []
  );

  const menuItems = [
    {
      key: "folder",
      text: "Folder",
      onClick: async () => {
        await setNewFolder(folderDetails)
        setShowCreateFolder(true);
      },
    },
    {
      key: "file",
      text: "File",
      onClick: () => console.log("Rename clicked"),
    },
  ];

  const createFolder = () => {};
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewFolder({ ...newFolder, [name]: value });
    // console.log(newFolder);
  };

  return (
    <Fragment>
      <a ref={linkRef} onClick={onShowContextualMenu} href="#">
        <IconButton iconProps={{ iconName: "Add" }} />
      </a>

      <ContextualMenu
        items={menuItems}
        hidden={!showContextualMenu}
        target={linkRef}
        onItemClick={onHideContextualMenu}
        onDismiss={onHideContextualMenu}
      />

      {showCreateFolder && (
        <Modal
          isOpen={showCreateFolder}
          onDismiss={() => setShowCreateFolder((prev) => !prev)}
          isBlocking={true}
          className={classes.model}
          overlay="true"
        >
          <FontIcon
            aria-label="Close"
            title="close"
            iconName="Cancel"
            style={{ fontSize: "17px", float: "right" }}
            onClick={() => setShowCreateFolder((prev) => !prev)}
          />
          <div className={classes.header}>
            {newFolder.name === "" && newFolder.description === "" ? (
              <span>New Folder</span>
            ) : (
              <span>Edit Folder</span>
            )}
          </div>
          <form onSubmit={createFolder}>
            <div className={classes.body}>
              <TextField
                label="Name"
                name="name"
                required
                autoComplete="false"
                value={newFolder.name}
                autoFocus={true}
                onChange={changeHandler}
              />
              <TextField
                label="Description"
                name="description"
                required
                value={newFolder.description}
                onChange={changeHandler}
              />

              <div className={classes.submit}>
                <PrimaryButton text="Submit" type="submit" />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </Fragment>
  );
};

export default FilesFolderMenuBar;
