export default function SortMeals() {
  return (
    <>
      <div className="sort-controls">
        <label htmlFor="sortKey">Sort by:</label>
        <select
          id="sortKey"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>

        <label htmlFor="sortDir">Direction:</label>
        <select
          id="sortDir"
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </>
  );
}
