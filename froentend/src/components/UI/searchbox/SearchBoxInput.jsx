import { SearchBox } from "@fluentui/react";
import React from "react";

const searchBoxStyles = { root: { width: 200 } };

const SearchBoxInput = (props) => {
  // const search = (newValue) => {
  //   console.log("SearchBox onSearch fired: " + newValue);
  // };

  const changeHandler = (_, newValue) => {
    if(newValue !== " "){
      props.options.search(newValue)
    }
  };

  const clearHandler = (e) => {
    console.log("Custom onClear Called");
  };

  return (
    <span
      style={{ float: "right", marginTop: "10px", marginRight: "15px" }}
    >
      <SearchBox
        styles={searchBoxStyles}
        placeholder="Search"
        onClear={clearHandler}
        onChange={changeHandler}
        // onSearch={search}
      />
    </span>
  );
}

export default SearchBoxInput;
