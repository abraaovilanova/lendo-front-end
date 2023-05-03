
import {
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Text from "./pages/Text";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text/:textId" element={<Text />} />
      </Routes>
    </div>
  );
}

export default App;
