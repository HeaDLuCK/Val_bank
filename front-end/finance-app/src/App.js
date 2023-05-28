import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home_Page/Home";
import Login from "./Components/Login_Page/Login";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Application/dashboard/dashboard";
import Transaction from "./Components/Application/Transactions/Transaction";
import ContactApp from "./Components/Application/ContactApp/ContactApp";
import Finance_Accounts from "./Components/Application/Finance_Accounts/Finance_Accounts";
import Settings_User from "./Components/Application/Settings/Settings_User/Settings_User";
import Settings_Password from "./Components/Application/Settings/Settings_Pass/Settings_password";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/contact" element={<ContactApp />} />
        <Route path="/accounts" element={<Finance_Accounts />} />
        <Route path="/settings_user" element={<Settings_User />} />
        <Route path="/settings_password" element={<Settings_Password />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
