import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import "./general.scss";

const appContainer = document.createElement('div');
appContainer.id = "app-container";

document.body.appendChild(appContainer);

ReactDOM.render(
  <App  />,
  appContainer
);