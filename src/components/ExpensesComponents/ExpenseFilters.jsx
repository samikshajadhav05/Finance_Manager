const ExpenseFilters = ({ search, setSearch, filters, setFilters }) => {
    return (
      <div className="bg-greenMedium bg-opacity-50 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Search and Filter</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-xl w-full"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="p-2 rounded-xl w-full"
          >
            <option value="">Filter by Category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Min Amount"
            value={filters.minAmount}
            onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
            className="p-2 rounded-xl w-full"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={filters.maxAmount}
            onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
            className="p-2 rounded-xl w-full"
          />
        </div>
      </div>
    );
  };
  
  export default ExpenseFilters;
  