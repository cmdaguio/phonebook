import { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({ persons, setPersons, setBannerMessage, setBannerType }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleInputName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value)
  };

  const addInfo = (event) => {
    // console.log(event.target);
    event.preventDefault();
    const { id }  = persons.find(person => person.name === newName) || {undefined};
    if (id) {
     if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      const updatePerson = {
        name: newName, 
        number: newNumber
      };
      personService
        .update(id, updatePerson)
        .then(person => {
          setPersons(persons.filter(person => person.id !== id).concat(person));
        });
     }  
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setBannerType('banner-person-added');
          setBannerMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setBannerType(null);
            setBannerMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <form onSubmit={addInfo}>
        <div>
          <label htmlFor="name">name: </label><input id="name" onChange={handleInputName} value={newName} />
        </div>
        <div>
          <label htmlFor="number">number: </label><input id="number" onChange={handleInputNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;

