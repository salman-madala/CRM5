import React from "react";
import {
  Nav,
  initializeIcons,
  mergeStyleSets,
  getTheme,
} from "@fluentui/react";
import { useState } from "react";

const theme = getTheme();
const contentStyles = mergeStyleSets({
  root: {
    selectors: {
      '.is-selected': {
        borderLeft: `4px solid ${theme.palette.themePrimary}`,
      },
      '.ms-Nav-link': { backgroundColor: '#fff' }
    }
  },
});

const NavigationSidePanel = () => {
  const [selectedKey, setSelectedKey] = useState(localStorage.getItem("selectedKey"));
  initializeIcons();

  const navLinkGroups = [
    {
      name: "CRM",
      links: [
        {
          name: "Customers",
          url: "http://localhost:3000/crm/app/#/allCustomers",
          key: "key1",
          target: "",
          title: "",
          icon: "User",
          //style:{is-selected:{borderLeft:`4px solid ${theme.palette.themePrimary}`}}
        },
        {
          name: "Items",
          url: "http://localhost:3000/crm/app/#/allItems",
          key: "key2",
          target: "",
          title: "",
          icon: "Settings",
          //style:{borderLeft:`4px solid ${theme.palette.themePrimary}`}
        },
        {
          name: "Orders",
          url: "http://localhost:3000/crm/app/#/allOrders",
          key: "key3",
          target: "",
          title: "",
          icon: "Settings",
          className: { linkText: { color: "red" } },
          // style:{borderLeft:`4px solid ${theme.palette.themePrimary}`}
        },
        // {
        //   name: "Files",
        //   url: "http://localhost:3000/crm/app/#/uploadFile",
        //   key: "key4",
        //   title: "Files",
        //   icon: "FileCSS",
        //   className: { linkText: { color: "red" } },
        // },
        // {
        //   name: "WorkFlow",
        //   url: "http://localhost:3000/crm/app/#/workflow",
        //   key: "key4",
        //   title: "Workflow",
        //   icon: "WorkFlow",
        //   className: { linkText: { color: "red" } },
        // },
        {
          name: "Infinit Scroll",
          url: "http://localhost:3000/crm/app/#/testing",
          key: "key4",
          title: "testing infinite Scroll",
          icon: "WorkFlow",
          className: { linkText: { color: "red" } },
        },
      ],
    },
  ];

  const _onRenderGroupHeader = () => {
    return navLinkGroups.map((group) => <h3>{group.name}</h3>);
  };

  const selectedItem = (e, item) => {
    localStorage.setItem("selectedKey", item.key);
    setSelectedKey(item.key);

  };

  const _getKey = (item, index, number) => {
    return navLinkGroups.map((group) => group.key);
  };

  return (
    <Nav
      onRenderGroupHeader={_onRenderGroupHeader}
      groups={navLinkGroups}
      selectedKey={selectedKey}
      onLinkClick={selectedItem}
      key={() => _getKey}
      styles={contentStyles}
    />
  );
};

export default NavigationSidePanel;
