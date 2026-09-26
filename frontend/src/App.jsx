import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/create" element={<CreateTicket />} />

        <Route
          path="/tickets/:id"
          element={<TicketDetails />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;