import React from "react";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "@fluentui/react";

const ConfirmDialog = (props) => {
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Delete Confirm',
    closeButtonAriaLabel: 'Close',
    subText: `Do you want to delete ${props.data.name} ?`,
  };

  return (
    <Dialog
      hidden={!true}
      onDismiss={true}
      dialogContentProps={dialogContentProps}
    >
      <DialogFooter>
        <PrimaryButton text="Yes" onClick={() => props.onConfirmationHandler(true, props.data)} />
        <DefaultButton text="No" onClick={() => props.onConfirmationHandler(false)} />
      </DialogFooter>
    </Dialog>
  );
};

export default React.memo(ConfirmDialog);
