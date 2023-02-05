import React from "react";
import {
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  IconButton,
  Stack,
  Text,
} from "@fluentui/react";
import classes from "./FileDirective.module.css";
import { Fragment } from "react";
import { format } from "date-fns";
import { notify, NotificationType } from "@altair/gooey";
import UserDetailsView from "./UserDetailsView";
import DisplayFileSize from "./DisplayFileSize";
import EditFile from "./EditFile";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import SelectFile from "./SelectFile";
import { getDownloadUrl, info, uploadFile } from "@altair/drive-sdk";
import ContactService from "../../../services/contactService";
import useManageFiles from "./hooks/useManageFile";
import LoadingShimmer from "../Loading/LoadingShimmer";
import ImageView from "./ImageView";

const gridStyles = {
  root: {
    overflowY: "auto",
    selectors: {
      "& [role=grid]": {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "65vh",
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

const columns = [
  {
    key: "name",
    name: "FileName",
    fieldName: "name",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "image",
    name: "image",
    fieldName: "url",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "description",
    name: "Description",
    fieldName: "description",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "size",
    name: "Size",
    fieldName: "size",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "vesrion",
    name: "Version",
    fieldName: "rev",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "islock",
    name: "islock",
    fieldName: "islock",
    minWidth: 200,
    maxWidth: 300,
  },

  {
    key: "Created By",
    name: "Created By",
    fieldName: "",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "Created Date",
    name: "Created Date",
    fieldName: "version",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "Modified By",
    name: "Modified By",
    fieldName: "version",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "Modified Date",
    name: "Modified Date",
    fieldName: "version",
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: "action",
    name: "Actions",
    minWidth: 200,
    maxWidth: 300,
  },
];

const FileDirective = (props) => {
  // const [ items ,setItems]=useState([])
  const moreIcon = { iconName: "More" };

  const [isEditFileModelOpen, setIsEditFileModelOpen] = useState(false);
  const [editFile, setEditFile] = useState();

  const { _addFiles, _getAllFiles } = useManageFiles();

  const getCustomerfiles = () => {
    return _getAllFiles(props.typeRef);
  };
  const { isLoading:getFilesLoading, data :items=[], refetch } = useQuery(
    "get-customers files",
    getCustomerfiles,
    {
      // enabled: false,
      refetchOnWindowFocus:false,
      select: (data) => {
        console.log(data);
        // const res =
        //   data.data.outputs !== undefined
        //     ? data.data.outputs.files.map((order, index) => {
        //         let content = {
        //           id : data.data.outputs.files[`${index}`].id,
        //           description:data.data.outputs.files[`${index}`].description,
        //           islock: data.data.outputs.files[`${index}`].islock,
        //           // fileRef:data.data.outputs.files[`${index}`].fileObj,
        //           fileContent:data.data.__refs[`outputs.files[${index}].fileObj`]
        //         }
        //         return content;
        //       })
        //     : [];
        // return res;

        const res =
          data?.files !== undefined
            ? data?.files.map((file, index) => {
                let content = {
                  id: data?.files[`${index}`].id,
                  description: data?.files[`${index}`].description,
                  url: data?.files[`${index}`].url,
                  islock: data?.files[`${index}`].islock,
                  fileContent: data?.files[`${index}`].fileObj.__data,
                };
                return content;
              })
            : [];
        props.count(data.count);
        return res;
      },
    }
  );

  const handleChange = async (event) => {
    const file = event.target.files[0];
    try {
      const { content: targetDirectory } = await info({
        path: "/Users/smadala",
      });
      const res = await uploadFile({ file: file, target: targetDirectory });

      let fileRef = {
        id: res.id,
        contentType: res.contentType,
      };
      // const status = await ContactService.createCustomerFiles(
      //   fileRef,
      //   customerRef
      // );

      // or

      // const status = _addFiles(customerRef,fileRef)
      // console.log(status);

      const status = await ContactService.createCustomerFiles1(
        fileRef,
        props.typeRef
      );

      // let content = {
      //   id: status.data?.outputs.file.id,
      //   description: status.data?.outputs.file.description,
      //   url: status.data?.filesurl,
      //   islock: status.data?.outputs.file.islock,
      //   fileContent: status.data?.__refs['outputs.file.fileRef'],
      // };
      
      // console.log(content);

      // items.push(content)

      setTimeout(async () => {
        await refetch();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };


  const deleteCustomerData = (item) => {
    return ContactService.deleteFile(item.id);
    // return _deleteCustomer(customer);
  };
  const { isLoading, mutate: onDelete } = useMutation(
    (item) => deleteCustomerData(item),
    {
      onSuccess: (data) => {
        refetch();
        notify({
          text: `File deleted successfully`,
          type: NotificationType.SUCCESS,
        });
      },
      onError: () => {
        notify({
          text: `Error deleting File`,
          type: NotificationType.ERROR,
        });
      },
    }
  );

  const openEdit = (item) => {
    setIsEditFileModelOpen(true);
    setEditFile(item);
  };

  const onDismissHandler = () => {
    setIsEditFileModelOpen((prev) => !prev);
  };

  const GetDownloadUrl = async (id) => {
    return await getDownloadUrl(id);
  };

  const { mutate: downloadFile } = useMutation((id) => GetDownloadUrl(id), {
    onSuccess: (data) => {
      const res =
        data !== undefined ? data.replace("objectstore", "localhost") : "";
      window.open("", "_self").location.href = res;
    },
  });

  const renderItemColumn = (item, index, column) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
      case "name":
        return <Fragment>{item.fileContent.name}</Fragment>;
      case "description":
        return <Fragment>{item.description}</Fragment>;
      case "image":
        return <ImageView image={item} />
      case "islock":
        return (
          <Fragment>
            {item.islock ? <span>true</span> : <span>false</span>}
          </Fragment>
        );
      case "size":
        return (
          <Fragment>
            <DisplayFileSize size={item.fileContent.size} />
          </Fragment>
        );
      case "vesrion":
        return <Fragment>{item.fileContent.rev}</Fragment>;
      case "Created By":
        return (
          <Fragment>
            <UserDetailsView userId={item.fileContent.system?.createdUser} />
          </Fragment>
        );
      case "Created Date":
        return (
          <Fragment>
            {format(
              item.fileContent.system?.createdTime,
              "dd/MM/yyyy hh:mm:ss"
            )}
          </Fragment>
        );
      case "Modified By":
        return (
          <Fragment>
            <UserDetailsView userId={item.fileContent.system?.modifiedUser} />
          </Fragment>
        );
      case "Modified Date":
        return (
          <Fragment>
            {format(
              item.fileContent.system?.modifiedTime,
              "dd/MM/yyyy hh:mm:ss"
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
                    onClick: () => openEdit(item),
                  },
                  {
                    key: "delete",
                    text: "Delete",
                    iconProps: { iconName: "Delete" },
                    onClick: () => onDelete(item),
                  },
                  {
                    key: "download",
                    text: "Download",
                    iconProps: { iconName: "Download" },
                    onClick: () => downloadFile(item.fileContent.id),
                  },
                ],
              }}
              iconProps={moreIcon}
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

  const _getKey = (item, index, number) => {
    return item.id;
  };

  return (
    <Fragment>
      <SelectFile onChange={handleChange} />

      {!isLoading && items?.length !== 0 && (
        <DetailsList
          items={items}
          columns={columns}
          onRenderItemColumn={renderItemColumn}
          getKey={_getKey}
          checkboxVisibility={CheckboxVisibility.hidden}
          styles={gridStyles}
          onRenderMissingItem={() => alert("table ended")}
          layoutMode={DetailsListLayoutMode.justified}
        />
      )}

      {!isLoading && !getFilesLoading && items.length === 0 && (
        <Fragment>
          <DetailsList
            items={items}
            columns={columns}
            onRenderItemColumn={renderItemColumn}
            getKey={_getKey}
            checkboxVisibility={2}
          />
          <Stack horizontalAlign="center">
            <Text>No files</Text>
          </Stack>
        </Fragment>
      )}
      {(isLoading || getFilesLoading) && <LoadingShimmer />}
      {isEditFileModelOpen && (
        <EditFile
          data={editFile}
          onDismiss={onDismissHandler}
          refetch={refetch}
        />
      )}
    </Fragment>
  );
};
export default React.memo(FileDirective);
