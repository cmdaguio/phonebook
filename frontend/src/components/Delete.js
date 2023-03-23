const Delete = ({ id, handleDelete }) => {
  return (
    <div>
      <button onClick={() => handleDelete(id)}>
        delete
      </button>
    </div>
  );
};

export default Delete;