import { IconButton, Label } from "@fluentui/react";
import React from "react";
import classes from "./Basic.module.css";
import { Image } from "@fluentui/react/lib/Image";
import { useState } from "react";
import { useQuery } from "react-query";
import ContactService from "../../../../services/contactService";
import { Fragment } from "react";
import {
  getDownloadUrl,
  info,
  uploadFile,
} from "@altair/drive-sdk";
import { useRef } from "react";
import { notify, NotificationType } from "@altair/gooey";
import { useMutation } from "react-query";
import useCustomerstore from "../../../../store/CustomerStore";

const Basic = (props) => {
  const [customer, setCustomer] = useState(props.data);
  const selectFile = useRef(null);
  const updateCustomer = useCustomerstore((state) => state.updateCustomer);

  const { name, email, imageId } = customer;

  const GetDownloadUrl = async (id) => {
    return await getDownloadUrl(id);
  };

  const {
    data: imageURL,
  } = useQuery(["get-image-url", imageId], () => GetDownloadUrl(imageId), {
    enabled: !!imageId,
    refetchOnWindowFocus: false,
    select: (data) => {
      // console.log(data);
      const res =
        data !== undefined ? data.replace("objectstore", "localhost") : "";
      return res;
    },
  });

  const getInfoOfFile = async (id) => {
    return await ContactService.getInfoOfFile(id);
  };

  const { data: fleInfo } = useQuery(
    ["get-fileInfo", imageId],
    () => getInfoOfFile(imageId),
    {
      enabled: !!imageId,
      refetchOnWindowFocus: false,
      select: (data) => {
        const res = data?.data.outputs.content;
        return res;
      },
    }
  );

  const imageProps = {
    src: imageURL,
    styles: { root: { border: "1px solid black" } },
  };

  const handleClick = (event) => {
    selectFile.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];

    const { content: targetDirectory } = await info({
      path: "/Users/smadala",
    });

    const fi = {
      // fi is fileinfo object for to send data
      fileUploaded: fileUploaded,
      targetDirectory: targetDirectory,
    };
    if (imageId === "") {
      await uploadImage(fi);
    } else {
      await deleteImage();
      await updateImage(fi);
    }
  };

  //-- need to change duplicate code   ---------

  const updateCustomerData = (cus) => {
    return ContactService.updateCustomer({
      customerRef: cus,
    });
  };

  const { mutate: update } = useMutation(
    (customer) => updateCustomerData(customer),
    {
      onSuccess: async (data) => {
        await updateCustomer(data.data.__refs["outputs.customer.content"]); //store update
        // console.log(data);
        notify({
          text: `Customer update successfully`,
          type: NotificationType.SUCCESS,
        });
      },
      onError: () => {
        notify({
          text: `Error updating Customer`,
          type: NotificationType.ERROR,
        });
      },
    }
  );

  const deleteImageHandler = async () => {
    // const res = ContactService.moveToTrashImage(imageId)

    //const res = ContactService.deleteImage(fleInfo.path)
    if (fleInfo?.path !== " ") {
      deleteImage();
    }
  };

  const deleteImageInServer = (path) => {
    return ContactService.deleteImage(path);
  };

  const { mutate: deleteImage } = useMutation(
    () => deleteImageInServer(fleInfo?.path),
    {
      onSuccess: async (data) => {
        // console.log(data);
        customer.imageId = "";
        await update(customer);
      },
      onError: () => {
        notify({
          text: `Error deleting Image`,
          type: NotificationType.ERROR,
        });
      },
    }
  );

  const uploadImageInServer = async (fi) => {
    return await uploadFile({
      file: fi.fileUploaded,
      target: fi.targetDirectory,
    });
  };

  const { mutate: uploadImage } = useMutation((fi) => uploadImageInServer(fi), {
    onSuccess: async (data) => {
      // console.log("upload image id", data, data.id);
      customer.imageId = data.id;

      // console.log("customer is ", customer);
      update(customer);
    },
    onError: () => {
      notify({
        text: `Error uploading Image`,
        type: NotificationType.ERROR,
      });
    },
  });

  const { mutate: updateImage } = useMutation((fi) => uploadImageInServer(fi), {
    onSuccess: (data) => {
      customer.imageId = data.id;
      update(customer);
    },
    onError: () => {
      notify({
        text: `Error uploading Image`,
        type: NotificationType.ERROR,
      });
    },
  });

  return (
    <div className={classes.basic}>
      <Label>Name : {name}</Label>
      <Label>Email : {email}</Label>
      <Label>
        image :
        {!!imageId ? (
          <Fragment>
            <Image {...imageProps} width={250} height={150} />
            <IconButton
              iconProps={{ iconName: "Edit" }}
              aria-label="Edit"
              title="Edit"
              styles={{ rootHovered: { color: "blue" } }}
              onClick={handleClick}
            />
            <IconButton
              iconProps={{ iconName: "Delete" }}
              aria-label="Delete"
              title="Delete"
              styles={{ rootHovered: { color: "red" } }}
              onClick={deleteImageHandler}
            />
          </Fragment>
        ) : (
          <IconButton
            iconProps={{ iconName: "Add" }}
            aria-label="Add"
            title="Add Image"
            styles={{ rootHovered: { color: "blue" } }}
            onClick={handleClick}
          />
        )}
        <input
          type="file"
          ref={selectFile}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Label>
    </div>
  );
};

export default Basic;
