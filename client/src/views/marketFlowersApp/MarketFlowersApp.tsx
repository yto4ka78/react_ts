import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import styles from "./marketFlowersApp.module.scss";
import MainMarket from "./views/mainMarket/MainMarket.jsx";
import Confidentiality from "./UI/footerMarket/ConfidentialityMarket.jsx";
import LayOutNavBar from "./views/layOutMarket/LayOutMarket";
import ProfileScript from "./views/profile/ProfileScript";
import Dashboard from "./views/dashboard/Dashboard";

const MarketFlowersApp = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<LayOutNavBar />}>
          <Route index element={<MainMarket />} />
          <Route path="/confidentiality" element={<Confidentiality />} />
          <Route path="/profile" element={<ProfileScript />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default MarketFlowersApp;
