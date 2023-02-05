import React from "react";
import FileDirective from "../../../UI/File/FileDirective";

const ItemFiles = (props) => {
  let customerRef = {
    id: props.data.id,
    contentType: props.data.system.contentType,
  };

  const deleteHandler = (e) => {
    console.log("deleteHandler", e);
  };

  return <FileDirective typeRef={customerRef} count={props.count} />;
};

export default ItemFiles;
