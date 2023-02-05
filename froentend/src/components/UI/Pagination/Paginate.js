import { Dropdown, Icon, IconButton, Stack } from "@fluentui/react";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import usePaginationstore from "../../../store/PaginationStore";

const dropdownStyles = {
  dropdown: { width: 45 },
  dropdownItemSelected: {
    selectors: {
      "&:before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "4px",
        background: "rgb(0, 120, 212)",
      },
    },
  },
};
const stackTokens = { childrenGap: 950 };

const options = [
  { key: "5", text: "5", value: 5 },
  { key: "10", text: "10", value: 10 },
  { key: "20", text: "20", value: 20 },
  { key: "30", text: "30", value: 30 },
  { key: "40", text: "40", value: 40 },
  { key: "50", text: "50", value: 50 },
];
const onRenderCaretDown = () => {
  return <Icon iconName="ChevronUp" />;
};



const Paginate = props => {
  // console.log(props);

  const pagination = usePaginationstore((state) => state.pagination);
  const nextPage = usePaginationstore((state) => state.nextPage);
  const prevPage = usePaginationstore((state) => state.prevPage);
  const resetPagination = usePaginationstore((state) => state.resetPagination);
  const [selectedKey, setSelectedKey] = useState(`${pagination.limit}`);
  const [pagenNum, setPageNumber] = useState(1)
  const paginationInitialVal = {
    hidden: false,
    sortBy: "system.createdTime",
    sortDir: "DESC",
    limit: selectedKey,
    offset: 0,
  };

  // let nextPageNumber = 1;

  useEffect(() => {
    console.log("pagination use state render");
    resetPagination(paginationInitialVal)
    setPageNumber(1)
  }, [selectedKey])

  const previousPageHandler = async () => {
    if (pagination?.offset > 0) {
      pagination.offset = pagination.offset - parseInt(selectedKey);
      await prevPage(pagination)
      props.prevPage(pagination)
      setPageNumber(pagenNum - 1)
    }
  };

  const nextPageHandler = async () => {
    pagination.offset = pagination.offset + parseInt(selectedKey);
    await nextPage(pagination)
    props.nextPage(pagination)
    setPageNumber(pagenNum + 1)
  };

  const selectedKeyChangeHandler = (e, selectedOption) => {
    setSelectedKey(selectedOption.key);
  };

  const displayingItems = (<div>

    {/* Displaying {props.items.length === 0 ? <span>0</span> : <span>{props.items.length}</span>} - <span>{props.items.length}</span> of {props.itemsCount}</div>) */}

    {/* Displaying {props.items.length === 0 ? <span>0</span> : <span>{(pagenNum * selectedKey )-1}</span>} - <span>{pagenNum * selectedKey}</span> of {props.itemsCount}</div>) */}

    <Fragment>
      <span style={{ marginRight: "5px" }}>Displaying</span>
      {props.itemsCount == 0 && <span>
        {pagenNum * selectedKey}
      </span>}
      {props.itemsCount > 0 && <span>
        {((pagenNum - 1) * selectedKey) + 1}
      </span>}
      -
      {pagenNum !== Math.ceil(props.itemsCount / selectedKey) && <span style={{ marginRight: "5px" }}> {(pagenNum) * selectedKey}</span>}
      {pagenNum == Math.ceil(props.itemsCount / selectedKey) && <span style={{ marginRight: "5px" }}>{props.itemsCount}</span>}
    </Fragment>
    of an {props.itemsCount}</div>)
  return (
    <Stack horizontal tokens={stackTokens} verticalAlign="center">
      {displayingItems}

      <Stack horizontal tokens={{ childrenGap: 20 }} verticalAlign="center">
        <Dropdown
          defaultSelectedKey="10"
          selectedKey={selectedKey}
          options={options}
          styles={dropdownStyles}
          onRenderCaretDown={onRenderCaretDown}
          onChange={selectedKeyChangeHandler}
        />
        <Stack horizontal verticalAlign="center">
          Page {pagenNum} of {Math.ceil(props.itemsCount / selectedKey)}
          <IconButton
            iconProps={{ iconName: "ChevronLeft" }}
            onClick={previousPageHandler}
            disabled={pagenNum === 1}

          ></IconButton>
          <IconButton
            iconProps={{ iconName: "ChevronRight" }}
            onClick={nextPageHandler}
            disabled={pagenNum == Math.ceil(props.itemsCount / selectedKey)}
          ></IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Paginate;
