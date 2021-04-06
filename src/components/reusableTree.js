import { CustomTreeData, TreeDataState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from "@devexpress/dx-react-grid-material-ui";
import {
  createStyles,
  makeStyles,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import React from "react";

const ROOT_ID = "";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0),
      position: "relative",
    },
  })
);

const TableComponentBase = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    data-testid="tree-table"
    style={{ tableLayout: "initial" }}
  />
);

const DataOnDemandTreeTable = ({
  children,
  rows,
  columns,
  columnExtensions,
  loading,
  expandedRowIds,
  onExpandedRowIdsChange,
  tableTreeColumnFor,
}) => {
  const classes = useStyles();

  const getRowId = (row) => row.id;

  // tslint:disable-next-line: no-shadowed-variable
  const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(
      (r) => r.parentId === (row ? row.id : ROOT_ID)
    );
    if (childRows.length) {
      return childRows;
    }
    return row && row.hasItems ? [] : null;
  };

  return (
    <Paper
      data-testid="tree-table-test-id"
      elevation={0}
      className={classes.root}
      style={{ position: "relative" }}
    >
      {loading && <CircularProgress />}
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <TreeDataState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={onExpandedRowIdsChange}
        />
        <CustomTreeData getChildRows={getChildRows} />
        <Table
          tableComponent={TableComponentBase}
          columnExtensions={columnExtensions}
        />
        <TableHeaderRow />
        <TableTreeColumn for={tableTreeColumnFor} />
        {children}
      </Grid>
    </Paper>
  );
};

export { DataOnDemandTreeTable };
