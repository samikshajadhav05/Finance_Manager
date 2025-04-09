import React from "react";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import TransactionsList from "../components/TransactionList"
import SavingsOverview from "../components/SavingsComponents/savingsLine"
import TotalSavings from "../components/SavingsComponents/TotalSavings";
import RemainingBudget from "../components/RemainingBudget";

const Dashboard = () => {
  return (
    <div className="bg-greenDeep text-text min-h-screen p-6 lg:p-12">
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[200px,200px,200px,320px] gap-6">
            {/* Stats Cards */}
            <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold">Current Balance</h2>
              <p className="text-3xl font-bold mt-2">₹ 100000</p>
            </div>
            <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold">Remaining Budget</h2>
              <p className="text-3xl font-bold mt-3">₹ <RemainingBudget/></p>
            </div>
            <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold">Current Savings</h2>
              <TotalSavings/>
            </div>
            <SavingsOverview/>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold">Category wise Spending</h2>
              <div className="mt-4 bg-text bg-opacity-10 rounded-2xl h-[350px] flex items-center justify-center">
                <PieChart />
              </div>
            </div>
            <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold">Income vs Expense</h2>
              <div className="mt-4 bg-text bg-opacity-10 rounded-2xl h-[350px] flex items-center justify-center">
                <BarChart />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col-reverse lg:w-[348px] gap-6 rounded-xl bg-greenMedium bg-opacity-30">
          <div className=" p-6 rounded-b-2xl h-2/3">
            <TransactionsList/>
          </div>

          <div className=" p-6 rounded-t-2xl h-1/3">
            <div className="bg-gradient-to-r from-greenMedium via-greenLight to-greenMedium p-6 rounded-2xl h-[140px] hover:scale-105 transition-transform duration-500 ease-in-out">
              <h2 className="text-lg font-semibold">Current Account</h2>
              <p className="text-3xl font-bold mt-2">₹ 100000</p>
              <p className="text-sm mt-1">ICICI - Haripriya Agrawal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
