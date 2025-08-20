import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/layout/Layout";
import Main from "./views/main/Main";
import CvInfo from "./views/cvInfo/CvInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/cvInfo" element={<CvInfo />} />
          <Route path="/myprojects" element={<CvInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
