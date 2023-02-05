import AppFrame from "@altair/app-frame";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import App2 from "./App2";

const defaultAppName = "crm/app/";
const appNames = ["crm/app/","crm/app1"];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AppFrame defaultAppName={defaultAppName} appNames={appNames}>
      <App appName="crm/app/" />
      <App2 appName="crm/app1" />
    </AppFrame>
);