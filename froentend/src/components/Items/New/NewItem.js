import { FontIcon, Modal, PrimaryButton, TextField } from "@fluentui/react";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import classes from "./NewItem.module.css";


const NewItem = (props) => {
  const [state, setState] = useState(props.item);
  const [id, setId] = useState(props.item.id);


  const { name, cost } = state;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (id === undefined) {
      {props.onCreate(state)}
    } else {
      {props.onUpdate(state)}      
    }
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

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
        <FontIcon
          aria-label="Close"
          title="close"
          iconName="Cancel"
          style={{ fontSize: "17px", float: "right" }}
          onClick={props.onHideModel}
        />
        <div className={classes.header}>
          {props.item.name === "" && props.item.cost === "" ? (
            <span>New Item</span>
          ) : (
            <span>Edit Item</span>
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
              autoFocus={true}
              onChange={changeHandler}
            />
            <TextField
              label="Cost"
              name="cost"
              required
              value={cost}
              onChange={changeHandler}
            />

            <div className={classes.submit}>
              <PrimaryButton text="Submit" type="submit" />
            </div>
          </div>
        </form>
      </Modal>

      {/* <Modal
        isOpen={props.isModalOpen}
        onDismiss={props.onHideModel}
        isBlocking={false}
      >
        <div className={contentStyles.header}>
          <span >Lorem Ipsum</span>
          <IconButton
            className={contentStyles.iconButton}
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close popup modal"
            onClick={props.onHideModel}
          />
        </div>
        <div className={contentStyles.body}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            lorem nulla, malesuada ut sagittis sit amet, vulputate in leo.
            Maecenas vulputate congue sapien eu tincidunt. Etiam eu sem turpis.
            Fusce tempor sagittis nunc, ut interdum ipsum vestibulum non. Proin
            dolor elit, aliquam eget tincidunt non, vestibulum ut turpis. In hac
            habitasse platea dictumst. In a odio eget enim porttitor maximus.
            Aliquam nulla nibh, ullamcorper aliquam placerat eu, viverra et dui.
            Phasellus ex lectus, maximus in mollis ac, luctus vel eros. Vivamus
            ultrices, turpis sed malesuada gravida, eros ipsum venenatis elit,
            et volutpat eros dui et ante. Quisque ultricies mi nec leo ultricies
            mollis. Vivamus egestas volutpat lacinia. Quisque pharetra eleifend
            efficitur.
          </p>
          <p>
            Mauris at nunc eget lectus lobortis facilisis et eget magna.
            Vestibulum venenatis augue sapien, rhoncus faucibus magna semper
            eget. Proin rutrum libero sagittis sapien aliquet auctor.
            Suspendisse tristique a magna at facilisis. Duis rhoncus feugiat
            magna in rutrum. Suspendisse semper, dolor et vestibulum lacinia,
            nunc felis malesuada ex, nec hendrerit justo ex et massa. Quisque
            quis mollis nulla. Nam commodo est ornare, rhoncus odio eu, pharetra
            tellus. Nunc sed velit mi.
          </p>
          <p>
            Sed condimentum ultricies turpis convallis pharetra. Sed sagittis
            quam pharetra luctus porttitor. Cras vel consequat lectus. Sed nec
            fringilla urna, a aliquet libero. Aenean sed nisl purus. Vivamus
            vulputate felis et odio efficitur suscipit. Ut volutpat dictum
            lectus, ac rutrum massa accumsan at. Sed pharetra auctor finibus. In
            augue libero, commodo vitae nisi non, sagittis convallis ante.
            Phasellus malesuada eleifend mollis. Curabitur ultricies leo ac
            metus venenatis elementum.
          </p>
          <p>
            Aenean egestas quam ut erat commodo blandit. Mauris ante nisl,
            pellentesque sed venenatis nec, aliquet sit amet enim. Praesent
            vitae diam non diam aliquet tristique non ut arcu. Pellentesque et
            ultrices eros. Fusce diam metus, mattis eu luctus nec, facilisis vel
            erat. Nam a lacus quis tellus gravida euismod. Nulla sed sem eget
            tortor cursus interdum. Sed vehicula tristique ultricies. Aenean
            libero purus, mollis quis massa quis, eleifend dictum massa. Fusce
            eu sapien sit amet odio lacinia placerat. Mauris varius risus sed
            aliquet cursus. Aenean lectus magna, tincidunt sit amet sodales a,
            volutpat ac leo. Morbi nisl sapien, tincidunt sit amet mauris quis,
            sollicitudin auctor est.
          </p>
          <p>
            Nam id mi justo. Nam vehicula vulputate augue, ac pretium enim
            rutrum ultricies. Sed aliquet accumsan varius. Quisque ac auctor
            ligula. Fusce fringilla, odio et dignissim iaculis, est lacus
            ultrices risus, vitae condimentum enim urna eu nunc. In risus est,
            mattis non suscipit at, mattis ut ante. Maecenas consectetur urna
            vel erat maximus, non molestie massa consequat. Duis a feugiat nibh.
            Sed a hendrerit diam, a mattis est. In augue dolor, faucibus vel
            metus at, convallis rhoncus dui.
          </p>
        </div>
      </Modal> */}
    </Fragment>
  );
};

export default NewItem;
