import axios from "axios";

const URL = "https://js.devexpress.com/Demos/Mvc/api/treeListData";

export const getTreeData = ({ query }) =>
  axios.get(`${URL}?parentIds=${query}`);
