import { DataOnDemandTreeTable } from "./reusableTree";
import { useState, useContext } from "react";
import { TreeContext } from "../context";
import { Button } from "@material-ui/core";

const TreeComponent = () => {
  const {
    data,
    loading,
    expandedRowIds,
    setExpandedRowIds,
    refetchAll,
  } = useContext(TreeContext);
  const [columns] = useState([
    {
      name: "name",
      title: "Name",
    },
    {
      name: "size",
      title: "Size",
      getCellValue: (row) =>
        row.size ? `${Math.ceil(row.size / 1024)} KB` : "",
    },
    {
      name: "createdDate",
      title: "Created Date",
      getCellValue: (row) =>
        new Date(Date.parse(row.createdDate)).toLocaleString(),
    },
    {
      name: "modifiedDate",
      title: "Modified Date",
      getCellValue: (row) =>
        new Date(Date.parse(row.modifiedDate)).toLocaleString(),
    },
  ]);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={refetchAll}>
        Refetch
      </Button>
      <DataOnDemandTreeTable
        columns={columns}
        rows={data}
        loading={loading}
        tableTreeColumnFor="name"
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={setExpandedRowIds}
      />
    </>
  );
};

export default TreeComponent;
