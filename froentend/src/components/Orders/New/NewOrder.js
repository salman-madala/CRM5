import {
  Dropdown,
  FontWeights,
  getTheme,
  IconButton,
  mergeStyleSets,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import ContactService from "../../../services/contactService";
import classes from "./NewOrder.module.css";
import { notify, NotificationType } from "@altair/gooey";

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

const NewOrder = (props) => {
  const [state, setState] = useState(props.item);
  const [id, setId] = useState(props.item.id);
  const [allItems, setAllItems] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  //console.log(state);

  const [selectedKeys, setSelectedKeys] = useState([]);

  const { name, contact, address, items, customerRef } = state;

  const [defaultSelectItems, setDefaultSelectItems] = useState([]);

  useEffect(() => {
    getAllItems();
    getAllCustomers();
    defaultSelectedItems();
  }, []);

  const defaultSelectedItems = () => {
    let defaultSelectItems = [];
    if (items !== "undefined" && items?.length > 0) {
      //  allItems.map((item)=>{
      //   defaultSelectItems.push( items.find((it) => it.id === item.id))
      // })
      items.map((item) => {
        defaultSelectItems.push(item.id);
        selectedKeys.push(item.id)
      });
    }
    // console.log("defaultSelectItems", defaultSelectItems);
    setDefaultSelectItems(defaultSelectItems);
    // console.log("defaultSelectItems",defaultSelectItems);

    // return defaultSelectItems
  };

  const getAllItems = async () => {
    const response = await ContactService.getAllItems();
    if (response.status === 200) {
      const res =
        response.data.outputs !== undefined
          ? response.data.outputs.items.map((students, index) => {
            var content = response.data.__refs[`outputs.items[${index}]`];
            const allItems = {
              key: content.id,
              text: content.name + " -- " + content.cost,
              value: content,
              title: content.name + " -- " + content.cost,
              data: { icon: "Settings" },
            };
            return allItems;
          })
          : [];
      // console.log("res", res);
      setAllItems(res);
    } else {
      notify({ text: `Error get all contacts`, type: NotificationType.ERROR });
    }
  };

  const getAllCustomers = async () => {
    const response = await ContactService.getAllCustomers();
    if (response.status === 200) {
      const res = response.data.outputs !== undefined ? response.data.outputs.customers.map((order, index) => {
        var content = response.data.__refs[`outputs.customers[${index}]`];
        const allCustomers = {
          key: content.id,
          text: content.name,
          value: content,
          title: content.name,
          data: { icon: "Settings" },
        };
        return allCustomers;
      })
        : [];
      //  console.log("customers",res)
      setAllCustomers(res);
    } else {
      notify({ text: `Error get all contacts`, type: NotificationType.ERROR });
    }
  };



  const submitHandler = async (event) => {
    // console.log(allItems);
    // const itemss = selectedKeys.map(key=>{
    //   return allItems.find(obj => obj.key == key).value
    // })
    // console.log(itemss);
    // items= itemss;

    //setState({...state,[state.items]:itemss})

    event.preventDefault();
    if (id === undefined) {
      {
        // console.log("create",state);
        props.onCreate(state);
      }
    } else {
      {
        props.onUpdate(state);
      }
    }
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    // console.log("state",state);
  };

  const selecteCustomer = (e, selectedOption) => {
    setState({ ...state, customerRef: selectedOption.value })
  }

  const dropdownStyles = {
    dropdown: { width: 300 },
    dropdownOptionText: { overflow: "unset" },
  };

  const changeHandler1 = (e, item) => {
    if (item) {
      setSelectedKeys(
        item.selected
          ? [...selectedKeys, item.key]
          : selectedKeys.filter((key) => key !== item.key)
      );
    }
    // console.log("selectedKeys",selectedKeys);
  };

  const setItemsInStateItems = () => {
    const selectedItems = selectedKeys.map((key) => {
      return allItems.find((obj) => obj.key === key).value;
    });
    //console.log(selectedItems);
    state.items = selectedItems;
    console.log("state", state);
  };

  // const onChange = (event, item) => {
  //   setSelectedItem(item);
  // };


  return (
    <Fragment>
      <Modal
        isOpen={props.isModalOpen}
        onDismiss={props.onHideModel}
        isBlocking={true}
        className={classes.model}
        overlay="true"
      >
        {/* <IconButton
              iconProps={{ iconName: "Cancel" }}
              ariaLabel="Close popup modal"
              onClick={props.onHideModel}
            /> */}
        {/* <FontIcon
          aria-label="Close"
          title="close"
          iconName="Cancel"
          style={{ fontSize: "17px", float: "right" }}
          onClick={props.onHideModel}
        />
        <div className={classes.header}>
          {props.item.name === "" && props.item.contact === "" ? (
            <span>New Order</span>
          ) : (
            <span>Edit Order</span>
          )}
        </div>
        <form onSubmit={submitHandler}>
          <div className={classes.body}>
            <TextField
              label="Name"
              name="name"
              required
              autoComplete="false"
              value={name}
              onChange={changeHandler}
            />
            <TextField
              label="Contact"
              name="contact"
              required
              value={contact}
              onChange={changeHandler}
            />

            <TextField
              label="Address"
              name="address"
              required
              value={address}
              onChange={changeHandler}
            />

            <Dropdown
              value={items}
              onChange={changeHandler1}
              placeholder="Select options"
              label="Items"
              defaultSelectedKeys=''
              selectedKeys={selectedKeys}
              multiSelect
              options={allItems}
              styles={dropdownStyles}
              dismissMenu={()=> Alert} 
            />

            <div className={classes.submit}>
              <PrimaryButton text="Submit" type="submit" />
            </div>
          </div>
        </form> */}

        <div className={contentStyles.header}>
          {id === undefined ? (
            <span>New Order</span>
          ) : (
            <span>Edit Order</span>
          )}
          <IconButton
            styles={iconButtonStyles}
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close popup modal"
            onClick={props.onHideModel}
            title="Close"
          />
        </div>
        <div className={contentStyles.body}>
          <form onSubmit={submitHandler}>
            <TextField
              label="Name"
              name="name"
              required
              autoComplete="false"
              value={name}
              autoFocus={true}
              onChange={changeHandler}
            />
            <TextField
              label="Contact"
              name="contact"
              required
              value={contact}
              onChange={changeHandler}
            />

            <TextField
              label="Address"
              name="address"
              required
              value={address}
              onChange={changeHandler}
            />

            {id === undefined && <Fragment><Dropdown
              onChange={changeHandler1}
              placeholder="Select Items"
              label="Items"
              defaultSelectedKeys={defaultSelectItems}
              // selectedKeys={selectedKeys}
              multiSelect
              options={allItems}
              styles={dropdownStyles}
              onDismiss={setItemsInStateItems}

            // onFocus={() => console.log('dropdown focus')}
            // onKeyDown={(e) => console.log('keycode ' + e.keyCode + ' clicked')}
            />

              <Dropdown
                onChange={selecteCustomer}
                placeholder="Select Customer"
                label="Customer"
                defaultSelectedKey={customerRef?.id}
                value={customerRef}
                options={allCustomers}
                styles={dropdownStyles}
              />
            </Fragment>
            }

            <div className={classes.submit}>
              <PrimaryButton text="Submit" type="submit" />
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};
export default NewOrder;
