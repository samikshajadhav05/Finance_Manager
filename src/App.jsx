import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage'; // Replace with your actual file path
import Dashboard from './pages/Dashboard'; // Replace with your actual file path
import SignupPage from './pages/SignupPage'; // Replace with your actual file path
import Expenses from './pages/Expenses';
import Analytics from './pages/Analytics';
import Savings from './pages/Savings';
import BudgetsPage from './pages/BudgetsPage';

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Route for Signup */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/expenses" element={<Expenses />} />

        <Route path="/analytics" element={<Analytics/>} />

        <Route path="/savings" element={<Savings/>} />

        <Route path="/budgets" element={<BudgetsPage/>} />


      </Routes>
    </Router>
  );
}

export default App;
