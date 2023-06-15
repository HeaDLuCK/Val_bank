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
import Auth from "./Components/Auth/Auth";
import AuthAdmin from "./Components/Auth/AuthAdmin";
import AuthAgent from "./Components/Auth/AuthAgent";
import MissingPage from "./Components/Application/MissingPage/MissingPage";
import Transactions from "./Components/Application/Admin/Components/Transaction/TransactionsTable";
import AdminDashboard from "./Components/Application/Admin/Components/Dashboard/Dashboard";
import UsersTable from "./Components/Application/Admin/Components/User/UsersTable";
import ResetPassword from "./Components/Application/ResetPassword/ResetPassword";
import BillTable from "./Components/Application/Agent/Components/BillTable";
import Add_Accounts from "./Components/Application/Add_Accounts/Add_Accounts";
import Form_account from "./Components/Application/Add_Accounts/form_add_account/form_acount";
import Update_Accounts from "./Components/Application/Add_Accounts/Update_Account";
import AddTransaction from "./Components/Application/Activities/AddTransactionForm/AddTransaction";
import CalendarApp from "./Components/Calendar/CalendarApp";



axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Auth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/contact" element={<ContactApp />} />
          <Route path="/accounts" element={<Finance_Accounts />} />
          <Route path="/calendar" element={<CalendarApp />} />
          <Route path="/add_accounts" element={<Add_Accounts />} />
          <Route path="/form_account" element={<Form_account />} />
          <Route path="/form_update_account/:id" element={<Update_Accounts />} />
          <Route path="/addTransaction" element={<AddTransaction />} />
          <Route path="/settings_user" element={<Settings_User />} />
          <Route path="/settings_password" element={<Settings_Password />} />
          <Route element={<AuthAdmin />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/val-users" element={<UsersTable />} />
            <Route path="/admin/val-transactions" element={<Transactions />} />
          </Route>
          <Route element={<AuthAgent />}>
            <Route path="/agent/dashboard" element={<BillTable />} />
          </Route>
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
