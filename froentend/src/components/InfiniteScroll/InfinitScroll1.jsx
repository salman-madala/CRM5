import { CheckboxVisibility, DetailsList, ShimmeredDetailsList, Spinner } from "@fluentui/react";
import React, { Component } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import ContactService from "../../services/contactService";

let STATE = {
  rows: [],
  isLoading: false,
};

let PAGINATION = {
  hidden: false,
  sortBy: "system.createdTime",
  sortDir: "DESC",
  limit: 50,
  offset: 0,
};

const columns = [
  {
    key: "column1",
    name: "Name",
    fieldName: "name",
    minWidth: 150,
    maxWidth: 150,
  },
  {
    key: "column2",
    name: "email",
    fieldName: "email",
    minWidth: 150,
    maxWidth: 150,
  },
  { key: "action", name: "Actions", minWidth: 300, maxWidth: 450 },
];

const gridStyles = {
  root: {
    overflowY: "auto",
    selectors: {
      "& [role=grid]": {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "82vh",
      },
    },
  },
  contentWrapper: {
    flex: "1 1 auto",
    overflowY: "auto",
    overflowX: "auto",
    borderBottom: "1px solid rgb(210, 213, 215)",
  },
};


const InfinitScroll1 = () => {
  const [state, setState] = useState(STATE);
  const [pagination, setPagination] = useState(PAGINATION);
  const [searchVal, setSearchVal] = useState("");
  

  useEffect(() => {
    mutate({ searchVal: searchVal, paginiation: pagination });
  }, []);

  const _onDelayedLoadNextPage = () => {
    if (!state.isLoading) {
      console.log("onDelayedLoadNextPage getting called");
      setState({ isLoading: true });
      loadMoreCustomers();
    }
  };

  const loadMoreCustomers = () => {
    setPagination(pagination.offset=+pagination.limit);
    let obj = {
      searchVal: searchVal,
      paginiation: pagination,
    };
    console.log(obj);
    mutate(obj);
  };

  const getAllCustomers = async (pag) => {
    console.log(pag);
    return ContactService.getFilterCustomers(pag.searchVal, pag.paginiation);
  };

  const { mutate } = useMutation((obj) => getAllCustomers(obj), {
    onSuccess: (data) => {
      let res =
        data.data.outputs !== undefined
          ? data.data.outputs.customers.map((cus, index) => {
              var content = data.data.__refs[`outputs.customers[${index}]`];
              return content;
            })
          : [];
      // let items = [...state.rows,res]

      if (state.rows) {
        res = state.rows.slice(0, state.rows.length - 1).concat(res);
      }

      console.log(res);

      if (data.data.outputs.totalCustomersCount > res.length) res.push(null);
      console.log("items", res);
      setState({
        rows: res,
        isLoading: false,
      });
    },
  });


  return (
    <Fragment>
      <DetailsList
        items={state.rows || []}
        columns={columns}
        onRenderMissingItem={() => _onDelayedLoadNextPage()}
        styles={gridStyles}
        checkboxVisibility={CheckboxVisibility.hidden}
      />
      { state.rows?.slice(-1)[0] === null ? <span>{state.rows?.length -1 }</span> : <span>{state.rows?.length}</span> }
      {state.isLoading && (
        <Spinner className="loadingSpinner" label="Loading..." />
      )}
    </Fragment>
  );
};

export default InfinitScroll1;
