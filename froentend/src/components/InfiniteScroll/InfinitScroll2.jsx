import {
  MarqueeSelection,
  DetailsList,
  Spinner,
  CheckboxVisibility,
  DetailsListLayoutMode,
  Shimmer,
} from "@fluentui/react";
import React, { Component } from "react";
import ContactService from "../../services/contactService";
import LoadingShimmer from "../UI/Loading/LoadingShimmer";

const columns1 = [
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
    // overflowY: "auto",
    selectors: {
      "& [role=grid]": {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "85vh",
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


export class InfinitScroll2 extends Component {
  constructor() {
    super();

    this.state = {
      rows: null,
      isLoading: false,
      isEnableShimmer: false,
      pagination: {
        hidden: false,
        sortBy: "system.createdTime",
        sortDir: "DESC",
        limit: 50,
        offset: 0,
      },
    };
    this._onReloadClick = this._onReloadClick.bind(this);
  }

  componentDidMount() {
    this._onReloadClick();
  }

  _onReloadClick() {
    this.setState({ rows: null, nextPageToken: null });

    this._onLoadNextPage();
  }

  _onDelayedLoadNextPage() {
    console.log("onDelayedLoadNextPage getting called");
    let { isLoading } = this.state;

    if (!isLoading) {
      this.setState({ isLoading: true, isEnableShimmer: true });
      let next = this.state.pagination.offset + this.state.pagination.limit;
      this.setState({ pagination: { ...this.state.pagination, offset: next } });
      console.log("state is", this.state);
      setTimeout(() => this._onLoadNextPage(), 5000);
    }
  }

  _onLoadNextPage() {
    let searchValue = "";

    ContactService.getFilterCustomers(searchValue, this.state.pagination).then(
      (json) => {
        let rows = this._getRowsFromData(json.data);
        this.setState({
          rows,
          isLoading: false,
          isEnableShimmer: false,
        });
      }
    );
  }

  _getRowsFromData(response) {
    let { rows } = this.state;

    let items = response.outputs.customers.map((child, index) => {
      var content = response.__refs[`outputs.customers[${index}]`];
      return content;
    });

    if (rows) {
      items = rows.slice(0, rows.length - 1).concat(items);
    }

    if (response.outputs.totalCustomersCount > items.length) {
      items.push(null);
    }

    return items;
  }

  render() {
    let { rows, isLoading } = this.state;

    return (
      <MarqueeSelection>
        <DetailsList
          items={rows || []}
          columns={columns1}
          styles={gridStyles}
          layoutMode={DetailsListLayoutMode.justified}
          checkboxVisibility={CheckboxVisibility.hidden}
          onRenderMissingItem={() => this._onDelayedLoadNextPage()}
        >
        </DetailsList>
        {/* {isLoading && <LoadingShimmer />} */}
        {isLoading && <Spinner className="loadingSpinner" label="Loading..." />}

      </MarqueeSelection>
    );
  }
}
