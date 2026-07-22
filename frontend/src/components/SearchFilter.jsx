import { useMemo } from "react";

function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  type,
  setType,
  transactions,
}) {
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        transactions
          .map((t) => t.category)
          .filter(Boolean)
      ),
    ];
  }, [transactions]);

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="🔍 Search by category or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="filter-select"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="filter-select"
      >
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}

export default SearchFilter;