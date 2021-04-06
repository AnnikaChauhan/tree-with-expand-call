import Tree from "./components/tree";
import { QueryClient, QueryClientProvider } from "react-query";
import { TreeProvider } from "./context";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div style={{ margin: "10px" }}>
      <h1>Tree Test</h1>
      <div style={{ margin: "10px" }}>
        <QueryClientProvider client={queryClient}>
          <TreeProvider>
            <Tree />
          </TreeProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default App;
