import React from "react";

const SelectFile = (props) => {
  
  return (
    <div>
      <input
      type="file"
      onChange={props.onChange}
      style={{ textAlign: "center", marginLeft: "300px",height:"25px"}}
    />
    </div>
  );
};

export default SelectFile;
