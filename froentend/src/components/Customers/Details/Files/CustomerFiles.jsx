import React from "react";
import FileDirective from "../../../UI/File/FileDirective";

const CustomerFiles = (props) => {
  let customerRef = {
    id: props.data.id,
    contentType: props.data.system.contentType,
  };

//  const ref =  useMemo(() => customerRef, [customerRef])

  return <FileDirective typeRef={customerRef} count={props.count} />;
};

export default CustomerFiles;
