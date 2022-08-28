import './App.css';
import { Profile } from './Pages/Profile/Profile';
import Login from "./Pages/Login/Login"
import Register  from "./Pages/Register/Register"
import Home from './Pages/Home/Home';
import { CreateEvent } from './Pages/Create_event/CreateEvent';
import More from './Pages/More/More';
import Forgot from './Pages/Forgot/Forgot';
import Notfound from './components/Notfound/Notfound';
import Upcoming from './Pages/Upcoming/Upcoming';
import Report from './Pages/Report/Report';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/more/:id" element={<More />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/events" element={<Upcoming />} />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
