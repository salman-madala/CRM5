import {
  CheckboxVisibility,
  DetailsList,
  Link,
  Spinner,
} from "@fluentui/react";
import { DefaultButton, IconButton } from "@fluentui/react";
import React, { Component } from "react";
import { Fragment } from "react";
import { useQuery } from "react-query";
import ContactService from "../../services/contactService";
import useManageCustomer from "../Customers/hooks/useManageCustomer";

let columns1 = [
  {
    key: "score",
    name: "Score",
    fieldName: "score",
    minWidth: 40,
    maxWidth: 40,
    isResizable: true,
  },
  {
    key: "article",
    name: "Post",
    minWidth: 100,
    maxWidth: 180,
    isResizable: true,
    onRender: (item) => (
      <div style={{ whiteSpace: "normal" }}>
        <span className="ms-font-xl">{item.title}</span>
      </div>
    ),
  },
];


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



const refreshButtonStyles = {
  root: {
    verticalAlign: "middle",
  },
};

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
  // headerWrapper: {
  //   flex: "0 0 auto",
  // },
  contentWrapper: {
    flex: "1 1 auto",
    overflowY: "auto",
    overflowX: "auto",
    borderBottom: "1px solid rgb(210, 213, 215)",
  },
};

class InfinitScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.props.items,
      isLoading: false,
      nextPageToken: null,
    };
    // this._onReloadClick = this._onReloadClick.bind(this);
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
      this.setState({ isLoading: true });
      // This setTimeout is only here for illustrating a slow API. Reddit API is pretty fast.
      setTimeout(() => this._onLoadNextPage(), 1000);
    }
  }

  _onLoadNextPage() {
    let { nextPageToken } = this.state;
    let url =
      `https://www.reddit.com/r/` +
      `bostonterriers.json` +
      `${nextPageToken ? "?limit=17&after=" + nextPageToken : ""}`;


    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        let rows = this._getRowsFromData(json.data);
        this.setState({
          rows,
          nextPageToken: json.data.after,
          isLoading: false,
        });
      });

    // let pagination = {
    //   hidden: false,
    //   sortBy: "system.createdTime",
    //   sortDir: "DESC",
    //   limit: 16,
    //   offset: 0,
    // };
    // let searchValue = "";
    // ContactService.getFilterCustomers(searchValue, pagination).then(
    //   (json) => {
    //     // let data = this._getRowsFromData(json.data);
    //     const res = json.data.outputs !== undefined
    //     ? json.data.outputs.customers.map((customer, index) => {
    //       var content = json.data.__refs[`outputs.customers[${index}]`];
    //       return content;
    //     }):[]
    //     console.log(res);
    //     this.setState({rows:res})
    //   }
    // );
  }

  _getRowsFromData(response) {
    let { rows, nextPageToken } = this.state;
    let items = response.children.map((child) => {
      let data = child.data;
      return {
        key: data.id,
        title: data.title,
        score: data.score,
      };
    });
    if (rows && nextPageToken) {
      items = rows.slice(0, rows.length - 1).concat(items);
    }
    if (response.after) {
      items.push(null);
    }
    return items;
  }

  renderItemColumn = (item, index, column) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
      case "column4":
        return (
          <Fragment>
            {!item.isItems ? (
              <DefaultButton
                text="No"
                style={{ borderColor: "red", color: "red" }}
              />
            ) : (
              <DefaultButton
                text="Yes"
                style={{ borderColor: "green", color: "green" }}
              />
            )}
          </Fragment>
        );
      case "action":
        return (
          <Fragment>
            <IconButton
              menuProps={{
                items: [
                  {
                    key: "edit",
                    text: "Edit",
                    iconProps: { iconName: "Edit" },
                    onClick: () => this.props.onEdit(item),
                  },
                  {
                    key: "delete",
                    text: "Delete",
                    iconProps: { iconName: "Delete" },
                    onClick: () => this.props.onDelete(item),
                  },
                  {
                    key: "info",
                    text: "Info",
                    iconProps: { iconName: "Info" },
                    onClick: () => this.props.onDetails(item),
                  },
                ],
              }}
              iconProps={{ iconName: "More" }}
              disabled={false}
              data={item}
              onRenderMenuIcon={() => <div />}
            />
          </Fragment>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  };

  render() {
    let { rows, isLoading } = this.state;

    return (
      <Fragment>
        <DetailsList
          items={rows || []}
          columns={columns1}
          onRenderMissingItem={() => this._onDelayedLoadNextPage()}
          // styles={gridStyles}
          checkboxVisibility={CheckboxVisibility.hidden}
          // onRenderItemColumn={this.renderItemColumn}

          // onRenderRow={(props, defaultRender) => (
          //   <div onClick={() => console.log("clicking: " + props.item.title)}>
          //     {defaultRender(props)}
          //   </div>)}
        />
        {isLoading && <Spinner className="loadingSpinner" label="Loading..." />}
      </Fragment>
    );
  }
}

export default InfinitScroll;
