import { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Banner from './components/Banner';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [bannerMessage, setBannerMessage] = useState(null);
  const [bannerType, setBannerType] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`)) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(() => {
            setBannerType('banner-deletion-error');
            setBannerMessage(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`);
            setTimeout(() => {
              setBannerType(null);
              setBannerMessage(null);
            }, 5000);
        });
    }
  };

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Banner message={bannerMessage} bannerType={bannerType} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setBannerMessage={setBannerMessage} setBannerType={setBannerType} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

