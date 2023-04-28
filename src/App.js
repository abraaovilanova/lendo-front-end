import "./App.css";

import {
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Text from "./pages/Text";



function App() {
  return (
    <div className="App">
      <Routes>
        {/* <RouterProvider router={router}> */}
        <Route path="/" element={<Home />} />
        <Route path="/text/:textId" element={<Text />} />
        {/* </RouterProvider> */}
      </Routes>
    </div>
  );
}

export default App;
