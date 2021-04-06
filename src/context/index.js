import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { getTreeData } from "./api";

const URL = "https://js.devexpress.com/Demos/Mvc/api/treeListData";
const ROOT_ID = "";

export const TreeContext = createContext({});

export const TreeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // OPTION ONE - does not work IGNORE
  //   const [query, setQuery] = useState("");
  //   const { data: tree } = useQuery(
  //     "tree",
  //     () => {
  //       if (query.length) {
  //         if (loading) {
  //           return;
  //         }
  //         query.map((rowId) => {
  //           axios.get(`${URL}?parentIds=${rowId}`).then((response) => {
  //             // console.log(response.data);
  //             data.concat(...response.data);
  //           });
  //         });
  //       }
  //     },
  //     {
  //       refetchOnWindowFocus: false,
  //       retry: 1,
  //     }
  //   );

  //   useEffect(() => {
  //     const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds].filter(
  //       (rowId) => data.findIndex((row) => row.parentId === rowId) === -1
  //     );
  //     setQuery(rowIdsWithNotLoadedChilds);
  //   }, [expandedRowIds]);

  //
  // OPTION TWO - based on theirs, this works and I've added a custom refetch thing - refetch is OPTIONAL
  const loadData = (refetch) => {
    const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds].filter(
      (rowId) => data.findIndex((row) => row.parentId === rowId) === -1
    );
    if (rowIdsWithNotLoadedChilds.length) {
      if (loading) {
        return;
      }
      setLoading(true);
      rowIdsWithNotLoadedChilds.map((rowId) => {
        getTreeData({ query: rowId }).then((response) => {
          setData(data.concat(...response.data));
          setLoading(false);
        });
      });
    }
    // this will handle refetch
    if (refetch) {
      if (loading) {
        return;
      }
      setLoading(true);
      getTreeData({ query: "" }).then((response) => {
        setData(response.data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      loadData(false);
    }
  });

  const refetchAll = () => loadData(true);

  //
  // OPTION THREE - this half works but it keeps multiplying the data?? this uses the principle I used for Sim
  //   const [query, setQuery] = useState("");
  //   const { data: tree, isLoading } = useQuery(
  //     ["treeData"],
  //     () => getTreeData({ query: query }),
  //     {
  //       refetchOnWindowFocus: false,
  //     }
  //   );

  //   useEffect(() => {
  //     const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds].filter(
  //       (rowId) => data.findIndex((row) => row.parentId === rowId) === -1
  //     );
  //     if (rowIdsWithNotLoadedChilds) {
  //       setQuery(rowIdsWithNotLoadedChilds[0]);
  //     }
  //   }, [expandedRowIds]);

  //   useEffect(() => {
  //     if (tree?.data) {
  //       setData(data.concat(...tree?.data));
  //     }
  //   }, [tree?.data]);

  return (
    <TreeContext.Provider
      value={{
        data,
        loading,
        expandedRowIds,
        setExpandedRowIds,
        refetchAll,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};
