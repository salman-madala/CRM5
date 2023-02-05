import React from "react";
import {
  BrowserRouter,
  Switch,
  HashRouter,
  Route,
} from "react-router-dom";
import AllCustomers from "../Customers/All/AllCustomers";
import CustomerDetails from "../Customers/Details/CustomerDetails";
import CustomerDetails1 from "../Customers/Details/CustomerDetails1";
import UploadFileComponent from "../Files/UploadFileComponent";
import Home from "../Home/Home";
import { InfinitScroll2 } from "../InfiniteScroll/InfinitScroll2";
import AllItems from "../Items/All/AllItems";
import ItemDetails from "../Items/Details/ItemDetails";
import AllOrders from "../Orders/All/AllOrders";
import OrderDetails from "../Orders/Details/OrderDetails";
import PageNotFound from "../PageNotFound/PageNotFound";
import WorkFlow from "../WorkFlow/WorkFlow";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <HashRouter>
        {/* here we can use "Router"  but that is required history attribute so that's why i am using "HashRouter" */}
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/allItems" component={AllItems} />
            <Route path="/item/Details" component={ItemDetails} />
            <Route path="/allOrders" component={AllOrders} />
            <Route path="/order/details" component={OrderDetails} />
            <Route path="/workflow" component={WorkFlow} />

            <Route path="/testing" component={InfinitScroll2} />

            <Route path="/allCustomers" component={AllCustomers} />
            <Route path="/customer/:id" component={CustomerDetails1} />
            <Route path="/item/Details" component={ItemDetails} />
            <Route path="/uploadFile" component={UploadFileComponent} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </HashRouter>
    </BrowserRouter>
  );
};

export default AllRoutes;
