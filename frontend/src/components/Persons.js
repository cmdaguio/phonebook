import Delete from './Delete'

const Persons = ({ persons, filter, handleDelete }) => {
   const personsToShow = !filter 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.name}>{person.name} {person.number}
          <Delete id={person.id} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default Persons;

