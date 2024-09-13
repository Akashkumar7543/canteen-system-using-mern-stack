import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
// import { store } from "./vendordhashboard/app/storee";

import { ContextProvider } from "./contexts/ContextProvider";

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ContextProvider>
        <App />
        <Toaster/>
      </ContextProvider>
    </BrowserRouter>
  </Provider>
);
// import React from "react";
// import ReactDOM from "react-dom/client";
// import ".";
// import "./index.css";
// import App from "./App";
// // import { store } from "./vendordhashboard/app/storee";
// import { Provider } from "react-redux";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <ContextProvider>
//         <App />
//          <Toaster/>
//       </ContextProvider>
//     </BrowserRouter>
//   </Provider>
// );