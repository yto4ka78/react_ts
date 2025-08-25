import { Routes, Route } from "react-router-dom";
import MainMarket from "./views/mainMarket/MainMarket.jsx";
import LayOutNavBar from "./views/layOutMarket/LayOutMarket";
import { Provider } from "react-redux";
import { store } from "./store/store";
import styles from "./marketFlowersApp.module.scss";

const MarketFlowersApp = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<LayOutNavBar />}>
          <Route index element={<MainMarket />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default MarketFlowersApp;
