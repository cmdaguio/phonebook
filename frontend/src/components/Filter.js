const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">filter shown with </label><input id="filter" onChange={handleFilter} value={filter}/>
    </div>
  )
};

export default Filter;

