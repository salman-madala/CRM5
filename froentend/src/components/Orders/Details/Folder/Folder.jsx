import React from "react";
import FolderDirective from "../../../UI/Folder/FolderDirective";

const Folder = (props) => {
  let customerRef = {
    id: props?.orderId?.id,
    contentType: props?.orderId?.system?.contentType,
  };
  const count = () => {};
  return <FolderDirective typeRef={customerRef} count={count} />;
};

export default Folder;
