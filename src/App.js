import { Route, Routes } from "react-router-dom";
import Shipments from "./components/Shipments";
import ShipmentsDetails from "./components/ShipmentsDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/shipments' element={<Shipments />} />
        <Route path='shipment/:orderNo' element={<ShipmentsDetails />} />
      </Routes>
    </div>
  );
}

export default App;
