import NavigationSidePanel from './components/Navigation/NavigationSidePanel';
import AllRoutes from './components/Routes/AllRoutes';
import classes from './App.module.css'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();


function App2() {
  return (
    <QueryClientProvider client={queryClient}>
    <div style={{ display: "flex", flex: "1 0 auto" }}>
      <div className={classes["sideNav"]}>
        <div className={classes["root"]}>
            <h1>second app</h1>
          <NavigationSidePanel />
        </div>
      </div>
      <div className={classes["main"]}>
        <AllRoutes />
      </div>
    </div>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  );
}

export default App2;
