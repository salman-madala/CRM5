import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const DisplayFileSize = (props) => {
  var size = props.size;

  const [sizeValu, setSizeVal] = useState("");

  const sizeConversion = () => {
    if (size < 1024) setSizeVal(size + " B");
    else if (size < 1048576) setSizeVal(Math.floor((size / 1024)) + " KB");
    else if (size < 1073741824) setSizeVal((size / 1048576).toFixed(2) + " MB");
    else setSizeVal((size / 1073741824).toFixed(3) + " GB");
  };

  useEffect(() => {
    sizeConversion()
  }, [])
  

  return <div>{sizeValu}</div>;
};

export default DisplayFileSize;
